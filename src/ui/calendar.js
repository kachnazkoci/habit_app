import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "../ui/repeat.js";
import { setScreen } from "../state.js";
import { rerender } from "../app.js";

let currentYear = null;
let currentMonth = null;

const MAX_VISIBLE_ITEMS = 3;

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

  /* ===== GRID ===== */

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(currentYear, currentMonth, day);
    const dateISO =
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

    const cell = document.createElement("div");
    cell.className = "calendar-cell clickable";

    /* --- header dne (číslo + tečka + x/y) --- */

    const dayHeader = document.createElement("div");
    dayHeader.className = "calendar-day-header";

    const dayNumber = document.createElement("span");
    dayNumber.className = "calendar-day";
    dayNumber.textContent = day;

    const indicator = document.createElement("span");
    indicator.className = "calendar-indicator";

    const progress = document.createElement("span");
    progress.className = "day-progress";

    dayHeader.append(dayNumber, indicator, progress);

    /* --- obsah dne --- */

    const content = document.createElement("div");
    content.className = "day-content";

    let shown = 0;
    let hidden = 0;

    Object.values(data.habits).forEach(habit => {
      habit.plans?.forEach(plan => {
        if (!planOccursOn(plan, dateISO)) return;

        if (shown < MAX_VISIBLE_ITEMS) {
          const item = document.createElement("div");
          item.className = "day-item";

          if (plan.doneDates?.[dateISO]) {
            item.classList.add("done");
            item.textContent = `✔ ${habit.name}`;
          } else {
            item.textContent = habit.name;
          }

          content.appendChild(item);
          shown++;
        } else {
          hidden++;
        }
      });
    });

    if (hidden > 0) {
      const more = document.createElement("div");
      more.className = "day-more";
      more.textContent = `+${hidden} další`;
      content.appendChild(more);
    }

    const dayInfo = getDayStatus(data, dateISO);

    if (dayInfo !== "empty") {
      cell.dataset.status = dayInfo.status;
      progress.textContent = `${dayInfo.done}/${dayInfo.total}`;
    }

    cell.append(dayHeader, content);

    cell.onclick = () => {
      setScreen("day", dateISO);
      rerender();
    };

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
