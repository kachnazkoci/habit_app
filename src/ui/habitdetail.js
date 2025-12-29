import { setScreen } from "../state.js";
import { saveData } from "../data.js";

export function renderhabitdetail(container, data, habitid, rerender) {
  const habit = data.habits[habitid];
  if (!habit) return;

  container.innerHTML = `
    <h2>Editace návyku</h2>

    <label>Název <input id="habit-name" value="${habit.name}"></label>
    <label>Místo <input id="habit-place" value="${habit.place || ""}"></label>

    <button id="save-habit">Uložit</button>
    <button id="delete-habit" class="danger">Smazat</button>

    <h3>Nový plán</h3>

    <label>Datum <input type="date" id="start-date"></label>
    <label>Čas <input type="time" id="start-time"></label>

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

    <button id="add-plan">Přidat plán</button>

    <h3>Plány</h3>
    <div id="plans"></div>

    <button id="back">Zpět</button>
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

  /* ================= OPAKOVÁNÍ UI ================= */

  const options = document.getElementById("repeat-options");
  const summary = document.getElementById("repeat-summary");

  container.querySelectorAll("input[name=repeat-type]").forEach(r => {
    r.onchange = () => renderRepeatOptions(r.value);
  });

  function renderRepeatOptions(type) {
    options.innerHTML = "";
    summary.textContent = "";

    if (type === "none") return;

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
          ${radio("monthly-mode", "day", "Stejný den každý měsíc")}
          ${radio("monthly-mode", "week", "Stejný týden každý měsíc")}
        </div>
        <div id="monthly-options"></div>
      `;

      options.querySelectorAll("input[name=monthly-mode]").forEach(r => {
        r.onchange = () => renderMonthly(r.value);
      });
    }
    updateSummary();
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
    const type = container.querySelector("input[name=repeat-type]:checked").value;
    if (type === "none") {
      summary.textContent = "Jednorázově";
      return;
    }

    const interval = document.getElementById("interval")?.value || 1;
    const until = document.getElementById("until")?.value;

    if (type === "daily") {
      summary.textContent = `Každý ${interval}. den do ${until || "∞"}`;
    }

    if (type === "weekly") {
      summary.textContent = `Každý ${interval}. týden do ${until || "∞"}`;
    }

    if (type === "monthly") {
      const mode = container.querySelector("input[name=monthly-mode]:checked")?.value;
      if (mode === "day") {
        const btn = container.querySelector(".day-btn.active");
        if (btn)
          summary.textContent = `Každý měsíc ${btn.dataset.day}. den do ${until || "∞"}`;
      }
      if (mode === "week") {
        const w = document.getElementById("month-week")?.value;
        const d = document.getElementById("month-weekday")?.selectedOptions[0].text;
        summary.textContent = `Každý ${w}. ${d} v měsíci do ${until || "∞"}`;
      }
    }
  }

  /* ================= PŘIDÁNÍ PLÁNU ================= */

  document.getElementById("add-plan").onclick = () => {
    const date = document.getElementById("start-date").value;
    if (!date) return alert("Vyber datum");

    const plan = {
      date,
      time: document.getElementById("start-time").value,
      repeat: container.querySelector("input[name=repeat-type]:checked").value,
      doneDates: {}
    };

    if (plan.repeat !== "none") {
      plan.interval = Number(document.getElementById("interval").value);
      plan.until = document.getElementById("until").value || null;
    }

    if (plan.repeat === "weekly") {
      plan.weekdays = [...container.querySelectorAll(".weekdays input:checked")]
        .map(cb => Number(cb.value));
    }

    if (plan.repeat === "monthly") {
      const mode = container.querySelector("input[name=monthly-mode]:checked").value;
      plan.monthlyType = mode;

      if (mode === "day") {
        plan.monthDay = Number(container.querySelector(".day-btn.active").dataset.day);
      }

      if (mode === "week") {
        plan.weekIndex = document.getElementById("month-week").value;
        plan.weekday = Number(document.getElementById("month-weekday").value);
      }
    }

    habit.plans.push(plan);
    saveData(data);
    rerender();
  };

  /* ================= EXISTUJÍCÍ PLÁNY ================= */

  const plansDiv = document.getElementById("plans");
  habit.plans.forEach(p => {
    const d = document.createElement("div");
    d.className = "item";
    d.textContent = `${p.date} ${p.time || ""}`;
    plansDiv.appendChild(d);
  });

  document.getElementById("back").onclick = () => {
    setScreen("habits");
    rerender();
  };
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