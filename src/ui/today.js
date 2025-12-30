import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { todayISO } from "../utils/date.js";

export function rendertoday(container, data, rerender) {
  const today = todayISO();

  container.innerHTML = `<h2>Dnes</h2>`;

  let hasAnyPlan = false;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, today)) return;

      hasAnyPlan = true;

      const done = plan.doneDates?.[today] === true;

      const row = document.createElement("div");
      row.className = "item plan-row habit-text";

      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span class="plan-text ${done ? "done" : ""}">
          ${habit.name}
        </span>
      `;

      const cb = row.querySelector("input");
      cb.onchange = () => {
        plan.doneDates ??= {};
        if (cb.checked) plan.doneDates[today] = true;
        else delete plan.doneDates[today];

        saveData(data);
        rerender(); // přepočítá i kalendář
      };

      container.appendChild(row);
    });
  });

  if (!hasAnyPlan) {
    const info = document.createElement("div");
    info.className = "day-empty-info";
    info.innerHTML = `
      Pro dnešní den zatím není stanoven žádný plán návyků.<br>
      Plány lze přidat v sekci <strong>Návyky</strong>.
    `;
    container.appendChild(info);
  }
}
