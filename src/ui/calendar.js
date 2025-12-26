import { setScreen } from "../state.js";

export function rendercalendar(container, data, rerender) {
  container.innerHTML = `<h2>kalendář</h2>`;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      const d = document.createElement("div");
      d.className = "item clickable";
      d.textContent = `${plan.date} • ${habit.name} ${plan.time}`;

      d.onclick = () => {
        setScreen("habitdetail", habit.id);
        rerender();
      };

      container.appendChild(d);
    });
  });
}
