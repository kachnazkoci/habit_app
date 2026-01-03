import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { setScreen } from "../state.js";
import { rerender } from "../app.js";

export function renderday(container, data, dateISO, rerender) {
  const date = new Date(dateISO);
  const dayName = date.toLocaleDateString("cs-CZ", { weekday: "long" });
  const dateText = date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  container.innerHTML = `
    <div class="day-header">
      <button id="back" class="icon-btn">↩</button>
      <h2>
        ${dayName} ${dateText}
        <span id="day-summary"></span>
      </h2>
    </div>
    <div id="day-habits"></div>
  `;

  document.getElementById("back").onclick = () => {
    setScreen("calendar");
    rerender();
  };

  const listEl = document.getElementById("day-habits");

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;

      const done = plan.doneDates?.[dateISO];

      const row = document.createElement("div");
      row.className = "item plan-row clickable";

      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span>${habit.name}</span>
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
