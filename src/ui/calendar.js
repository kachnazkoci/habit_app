import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "../ui/repeat.js";

let currentYear = null;
let currentMonth = null;

export function rendercalendar(container, data) {
  if (currentYear === null) {
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

  const headerWrap = document.createElement("div");
  headerWrap.className = "calendar-header-wrap";

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
  headerWrap.appendChild(header);
  container.appendChild(headerWrap);

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
  const offset = (firstDay + 6) % 7;

  for (let i = 0; i < offset; i++) {
    grid.appendChild(document.createElement("div"));
  }

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(currentYear, currentMonth, day);
    const dateISO =
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;


    const cell = document.createElement("div");
    cell.className = "calendar-cell clickable";

    const number = document.createElement("div");
    number.className = "calendar-day";
    number.textContent = day;
    cell.appendChild(number);

    const info = getDayStatus(data, dateISO);
    if (info) {
      cell.classList.add(`day-${info.status}`);

      const progress = document.createElement("div");
      progress.className = `day-progress ${info.status}`;
      progress.textContent = `${info.done}/${info.total}`;
      cell.appendChild(progress);
    }

    Object.values(data.habits).forEach(habit => {
      habit.plans.forEach(plan => {
        if (!planOccursOn(plan, dateISO)) return;

        const p = document.createElement("div");
        p.className = "calendar-plan";

        const done = plan.doneDates?.[dateISO];
        p.textContent = `${done ? "✔" : "◦"} ${habit.name}`;
        if (done) p.classList.add("plan-done");

        cell.appendChild(p);
      });
    });

    cell.onclick = () => {
      import("./day.js").then(m =>
        m.renderday(container, data, dateISO, () =>
          rendercalendar(container, data)
        )
      );
    };

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
