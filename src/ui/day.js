import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";

export function renderday(container, data, dateISO, back) {
  const date = new Date(dateISO);
  const dayName = date.toLocaleDateString("cs-CZ", { weekday: "long" });
  const dateText = date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  container.innerHTML = `
    <button id="back">← Zpět</button>

    <div class="day-header">
      <h2>${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dateText}</h2>
      <span id="day-summary" class="day-sup"></span>
    </div>

    <div id="day-habits"></div>
  `;

  document.getElementById("back").onclick = back;

  const summaryEl = document.getElementById("day-summary");
  const listEl = document.getElementById("day-habits");

  const info = getDayStatus(data, dateISO);
  if (!info) {
    summaryEl.textContent = "0/0";
    return;
  }

  summaryEl.textContent = `${info.done}/${info.total}`;
  summaryEl.className =
    "day-sup " +
    (info.done === 0 ? "missed" :
     info.done < info.total ? "pending" : "done");

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;

      const row = document.createElement("div");
      row.className = "plan-row habit-text";

      const done = !!plan.doneDates?.[dateISO];

      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span class="plan-text ${done ? "done" : ""}">
          ${habit.name}
        </span>
      `;

      const cb = row.querySelector("input");
      cb.onchange = () => {
        plan.doneDates ??= {};
        if (cb.checked) plan.doneDates[dateISO] = true;
        else delete plan.doneDates[dateISO];

        saveData(data);
        renderday(container, data, dateISO, back);
      };

      listEl.appendChild(row);
    });
  });
}
