import { setScreen } from "../state.js";

export function renderhabitdetail(container, data, habitid, rerender) {
  const habit = data.habits[habitid];
  if (!habit) {
    container.innerHTML = "<p>Návyk nenalezen</p>";
    return;
  }

  container.innerHTML = `
    <h2>${habit.name}</h2>
    <p>${habit.place || ""}</p>

    <h3>Plány</h3>
    <div id="plans"></div>

    <button id="back">Zpět</button>
  `;

  const plansDiv = container.querySelector("#plans");

  habit.plans.forEach(plan => {
    // zobrazujeme jen jednorázové / základní plány
    const d = document.createElement("div");
    d.className = "item";

    const doneDates = plan.doneDates || {};
    const today = new Date().toISOString().slice(0, 10);
    const isDone = doneDates[today] === true;

    d.innerHTML = `
      <label class="plan-row">
        <input type="checkbox" ${isDone ? "checked" : ""}>
        <span class="plan-check">${isDone ? "✔" : ""}</span>
        <span>${plan.date ?? ""} ${plan.time}</span>
      </label>
    `;

    const checkbox = d.querySelector("input");

    checkbox.onchange = () => {
      plan.doneDates ??= {};

      if (checkbox.checked) {
        plan.doneDates[today] = true;
      } else {
        delete plan.doneDates[today];
      }

      rerender();
    };

    plansDiv.appendChild(d);
  });

  document.getElementById("back").onclick = () => {
    setScreen("habits");
    rerender();
  };
}
