import { setScreen } from "../state.js";
import { saveData } from "../data.js";

let editingPlanId = null;

export function renderhabitdetail(container, data, habitid, rerender) {
  const habit = data.habits[habitid];
  if (!habit) return;
  habit.plans ??= [];

  const today = new Date().toISOString().slice(0, 10);

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

    <!-- PLÁN -->
    <section class="card">
      <h3 class="section-subtitle" id="plan-title">Nový plán</h3>

      <div class="form-block">
        <label>Datum od</label>
        <input type="date" id="start-date" value="${today}">
      </div>

      <div class="repeat-box">
        <div class="repeat-header">
          <strong>Opakování</strong>
          <span id="repeat-summary"></span>
        </div>

        <div class="switch-row">
          ${radio("repeat-type", "none", "Jednorázově", true)}
          ${radio("repeat-type", "daily", "Denně")}
          ${radio("repeat-type", "weekly", "Týdně")}
          ${radio("repeat-type", "monthly", "Měsíčně")}
        </div>

        <div id="repeat-options"></div>
      </div>

      <div class="actions-row">
        <button id="save-plan">Přidat plán</button>
        <button id="cancel-edit" class="secondary" style="display:none">Zrušit</button>
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

  /* ================= NÁVYK ================= */

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
        <label>Do: <input type="date" id="until" value="${today}"></label>
      </div>
    `;

    if (type === "weekly") {
      options.innerHTML += `<div class="weekdays">${weekdays()}</div>`;
    }

    document.getElementById("interval").onchange = updateSummary;
    document.getElementById("until").onchange = updateSummary;
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
  }

  /* ================= ULOŽENÍ PLÁNU ================= */

  document.getElementById("save-plan").onclick = () => {
    const type = container.querySelector("input[name=repeat-type]:checked").value;
    const startDate = document.getElementById("start-date").value;

    if (!startDate) {
      alert("Vyber datum");
      return;
    }

    const plan = {
      id: editingPlanId || crypto.randomUUID(),
      date: startDate,
      repeat: type,
      interval: Number(document.getElementById("interval")?.value || 1),
      until: document.getElementById("until")?.value || null,
      doneDates: editingPlanId
        ? habit.plans.find(p => p.id === editingPlanId)?.doneDates || {}
        : {}
    };

    if (type === "weekly") {
      plan.weekdays = [...options.querySelectorAll("input[type=checkbox]:checked")]
        .map(cb => Number(cb.value));

      if (plan.weekdays.length === 0) {
        alert("Vyber alespoň jeden den v týdnu");
        return;
      }
    }

    if (editingPlanId) {
      const idx = habit.plans.findIndex(p => p.id === editingPlanId);
      habit.plans[idx] = plan;
    } else {
      habit.plans.push(plan);
    }

    saveData(data);
    editingPlanId = null;
    rerender();
  };

  document.getElementById("cancel-edit").onclick = () => {
    editingPlanId = null;
    rerender();
  };

  /* ================= VÝPIS PLÁNŮ ================= */

  const plansDiv = document.getElementById("plans");
  plansDiv.innerHTML = "";

  habit.plans.forEach(plan => {
    const row = document.createElement("div");
    row.className = "plan-row item";

    row.innerHTML = `
      <span>${plan.date}${plan.repeat !== "none" ? " (opakování)" : ""}</span>
      <span class="plan-icons">
        <span class="icon edit" title="Upravit">✏️</span>
        <span class="icon delete" title="Smazat">🗑</span>
      </span>
    `;

    row.querySelector(".edit").onclick = () => {
      editingPlanId = plan.id;
      document.getElementById("plan-title").textContent = "Editace plánu";
      document.getElementById("save-plan").textContent = "Uložit plán";
      document.getElementById("cancel-edit").style.display = "inline-block";
      document.getElementById("start-date").value = plan.date;

      container.querySelector(`input[value="${plan.repeat}"]`).checked = true;
      renderRepeatOptions(plan.repeat);
    };

    row.querySelector(".delete").onclick = () => {
      if (!confirm("Opravdu smazat tento plán?")) return;
      habit.plans = habit.plans.filter(p => p.id !== plan.id);
      saveData(data);
      rerender();
    };

    plansDiv.appendChild(row);
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
