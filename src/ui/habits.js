import { setScreen } from "../state.js";
import { saveData } from "../data.js";

let habitFilter = "all";
let habitCenterTab = "moje";

export function renderhabits(container, data, rerender) {
  const habits = Object.values(data.habits);
  const positive = habits.filter(h => h.polarity === "+");
  const changing = habits.filter(h => h.polarity === "-");
  const undecided = habits.filter(h => h.polarity == null);
  const neutral = habits.filter(h => h.polarity === "N");
  const completedToday = habits.filter(h => h.completedToday).length;

  data.meta ??= {};
  data.meta.reflection ??= {};
  const reflection = data.meta.reflection;

  container.innerHTML = `
    <section class="habits-center">
      <header class="habits-center-hero">
        <div>
          <span class="habits-eyebrow">🌱 CENTRUM NÁVYKŮ</span>
          <h1>Návyky, které chceš opravdu žít.</h1>
          <p>Nejde jen o odškrtávání. Habit App ti pomůže vybrat malý krok, zasadit ho do běžného dne, postupně ho upevnit a čas od času se zastavit a podívat se, kam směřuješ.</p>
        </div>
        <button type="button" class="habits-primary-action" id="open-helper">Začít s novým návykem →</button>
      </header>

      <nav class="habits-center-tabs" aria-label="Centrum návyků">
        <button type="button" data-tab="moje" class="${habitCenterTab === "moje" ? "active" : ""}">Moje návyky</button>
        <button type="button" data-tab="tvorim" class="${habitCenterTab === "tvorim" ? "active" : ""}">Tvořím návyk</button>
        <button type="button" data-tab="menim" class="${habitCenterTab === "menim" ? "active" : ""}">Měním návyk</button>
        <button type="button" data-tab="reflexe" class="${habitCenterTab === "reflexe" ? "active" : ""}">Reflexe</button>
      </nav>

      <div id="habits-center-content"></div>
    </section>
  `;

  container.querySelectorAll("[data-tab]").forEach(button => {
    button.onclick = () => {
      habitCenterTab = button.dataset.tab;
      rerender();
    };
  });

  container.querySelector("#open-helper").onclick = () => {
    setScreen("wizard", 1);
    rerender();
  };

  const content = container.querySelector("#habits-center-content");

  if (habitCenterTab === "moje") renderMyHabits(content, habits, positive, changing, undecided, neutral);
  if (habitCenterTab === "tvorim") renderCreating(content, data, rerender);
  if (habitCenterTab === "menim") renderChanging(content, changing, data, rerender);
  if (habitCenterTab === "reflexe") renderReflection(content, data, reflection, completedToday);

  function renderMyHabits(target, all, plus, minus, unknown, neut) {
    target.innerHTML = `
      <div class="habits-center-overview">
        <article><strong>${all.length}</strong><span>celkem návyků</span></article>
        <article class="positive"><strong>${plus.length}</strong><span>chci podporovat</span></article>
        <article class="changing"><strong>${minus.length}</strong><span>chci změnit</span></article>
        <article class="unknown"><strong>${unknown.length}</strong><span>zatím nerozhodnuto</span></article>
      </div>

      <section class="habits-guidance-card">
        <div class="guidance-icon">✦</div>
        <div><strong>Nejprve směr, potom systém.</strong><p>Vyber si návyky, které podporují člověka, kterým chceš být. Teprve potom řeš, jak je co nejsnáze dostat do každodenního života.</p></div>
        <button type="button" id="identity-link">Můj směr →</button>
      </section>

      <section class="habits-list-card">
        <div class="habits-list-heading">
          <div><span class="habits-section-kicker">PŘEHLED</span><h2>Co právě sleduješ</h2></div>
          <div class="habit-filters">
            ${filterButton("all", "Vše")}
            ${filterButton("plus", "+")}
            ${filterButton("minus", "měním")}
            ${filterButton("neutral", "N")}
            ${filterButton("unassigned", "?")}
          </div>
        </div>
        <div id="habit-list"></div>
      </section>

      <section class="habit-tools-grid">
        <button type="button" class="habit-tool-card" data-tool="two-minutes"><span>⏱</span><strong>Pravidlo dvou minut</strong><small>Zmenši začátek, aby bylo snadné začít.</small></button>
        <button type="button" class="habit-tool-card" data-tool="habit-stacking"><span>⛓</span><strong>Spojování návyků</strong><small>Naváž nový návyk na něco, co už děláš.</small></button>
        <button type="button" class="habit-tool-card" data-tool="environment-design"><span>🏡</span><strong>Prostředí</strong><small>Udělej dobré volby snadnějšími.</small></button>
        <button type="button" class="habit-tool-card" data-tool="never-miss-twice"><span>↻</span><strong>Nepotřebuješ perfektní řetěz</strong><small>Jeden vynechaný den nemusí nic pokazit.</small></button>
      </section>
    `;

    const list = target.querySelector("#habit-list");
    const filtered = all.filter(h => {
      if (habitFilter === "all") return true;
      if (habitFilter === "plus") return h.polarity === "+";
      if (habitFilter === "minus") return h.polarity === "-";
      if (habitFilter === "neutral") return h.polarity === "N";
      return h.polarity == null;
    });

    if (!filtered.length) {
      list.innerHTML = `<div class="habit-empty">Zatím tu nic není. To je v pořádku — můžeš začít jedním malým krokem.</div>`;
    } else {
      filtered.forEach(habit => list.appendChild(habitRow(habit, data, rerender)));
    }

    target.querySelectorAll("[data-filter]").forEach(btn => btn.onclick = () => {
      habitFilter = btn.dataset.filter;
      rerender();
    });

    target.querySelector("#identity-link").onclick = () => {
      habitCenterTab = "tvorim";
      rerender();
    };

    target.querySelectorAll("[data-tool]").forEach(btn => btn.onclick = () => {
      setScreen("knowhow", btn.dataset.tool);
      rerender();
    });
  }

  function renderCreating(target, appData, redraw) {
    const first = Object.values(appData.habits)[0];
    const identity = appData.meta.identity || first?.wizard?.identity || "";
    target.innerHTML = `
      <section class="habit-coach-layout">
        <div class="habit-coach-main">
          <span class="habits-section-kicker">TVOŘÍM NÁVYK</span>
          <h2>Začni tak malým krokem, že mu nebudeš muset přemlouvat.</h2>
          <p class="habit-coach-lead">Dobré předsevzetí samo o sobě nestačí. Potřebuje konkrétní podnět, jednoduchou první akci a místo v běžném dni.</p>

          <div class="habit-coach-steps">
            <article><b>1</b><div><strong>Vyber si, kým chceš být</strong><p>Nejen „co chci dělat“, ale jakého člověka tím postupně dokazuji, že jsem.</p></div></article>
            <article><b>2</b><div><strong>Najdi existující kotvu</strong><p>„Po ranní kávě…“, „po vyčištění zubů…“, „když přijdu domů…“.</p></div></article>
            <article><b>3</b><div><strong>Zmenši první krok</strong><p>Pokud je začátek příliš velký, použij pravidlo dvou minut.</p></div></article>
            <article><b>4</b><div><strong>Uprav prostředí</strong><p>Připrav to, co potřebuješ, a odstraň zbytečné tření.</p></div></article>
          </div>

          <div class="habit-identity-box">
            <label for="habit-identity">Chci být člověkem, který…</label>
            <textarea id="habit-identity" placeholder="Např. pečuje o své tělo, je klidnější a drží slovo sám sobě.">${escapeHtml(identity)}</textarea>
          </div>

          <button type="button" class="habits-primary-action" id="full-wizard">Projít průvodce krok za krokem →</button>
        </div>
        <aside class="habit-coach-side">
          <div class="habit-side-card"><span>💡</span><strong>Malý začátek není podvádění.</strong><p>Cílem prvních opakování je naučit mozek, že nový návyk opravdu patří do tvého života.</p></div>
          <div class="habit-side-card"><span>⛓</span><strong>Spojování návyků</strong><p>Nový návyk můžeš přilepit k něčemu, co už děláš automaticky. Vzorec: <em>Po X udělám Y.</em></p><button type="button" class="inline-link" data-topic="habit-stacking">Zjistit více →</button></div>
        </aside>
      </section>
    `;

    const field = target.querySelector("#habit-identity");
    field.oninput = () => {
      appData.meta.identity = field.value;
      Object.values(appData.habits).forEach(h => { h.wizard ??= {}; h.wizard.identity = field.value; });
      saveData(appData);
    };

    target.querySelector("#full-wizard").onclick = () => { setScreen("wizard", 1); redraw(); };
    target.querySelectorAll("[data-topic]").forEach(btn => btn.onclick = () => { setScreen("knowhow", btn.dataset.topic); redraw(); });
  }

  function renderChanging(target, minus, appData, redraw) {
    target.innerHTML = `
      <section class="habit-coach-layout">
        <div class="habit-coach-main">
          <span class="habits-section-kicker">MĚNÍM NÁVYK</span>
          <h2>Nejde o boj se sebou. Jde o změnu podmínek.</h2>
          <p class="habit-coach-lead">U návyku, který ti neslouží, zkus najít spouštěč, potřebu za ním a jednodušší alternativu.</p>
          <div class="change-framework">
            <div><strong>Podnět</strong><span>Kdy, kde a co ho spouští?</span></div>
            <div><strong>Potřeba</strong><span>Co ti tento návyk ve chvíli, kdy ho děláš, přináší?</span></div>
            <div><strong>Alternativa</strong><span>Jak můžeš stejnou potřebu naplnit jinak?</span></div>
            <div><strong>Tření</strong><span>Jak můžeš nežádoucí volbu udělat o trochu méně snadnou?</span></div>
          </div>
          <div class="habit-change-list">
            ${minus.length ? minus.map(h => `<button type="button" class="habit-change-item" data-habit-id="${h.id}"><span class="change-dot">−</span><strong>${escapeHtml(h.name)}</strong><span>Otevřít a upravit plán →</span></button>`).join("") : `<div class="habit-empty">Zatím nemáš žádný návyk označený jako „chci změnit“. Můžeš tak označit některý ze svých návyků v přehledu.</div>`}
          </div>
        </div>
        <aside class="habit-coach-side">
          <div class="habit-side-card"><span>🌿</span><strong>Bez trestání sebe sama.</strong><p>Smyslem je vytvořit prostředí, ve kterém je žádoucí volba jednodušší a návrat po chybě přirozený.</p></div>
          <button type="button" class="habit-side-link" id="bad-habits-link">Jak pracovat se zlozvykem →</button>
        </aside>
      </section>
    `;
    target.querySelectorAll("[data-habit-id]").forEach(btn => btn.onclick = () => { setScreen("habitdetail", btn.dataset.habitId); redraw(); });
    target.querySelector("#bad-habits-link").onclick = () => { setScreen("knowhow", "bad-habits"); redraw(); };
  }

  function renderReflection(target, appData, ref, todayCount) {
    target.innerHTML = `
      <section class="reflection-layout">
        <div class="reflection-main">
          <span class="habits-section-kicker">ZASTAVENÍ</span>
          <h2>Jsem na správné cestě?</h2>
          <p class="habit-coach-lead">Nemusíš mít perfektní týden. Zkus se na chvíli zastavit a podívat se, jestli děláš v rámci svých možností to, co můžeš.</p>
          <div class="reflection-statement"><span>„</span><strong>Dělám v rámci svých možností to, co mohu?</strong><span>“</span></div>
          <label class="reflection-field">Co se mi tento týden podařilo?<textarea id="reflection-win" placeholder="I malá věc se počítá…">${escapeHtml(ref.win || "")}</textarea></label>
          <label class="reflection-field">Co mi tento týden nešlo a proč?<textarea id="reflection-hard" placeholder="Bez hodnocení. Jen si toho všimni.">${escapeHtml(ref.hard || "")}</textarea></label>
          <label class="reflection-field">Jaký jeden malý krok chci zkusit příště?<textarea id="reflection-next" placeholder="Co je dost malé, aby to šlo opravdu udělat?">${escapeHtml(ref.next || "")}</textarea></label>
          <button type="button" class="habits-primary-action" id="save-reflection">Uložit reflexi</button>
        </div>
        <aside class="reflection-side">
          <div class="reflection-score"><strong>${todayCount}</strong><span>návyky označené jako splněné dnes</span></div>
          <div class="habit-side-card"><span>🪞</span><strong>Pokrok není jen číslo.</strong><p>Každé malé vítězství je informace: „Takhle vypadá život, který chci žít.“</p></div>
          <div class="habit-side-card"><span>🌱</span><strong>Jednou týdně se zastav.</strong><p>Podívej se na směr, ne jen na výkon. Pokud něco nefunguje, uprav systém — ne svou hodnotu.</p></div>
        </aside>
      </section>
    `;

    target.querySelectorAll(".reflection-field textarea").forEach(field => {
      const key = field.id.replace("reflection-", "");
      field.oninput = () => { ref[key] = field.value; saveData(appData); };
    });
    target.querySelector("#save-reflection").onclick = () => {
      ref.savedAt = new Date().toISOString();
      saveData(appData);
      target.querySelector("#save-reflection").textContent = "Uloženo ✓";
      setTimeout(() => { if (target.querySelector("#save-reflection")) target.querySelector("#save-reflection").textContent = "Uložit reflexi"; }, 1400);
    };
  }
}

