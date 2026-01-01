import { getDayStatus } from "../utils/dayStatus.js";
import { planOccursOn } from "../ui/repeat.js";

let currentYear = null;
let currentMonth = null;
let touchStartX = null;
let touchStartY = null;
const SWIPE_THRESHOLD = 50;

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

  /* ================= HEADER ================= */

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

  /* ================= WEEKDAYS ================= */

  const weekdays = document.createElement("div");
  weekdays.className = "calendar-weekdays";

  ["Po","Út","St","Čt","Pá","So","Ne"].forEach(d => {
    const el = document.createElement("div");
    el.textContent = d;
    weekdays.appendChild(el);
  });

  container.appendChild(weekdays);

  /* ================= GRID ================= */

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  /* ================= SWIPE NAVIGATION ================= */

grid.addEventListener("touchstart", e => {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });

grid.addEventListener("touchend", e => {
  if (touchStartX === null || touchStartY === null) return;

  const t = e.changedTouches[0];
  const diffX = t.clientX - touchStartX;
  const diffY = t.clientY - touchStartY;

  // ignorujeme vertikalni scroll
  if (Math.abs(diffY) > Math.abs(diffX)) {
    touchStartX = null;
    touchStartY = null;
    return;
  }

  if (Math.abs(diffX) > SWIPE_THRESHOLD) {
    if (diffX < 0) {
      // swipe doleva → dalsi mesic
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    } else {
      // swipe doprava → predchozi mesic
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    }

    rendercalendar(container, data);
  }

  touchStartX = null;
  touchStartY = null;
}, { passive: true });


  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  for (let i = 0; i < offset; i++) {
    grid.appendChild(document.createElement("div"));
  }

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {

    const d = new Date(currentYear, currentMonth, day);
    const dateISO =
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

    const cell = document.createElement("div");
    cell.className = "calendar-cell clickable";

    const number = document.createElement("div");
    number.className = "calendar-day";
    number.textContent = day;
    cell.appendChild(number);

    const content = document.createElement("div");
    content.className = "day-content";
    cell.appendChild(content);

    /* ===== DAY STATUS ===== */

    const info = getDayStatus(data, dateISO);
    if (info) {
      cell.classList.add(`day-${info.status}`);

      const progress = document.createElement("div");
      progress.className = "day-progress";
      progress.textContent = `${info.done}/${info.total}`;
      cell.appendChild(progress);
    }

    /* ===== HABITS IN CELL ===== */

    let visibleCount = 0;
    let hiddenCount = 0;

    Object.values(data.habits).forEach(habit => {
      habit.plans.forEach(plan => {
        if (!planOccursOn(plan, dateISO)) return;

        const done = plan.doneDates?.[dateISO] === true;

        if (visibleCount < MAX_VISIBLE_ITEMS) {
          const item = document.createElement("div");
          item.className = "day-item";

          if (done) {
            item.classList.add("done");
            item.textContent = `✔ ${habit.name}`;
          } else {
            item.textContent = `• ${habit.name}`;
          }

          content.appendChild(item);
          visibleCount++;
        } else {
          hiddenCount++;
        }
      });
    });

    if (hiddenCount > 0) {
      const more = document.createElement("div");
      more.className = "day-more";
      more.textContent = `+${hiddenCount} další`;
      content.appendChild(more);
    }

    /* ===== CLICK ===== */

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
