import { setScreen } from "../state.js";

export function rendertoday(container, data, rerender) {
  container.innerHTML = "<h2>dnes</h2>";

  const today = new Date().toISOString().slice(0, 10);
  let found = false;

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (plan.date === today) {
        found = true;

        const d = document.createElement("div");
        d.className = "item clickable";
        d.textContent = `${habit.name} • ${plan.time}`;

        d.onclick = () => {
          setScreen("habitdetail", habit.id);
          rerender();
        };

        container.appendChild(d);
      }
    });
  });

  if (!found) {
    container.innerHTML += "<p>zatím zde nejsou žádné plány</p>";
  }
}
