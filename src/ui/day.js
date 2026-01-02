import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { setScreen } from "../state.js";

export function renderday(container, data, dateISO, back, rerender) {
  const date = new Date(dateISO);

  const dayName = date.toLocaleDateString("cs-CZ", { weekday: "long" });
  const dateText = date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  container.innerHTML = `
    <div class="day-header">
      <h2 class="day-title">
        ${dayName.charAt(0).toUpperCase() + dayName.slice(1)}
        ${dateText}
        <span id="day-summary" class="day-sup"></span>
      </h2>

      <button id="back" class="icon-btn back-btn" aria-label="Zpět">↩</button>
    </div>

    <div id="day-habits"></div>
  `;

  document.getElementById("back").onclick = back;

  const summaryEl = document.getElementById("day-summary");
  const listEl = document.getElementById("day-habits");

  const info = getDayStatus(data, dateISO);

  if (!info) {
    summaryEl.textContent = "0/0";
    summaryEl.className = "day-sup missed";
  } else {
    summaryEl.textContent = `${info.done}/${info.total}`;
    summaryEl.className =
      "day-sup " +
      (info.done === 0
        ? "missed"
        : info.done < info.total
        ? "pending"
        : "done");
  }

  let hasAnyPlan = false;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;

      hasAnyPlan = true;

      const done = plan.doneDates?.[dateISO] === true;

      const row = document.createElement("div");
      row.className = "item plan-row habit-text clickable";

      row.innerHTML = `
        <input type="checkbox" ${done ? "checked" : ""}>
        <span class="plan-text ${done ? "done" : ""}">
          ${habit.name}
        </span>
      `;

      // 👉 STEJNÉ CHOVÁNÍ JAKO today
      row.onclick = () => {
        setScreen("habitdetail", habit.id);
        rerender();
      };

      const cb = row.querySelector("input");

      cb.onclick = e => e.stopPropagation();

      cb.onchange = () => {
        plan.doneDates ??= {};
        if (cb.checked) plan.doneDates[dateISO] = true;
        else delete plan.doneDates[dateISO];

        saveData(data);
        rerender();
      };

      listEl.appendChild(row);
    });
  });

  if (!hasAnyPlan) {
    const info = document.createElement("div");
    info.className = "day-empty-info";
    info.innerHTML = `
      Pro tento den zatím není stanoven žádný plán návyků.<br>
      Pro přidání plánu návyků přejděte do sekce <strong>Návyky</strong>.
    `;
    listEl.appendChild(info);
  }
}
