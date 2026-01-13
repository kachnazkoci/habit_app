import { formatDateHuman } from "../utils/date.js";
import { planOccursOn } from "./repeat.js";

export function renderDay(
  container,
  data,
  dateISO,
  onBack = null,
  showBack = true
) {
  container.innerHTML = "";

  const date = new Date(dateISO);

  /* ================= HEADER ================= */

  const header = document.createElement("div");
  header.className = `day-header ${
    showBack ? "day-header--with-back" : "day-header--no-back"
  }`;

  if (showBack && onBack) {
    const backBtn = document.createElement("button");
    backBtn.className = "day-back";
    backBtn.textContent = "↩";
    backBtn.onclick = onBack;
    header.appendChild(backBtn);
  }

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "◀";
  prevBtn.onclick = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    renderDay(container, data, d.toISOString().slice(0, 10), onBack, showBack);
  };

  const title = document.createElement("h2");
  title.textContent = formatDateHuman(date);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "▶";
  nextBtn.onclick = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    renderDay(container, data, d.toISOString().slice(0, 10), onBack, showBack);
  };

  header.append(prevBtn, title, nextBtn);
  container.appendChild(header);

  /* ================= HABITS ================= */

  const list = document.createElement("div");
  list.className = "day-habits";

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;
      if (!plan.doneDates) plan.doneDates = {};

      const isDone = plan.doneDates[dateISO] === true;

      const row = document.createElement("div");
      row.className = "habit-row plan-row";

      const main = document.createElement("label");
      main.className = "habit-main";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isDone;
      checkbox.onchange = () => {
        plan.doneDates[dateISO] = checkbox.checked;
      };

      const name = document.createElement("span");
      name.className = "habit-name";
      name.textContent = habit.name;

      main.append(checkbox, name);
      row.appendChild(main);

      if (habit.action?.minimum) {
        const min = document.createElement("div");
        min.className = "habit-minimum";
        min.textContent = `min: ${habit.action.minimum.label}`;
        row.appendChild(min);
      }

      row.onclick = e => {
        if (e.target.tagName !== "INPUT") {
          import("./habitEdit.js").then(m =>
            m.renderHabitEdit(container, data, habit.id, () =>
              renderDay(container, data, dateISO, onBack, showBack)
            )
          );
        }
      };

      list.appendChild(row);
    });
  });

  container.appendChild(list);
}
