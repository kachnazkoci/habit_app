import { getDayStatus } from "./repeat.js";

let currentYear;
let currentMonth;

export function rendercalendar(container, data) {
  if (currentYear == null) {
    const now = new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
  }

  container.innerHTML = "";

  const monthNames = [
    "Leden","Únor","Březen","Duben","Květen","Červen",
    "Červenec","Srpen","Září","Říjen","Listopad","Prosinec"
  ];

  /* ===== HEADER ===== */

  const header = document.createElement("div");
  header.className = "calendar-header";

  const prev = document.createElement("button");
  prev.textContent = "◀";
  prev.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    rendercalendar(container, data);
  };

  const title = document.createElement("strong");
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const next = document.createElement("button");
  next.textContent = "▶";
  next.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    rendercalendar(container, data);
  };

  header.append(prev, title, next);
  container.appendChild(header);

  /* ===== WEEKDAYS ===== */

  const weekdays = document.createElement("div");
  weekdays.className = "calendar-weekdays";

  ["Po","Út","St","Čt","Pá","So","Ne"].forEach(d => {
    const el = document.createElement("div");
    el.textContent = d;
    weekdays.appendChild(el);
  });

  container.appendChild(weekdays);

  /* ===== GRID ===== */

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7; // Po = 0

  for (let i = 0; i < offset; i++) {
    grid.appendChild(document.createElement("div"));
  }

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(currentYear, currentMonth, day);
    const date =
      `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

    let status = null;

    Object.values(data.habits).forEach(habit =>
      habit.plans.forEach(plan => {
        const s = getDayStatus(plan, date);
        if (s === "done") status = "done";
        else if (s === "missed" && status !== "done") status = "missed";
        else if (s === "pending" && !status) status = "pending";
      })
    );

    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    if (status) cell.classList.add(`day-${status}`);

    cell.textContent = day;
    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
