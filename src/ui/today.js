import { setScreen } from "../state.js";

export function rendertoday(container, data, rerender, dateOverride = null) {
  const date = dateOverride || new Date().toISOString().slice(0, 10);

  container.innerHTML = `<h2>${dateOverride ? "den" : "dnes"} – ${date}</h2>`;
  let found = false;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (planOccursOn(plan, date)) {
        found = true;

        const done =
          plan.doneDates && plan.doneDates[date] === true;

        const d = document.createElement("div");
d.className = "item";

d.innerHTML = `
  <label class="plan-row">
    <input type="checkbox" ${done ? "checked" : ""}>
    <span class="plan-check">${done ? "✔" : ""}</span>
    <span>${habit.name} • ${plan.time || ""}</span>
  </label>
`;

const checkbox = d.querySelector("input");
checkbox.onchange = () => {
  if (!plan.doneDates) plan.doneDates = {};
  plan.doneDates[date] = checkbox.checked;
  rerender();
};

d.ondblclick = () => {
  setScreen("habitdetail", habit.id);
  rerender();
};

container.appendChild(d);

      }
    });
  });

  if (!found) {
    container.innerHTML += "<p>na tento den nejsou žádné plány</p>";
  }
}

/* ===== helper ===== */

function planOccursOn(plan, date) {
  // jednorázový plán
  if (plan.date === date) return true;

  // opakování
  if (!plan.repeat) return false;

  if (plan.repeat === "daily") return true;

  if (plan.repeat === "weekly") {
    const day = new Date(date).getDay();
    return plan.weekdays?.includes(day);
  }

  return false;
}
