import { setScreen } from "../state.js";

const GARMIN_API = "/api/garmin";
const GARMIN_IMPORT_KEY = "habit-garmin-import-v1";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function detectDelimiter(text) {
  const firstLine = text.replace(/^\uFEFF/, "").split(/\r?\n/, 1)[0] || "";
  const candidates = [",", ";", "\t"];
  return candidates.sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
}

function parseCsv(text) {
  const delimiter = detectDelimiter(text);
  const rows = [];
  let row = [], field = "", quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === '"') {
      if (quoted && input[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === delimiter && !quoted) {
      row.push(field); field = "";
    } else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && input[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some(value => value.trim() !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field.length || row.length) { row.push(field); if (row.some(value => value.trim() !== "")) rows.push(row); }
  if (rows.length < 2) return [];
  const headers = rows.shift().map(h => h.trim().toLowerCase().replace(/^\ufeff/, ""));
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()])));
}

function numberValue(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const normalized = String(value).trim().replace(/\s/g, "").replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function normalizeDate(value) {
  const text = String(value ?? "").trim();
  const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  const czech = text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (czech) return `${czech[3]}-${czech[2].padStart(2, "0")}-${czech[1].padStart(2, "0")}`;
  return text;
}

function formatDate(value) {
  const normalized = normalizeDate(value);
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : escapeHtml(value || "—");
}

function formatNumber(value, digits = 0) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return "—";
  return new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: digits }).format(Number(value));
}

function formatDuration(seconds) {
  const value = numberValue(seconds);
  if (value === null || value < 0) return "—";
  const hours = Math.floor(value / 3600);
  const minutes = Math.round((value % 3600) / 60);
  return hours ? `${hours} h ${minutes} min` : `${minutes} min`;
}

function classifyCsv(rows) {
  if (!rows.length) return null;
  const keys = Object.keys(rows[0]);
  if (keys.includes("steps") && keys.includes("active_calories")) return "daily";
  if (keys.includes("distance_meters") || (keys.includes("duration_seconds") && keys.includes("name"))) return "activities";
  if (keys.includes("deep_sleep_seconds") || keys.includes("light_sleep_seconds") || keys.includes("rem_sleep_seconds")) return "sleepDetails";
  return null;
}

function loadImportedData() {
  try { return JSON.parse(localStorage.getItem(GARMIN_IMPORT_KEY) || "null"); }
  catch (_) { return null; }
}

