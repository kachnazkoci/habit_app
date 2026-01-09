import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { setScreen } from "../state.js";
import { rerender } from "../app.js";

function addDays(dateISO, diff) {
  const d = new Date(dateISO);
  d.setDate(d.getDate() + diff);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

export function renderday(container, data, dateISO) {
  const date = new Date(dateISO);

  const dayName = date.toLocaleDateString("cs-CZ", { weekday: "long" });
  const dateText = date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  container.innerHTML = `
    <div class="day-page-header">
      <div class="day-back">
        <button id="back" class="icon-btn">↩</button>
      </div>

      <div class="day-header">
        <button id="prev-day" class="icon-btn">◀</button>
        <h2>${dayName} ${dateText}</h2>
        <button id="next-day" class="icon-btn">▶</button>
      </div>
    </div>

    <div id="day-habits"></div>
  `;

  /* ===== NAVIGATION ===== */

  document.getElementById("back").onclick = () => {
    setScreen("calendar");
    rerender();
  };

  document.getElementById("prev-day").onclick = () => {
    setScreen("day", addDays(dateISO, -1));
    rerender();
  };

  document.getElementById("next-day").onclick = () => {
    setScreen("day", addDays(dateISO, +1));
    rerender();
  };

  /* ===== HABITS ===== */

  const listEl = document.getElementById("day-habits");

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;

      const done = plan.doneDates?.[dateISO] === true;

      const row = document.createElement("div");
      row.className = "item plan-row clickable";
      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span class="${done ? "done" : ""}">${habit.name}</span>
      `;

      row.onclick = () => {
        setScreen("habitdetail", habit.id);
        rerender();
      };

      const cb = row.querySelector("input");
      cb.onclick = e => e.stopPropagation();
      cb.onchange = () => {
        plan.doneDates ??= {};
        cb.checked
          ? plan.doneDates[dateISO] = true
          : delete plan.doneDates[dateISO];
        saveData(data);
        rerender();
      };

      listEl.appendChild(row);
    });
  });
}