function habitRow(habit, data, rerender) {
  const item = document.createElement("article");
  item.className = "habit-center-row clickable";
  const badge = habit.polarity === "+" ? "Podporuji" : habit.polarity === "-" ? "Chci změnit" : habit.polarity === "N" ? "Neutrální" : "Nerozhodnuto";
  const badgeClass = habit.polarity === "+" ? "positive" : habit.polarity === "-" ? "changing" : habit.polarity === "N" ? "neutral" : "unknown";
  item.innerHTML = `
    <div class="habit-row-main"><span class="habit-status-dot ${badgeClass}"></span><div><strong>${escapeHtml(habit.name)}</strong><small>${habit.place ? escapeHtml(habit.place) : "Bez nastaveného místa"}</small></div></div>
    <div class="habit-row-meta"><span class="habit-status-label ${badgeClass}">${badge}</span><div class="habit-row-actions"><button type="button" class="pol-btn ${habit.polarity === "+" ? "selected" : ""}" data-p="+">+</button><button type="button" class="pol-btn ${habit.polarity === "N" ? "selected" : ""}" data-p="N">N</button><button type="button" class="pol-btn ${habit.polarity === "-" ? "selected" : ""}" data-p="-">−</button></div><span class="habit-arrow">→</span></div>
  `;
  item.onclick = () => { setScreen("habitdetail", habit.id); rerender(); };
  item.querySelectorAll("[data-p]").forEach(btn => btn.onclick = e => {
    e.stopPropagation();
    habit.polarity = habit.polarity === btn.dataset.p ? null : btn.dataset.p;
    saveData(data);
    rerender();
  });
  return item;
}

function filterButton(value, label) {
  return `<button type="button" data-filter="${value}" class="${habitFilter === value ? "active" : ""}">${label}</button>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}