export function renderDevices(container, rerender) {
  container.innerHTML = `
    <section class="devices-page">
      <div class="devices-hero">
        <div>
          <span class="devices-eyebrow">⌚ Moje zařízení</span>
          <h1>Propojená zařízení</h1>
          <p>Načti svá skutečná data z Garminu a sleduj kroky, spánek, kalorie i aktivity v Habit APP.</p>
        </div>
        <div class="devices-hero-icon">⌚</div>
      </div>

      <section class="device-card garmin-import-card">
        <div class="device-card-top"><h2>Moje data z Garminu</h2><span class="device-status" id="garmin-import-status">Zatím bez importu</span></div>
        <p class="device-card-lead">Tvůj počítač už umí automaticky stahovat Garmin data a vytvářet CSV soubory. Vyber všechny tři exporty z jeho složky <code>garmin_data</code>. Aplikace si je uloží v tomto prohlížeči.</p>
        <div class="garmin-import-instructions">
          <strong>Vyber tyto soubory najednou:</strong>
          <span>daily_summary.csv</span><span>activities.csv</span><span>sleep_details.csv</span>
        </div>
        <label class="garmin-file-label" for="garmin-csv-files">Vybrat CSV soubory</label>
        <input id="garmin-csv-files" class="garmin-file-input" type="file" accept=".csv,text/csv" multiple>
        <p id="garmin-import-message" class="device-hint" role="status">Podporujeme CSV oddělené čárkou, středníkem i tabulátorem.</p>
        <div id="garmin-import-dashboard" class="garmin-import-dashboard"></div>
        <button id="garmin-clear-import" class="garmin-clear-button" type="button" hidden>Odstranit importovaná data z tohoto prohlížeče</button>
      </section>

      <section class="device-card garmin-card" style="margin-top:16px">
        <div class="device-card-top"><h2>Oficiální propojení Garmin Connect</h2><span class="device-status" id="garmin-status">Nepřipojeno</span></div>
        <p class="device-card-lead">Přímá autorizace Garmin Connect přes vývojářské API je samostatná možnost. Náš současný osobní export ji nepotřebuje a heslo Garminu se do Habit APP neposílá.</p>
        <div class="device-metrics">
          <span>👣 Kroky</span><span>😴 Spánek</span><span>❤️ Tep</span><span>🔋 Body Battery</span>
        </div>
        <button id="garmin-connect" class="device-connect-button" type="button">Nastavení oficiálního propojení</button>
        <p class="device-hint" id="garmin-hint">Oficiální API propojení zatím není aktivní. Pro osobní data použij import CSV výše.</p>
      </section>

      <section class="device-info-grid">
        <article class="device-info-card"><span>🔒</span><h3>Soukromí</h3><p>Importovaná data zůstávají v úložišti tohoto prohlížeče. CSV ani heslo se neposílají do Habit APP serveru.</p></article>
        <article class="device-info-card"><span>📊</span><h3>Skutečné hodnoty</h3><p>Zobrazujeme jen hodnoty načtené z tvých souborů. Pokud některý údaj chybí, zůstane prázdný.</p></article>
        <article class="device-info-card"><span>🌿</span><h3>Bez počítání jídla jako trestu</h3><p>Pohyb a kalorie slouží jako kontext pro zdraví a regeneraci, ne jako něco, čím musíš „odpracovat“ jídlo.</p></article>
      </section>

      <button id="devices-back" class="devices-back" type="button">← Zpět</button>
    </section>
  `;

  const importStatus = container.querySelector("#garmin-import-status");
  const importMessage = container.querySelector("#garmin-import-message");
  const dashboard = container.querySelector("#garmin-import-dashboard");
  const clearButton = container.querySelector("#garmin-clear-import");

  function renderImportedDashboard() {
    const data = loadImportedData();
    if (!data || !Array.isArray(data.daily) || !data.daily.length) {
      importStatus.textContent = "Zatím bez importu";
      importStatus.classList.remove("connected");
      dashboard.innerHTML = `<div class="garmin-empty-state"><span>📥</span><strong>Načti svůj Garmin export</strong><p>Po importu se zde zobrazí poslední den, přehled spánku a poslední aktivity.</p></div>`;
      clearButton.hidden = true;
      return;
    }

    const daily = [...data.daily].sort((a, b) => normalizeDate(a.date).localeCompare(normalizeDate(b.date)));
    const latest = daily[daily.length - 1];
    const sleepDetails = (data.sleepDetails || []).find(row => normalizeDate(row.date) === normalizeDate(latest.date)) || {};
    const activities = [...(data.activities || [])].sort((a, b) => normalizeDate(b.date).localeCompare(normalizeDate(a.date)));
    importStatus.textContent = "Data načtena";
    importStatus.classList.add("connected");
    importMessage.textContent = `Poslední import: ${data.importedAt ? new Date(data.importedAt).toLocaleString("cs-CZ") : "—"}. Po nové aktualizaci CSV import zopakuj.`;
    clearButton.hidden = false;

    dashboard.innerHTML = `
      <div class="garmin-data-heading"><div><strong>Poslední den v exportu</strong><span>${formatDate(latest.date)}</span></div><small>Data mohou být během dne neúplná.</small></div>
      <div class="garmin-metric-grid">
        <article><span>👣 Kroky</span><strong>${formatNumber(numberValue(latest.steps))}</strong></article>
        <article><span>🔥 Aktivní kcal</span><strong>${formatNumber(numberValue(latest.active_calories))}</strong></article>
        <article><span>⚡ Celkem kcal</span><strong>${formatNumber(numberValue(latest.total_calories))}</strong></article>
        <article><span>🌙 Spánek</span><strong>${escapeHtml(formatDuration(numberValue(latest.sleep_seconds) ?? (numberValue(latest.sleep_hours) !== null ? numberValue(latest.sleep_hours) * 3600 : null)))}</strong></article>
      </div>
      <div class="garmin-subsection"><h3>Posledních ${Math.min(7, daily.length)} dní</h3><div class="garmin-daily-table-wrap"><table class="garmin-daily-table"><thead><tr><th>Datum</th><th>Kroky</th><th>Aktivní kcal</th><th>Spánek</th></tr></thead><tbody>
      ${daily.slice(-7).reverse().map(row => `<tr><td>${formatDate(row.date)}</td><td>${formatNumber(numberValue(row.steps))}</td><td>${formatNumber(numberValue(row.active_calories))}</td><td>${escapeHtml(formatDuration(numberValue(row.sleep_seconds) ?? (numberValue(row.sleep_hours) !== null ? numberValue(row.sleep_hours) * 3600 : null)))}</td></tr>`).join("")}
      </tbody></table></div></div>
      <div class="garmin-subsection"><h3>Spánek – podrobnosti</h3><div class="garmin-sleep-pills">
        <span>Hluboký <strong>${escapeHtml(formatDuration(sleepDetails.deep_sleep_seconds))}</strong></span>
        <span>Lehký <strong>${escapeHtml(formatDuration(sleepDetails.light_sleep_seconds))}</strong></span>
        <span>REM <strong>${escapeHtml(formatDuration(sleepDetails.rem_sleep_seconds))}</strong></span>
        <span>Vzhůru <strong>${escapeHtml(formatDuration(sleepDetails.awake_sleep_seconds))}</strong></span>
      </div></div>
      <div class="garmin-subsection"><h3>Poslední aktivity (${activities.length})</h3>
        ${activities.length ? `<div class="garmin-import-activities">${activities.slice(0, 10).map(activity => `<article><div><strong>${escapeHtml(activity.name || activity.type || "Aktivita")}</strong><span>${formatDate(activity.date)}</span></div><span>${numberValue(activity.distance_meters) !== null ? `${formatNumber(numberValue(activity.distance_meters) / 1000, 2)} km` : "Vzdálenost —"}</span><span>${escapeHtml(formatDuration(activity.duration_seconds))}</span><span>${numberValue(activity.calories) !== null ? `${formatNumber(numberValue(activity.calories))} kcal` : ""}</span></article>`).join("")}</div>` : `<p class="device-hint">V importovaném exportu nejsou žádné aktivity.</p>`}
      </div>`;
  }

  container.querySelector("#garmin-csv-files").addEventListener("change", async event => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;
    const imported = { daily: null, activities: [], sleepDetails: [], importedAt: new Date().toISOString() };
    const found = new Set();
    try {
      for (const file of files) {
        const rows = parseCsv(await file.text());
        const kind = classifyCsv(rows);
        if (!kind) throw new Error(`Soubor ${file.name} nemá očekávané sloupce Garmin CSV.`);
        found.add(kind);
        if (kind === "daily") imported.daily = rows;
        if (kind === "activities") imported.activities = rows;
        if (kind === "sleepDetails") imported.sleepDetails = rows;
      }
      if (!imported.daily?.length) throw new Error("Vyber také soubor daily_summary.csv.");
      const previous = loadImportedData();
      if (!found.has("activities") && previous?.activities) imported.activities = previous.activities;
      if (!found.has("sleepDetails") && previous?.sleepDetails) imported.sleepDetails = previous.sleepDetails;
      localStorage.setItem(GARMIN_IMPORT_KEY, JSON.stringify(imported));
      importMessage.textContent = `Import dokončen: ${imported.daily.length} denních záznamů, ${imported.activities.length} aktivit a ${imported.sleepDetails.length} záznamů spánku.`;
      renderImportedDashboard();
    } catch (error) {
      importMessage.textContent = `Import se nezdařil: ${error.message || error}`;
      importMessage.classList.add("device-hint-warning");
    } finally {
      event.target.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(GARMIN_IMPORT_KEY);
    importMessage.textContent = "Importovaná data byla odstraněna z tohoto prohlížeče.";
    renderImportedDashboard();
  });

  const status = container.querySelector("#garmin-status");
  const hint = container.querySelector("#garmin-hint");
  const connect = container.querySelector("#garmin-connect");
  async function loadStatus() {
    if (localStorage.getItem("garmin-connected") === "true") {
      status.textContent = "Připojeno";
      status.classList.add("connected");
      connect.textContent = "Připojeno";
      connect.disabled = true;
      hint.textContent = "Oficiální propojení je označeno jako aktivní v tomto prohlížeči.";
    }
    try {
      const response = await fetch(`${GARMIN_API}/status`, { credentials: "include" });
      if (!response.ok) return;
      const data = await response.json();
      if (data.connected) {
        localStorage.setItem("garmin-connected", "true");
        status.textContent = "Připojeno";
        status.classList.add("connected");
        connect.textContent = "Připojeno";
        connect.disabled = true;
        hint.textContent = "Oficiální propojení je aktivní.";
      }
    } catch (_) { /* Statická GitHub Pages verze nemá Garmin backend. */ }
  }

  connect.onclick = async () => {
    try {
      const response = await fetch(`${GARMIN_API}/authorize`, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        if (data.url) { window.location.href = data.url; return; }
      }
    } catch (_) { /* Backend není dostupný. */ }
    hint.textContent = "Přímé propojení přes oficiální Garmin API zatím není aktivní. Pro osobní synchronizaci použij automatický export CSV a import výše.";
    hint.classList.add("device-hint-warning");
  };

  container.querySelector("#devices-back").onclick = () => { setScreen("home"); rerender(); };
  renderImportedDashboard();
  loadStatus();
}
