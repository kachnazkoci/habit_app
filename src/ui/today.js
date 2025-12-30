import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { todayISO } from "../utils/date.js";

export function rendertoday(container, data, rerender) {
  const today = todayISO();

  container.innerHTML = `<h2>Dnes</h2>`;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, today)) return;

      const done = plan.doneDates?.[today] === true;

      const row = document.createElement("label");
      row.className = "item plan-row";

      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span class="plan-text">${habit.name}</span>
      `;

      const cb = row.querySelector("input");
      cb.onchange = () => {
        plan.doneDates ??= {};
        if (cb.checked) {
          plan.doneDates[today] = true;
        } else {
          delete plan.doneDates[today];
        }
        saveData(data);
        rerender(); // 🔥 přepočítá i kalendář
      };

      container.appendChild(row);
    });
  });
}
