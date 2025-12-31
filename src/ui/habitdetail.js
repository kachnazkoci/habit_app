import { setScreen } from "../state.js";
import { saveData } from "../data.js";

export function renderhabitdetail(container, data, habitid, rerender) {
  const habit = data.habits[habitid];
  if (!habit) return;
  if (!habit.plans) habit.plans = [];

  container.innerHTML = `
    <!-- EDITACE NÁVYKU -->
    <section class="card">
      <h2 class="section-title">Editace návyku</h2>

      <div class="form-block">
        <label>Název</label>
        <input id="habit-name" value="${habit.name}">
      </div>

      <div class="form-block">
        <label>Místo</label>
        <input id="habit-place" value="${habit.place || ""}">
      </div>

      <div class="actions-row">
        <button id="save-habit">Uložit</button>
        <button id="delete-habit" class="danger">Smazat</button>
      </div>
    </section>

    <!-- NOVÝ PLÁN -->
    <section class="card">
      <h3 class="section-subtitle">Nový plán</h3>

      <div class="form-block">
        <label>Datum</label>
        <input type="date" id="start-date">
      </div>

      <div class="repeat-box">
        <div class="repeat-header">
          <strong>Opakování</strong>
          <span id="repeat-summary"></span>
        </div>

        <div class="switch-row">
          ${radio("repeat-type", "none", "Žádné", true)}
          ${radio("repeat-type", "daily", "Denně")}
          ${radio("repeat-type", "weekly", "Týdně")}
          ${radio("repeat-type", "monthly", "Měsíčně")}
        </div>

        <div id="repeat-options"></div>
      </div>

      <div class="actions-row">
        <button id="add-plan">Přidat plán</button>
      </div>
    </section>

    <!-- EXISTUJÍCÍ PLÁNY -->
    <section class="card">
      <h3 class="section-subtitle">Plány</h3>
      <div id="plans"></div>
    </section>

    <div class="actions-row">
      <button id="back">Zpět</button>
    </div>
  `;

  /* ================= EDIT NÁVYKU ================= */

  document.getElementById("save-habit").onclick = () => {
    habit.name = document.getElementById("habit-name").value.trim();
    habit.place = document.getElementById("habit-place").value.trim();
    saveData(data);
    rerender();
  };

  document.getElementById("delete-habit").onclick = () => {
    if (!confirm("Smazat celý návyk?")) return;
    delete data.habits[habitid];
    saveData(data);
    setScreen("habits");
    rerender();
  };

  document.getElementById("back").onclick = () => {
    setScreen("habits");
    rerender();
  };

  /* ================= OPAKOVÁNÍ ================= */

  const options = document.getElementById("repeat-options");
  const summary = document.getElementById("repeat-summary");

  container.querySelectorAll("input[name=repeat-type]").forEach(r => {
    r.onchange = () => renderRepeatOptions(r.value);
  });

  function renderRepeatOptions(type) {
    options.innerHTML = "";
    summary.textContent = "";

    if (type === "none") {
      summary.textContent = "Jednorázově";
      return;
    }

    options.innerHTML = `
      <div class="switch-row">
        Interval
        <input type="number" id="interval" value="1" min="1">
        <span>${type === "daily" ? "den" : type === "weekly" ? "týden" : "měsíc"}</span>
        <label>Do: <input type="date" id="until"></label>
      </div>
    `;

    if (type === "weekly") {
      options.innerHTML += `<div class="weekdays">${weekdays()}</div>`;
    }

    if (type === "monthly") {
      options.innerHTML += `
        <div class="switch-row">
          ${radio("monthly-mode", "day", "Stejný den")}
          ${radio("monthly-mode", "week", "Stejný týden")}
        </div>
        <div id="monthly-options"></div>
      `;

      options.querySelectorAll("input[name=monthly-mode]").forEach(r => {
        r.onchange = () => renderMonthly(r.value);
      });
    }

    options.querySelector("#interval").onchange = updateSummary;
    options.querySelector("#until").onchange = updateSummary;
  }

  function renderMonthly(mode) {
    const box = document.getElementById("monthly-options");
    box.innerHTML = "";

    if (mode === "day") {
      box.innerHTML = `
        <div class="month-grid">
          ${Array.from({ length: 31 }, (_, i) =>
            `<button class="day-btn" data-day="${i + 1}">${i + 1}</button>`
          ).join("")}
        </div>
      `;

      box.querySelectorAll(".day-btn").forEach(btn => {
        btn.onclick = () => {
          box.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          updateSummary();
        };
      });
    }

    if (mode === "week") {
      box.innerHTML = `
        <div class="switch-row">
          <select id="month-week">
            <option value="1">1.</option>
            <option value="2">2.</option>
            <option value="3">3.</option>
            <option value="4">4.</option>
            <option value="last">Poslední</option>
          </select>

          <select id="month-weekday">
            ${["Ne","Po","Út","St","Čt","Pá","So"]
              .map((d,i)=>`<option value="${i}">${d}</option>`).join("")}
          </select>
        </div>
      `;

      box.querySelector("#month-week").onchange = updateSummary;
      box.querySelector("#month-weekday").onchange = updateSummary;
    }
  }

  function updateSummary() {
    const type = container.querySelector("input[name=repeat-type]:checked")?.value;
    if (!type || type === "none") {
      summary.textContent = "Jednorázově";
      return;
    }

    const interval = Number(document.getElementById("interval")?.value || 1);
    const until = document.getElementById("until")?.value;

    if (type === "daily") {
      summary.textContent = `Každý ${interval} den${until ? " do " + until : ""}`;
    }

    if (type === "weekly") {
      summary.textContent = `Každý ${interval} týden${until ? " do " + until : ""}`;
    }

    if (type === "monthly") {
      const mode = container.querySelector("input[name=monthly-mode]:checked")?.value;

      if (mode === "day") {
        const btn = container.querySelector(".day-btn.active");
        if (!btn) return;
        summary.textContent =
          `Každý měsíc ${btn.dataset.day}. den${until ? " do " + until : ""}`;
      }

      if (mode === "week") {
        const w = document.getElementById("month-week")?.value;
        const d = document.getElementById("month-weekday")?.selectedOptions[0]?.text;
        if (!w || !d) return;
        summary.textContent =
          `Každý ${w}. ${d} v měsíci${until ? " do " + until : ""}`;
      }
    }
  }

  /* ================= PLÁNY ================= */

  const plansDiv = document.getElementById("plans");
  plansDiv.innerHTML = "";

  habit.plans.forEach(p => {
    const d = document.createElement("div");
    d.className = "item";
    d.textContent = p.date + (p.repeat !== "none" ? " (opakování)" : "");
    plansDiv.appendChild(d);
  });
}

/* helpers */

function radio(name, value, label, checked = false) {
  return `
    <label>
      <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}>
      ${label}
    </label>
  `;
}

function weekdays() {
  return [["Po",1],["Út",2],["St",3],["Čt",4],["Pá",5],["So",6],["Ne",0]]
    .map(([l,v]) => `<label><input type="checkbox" value="${v}">${l}</label>`)
    .join("");
}
