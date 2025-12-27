import { setScreen } from "../state.js";

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0–11

export function rendercalendar(container, data, rerender) {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  container.innerHTML = `
    <div class="calendar-header">
      <button id="prevMonth">←</button>
      <h2>${monthName(currentMonth)} ${currentYear}</h2>
      <button id="nextMonth">→</button>
    </div>

    <div class="calendar-grid">
      ${weekHeader()}
      ${calendarCells(startOffset, daysInMonth, currentYear, currentMonth, data)}
    </div>
  `;

  document.getElementById("prevMonth").onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    rerender();
  };

  document.getElementById("nextMonth").onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    rerender();
  };

  container.querySelectorAll(".calendar-cell.clickable").forEach(cell => {
    cell.onclick = () => {
      setScreen("day", cell.dataset.date);
      rerender();
    };
  });
}

/* ===== helpers ===== */

function weekHeader() {
  return ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"]
    .map(d => `<div class="calendar-head">${d}</div>`)
    .join("");
}

function calendarCells(offset, daysInMonth, year, month, data) {
  let html = "";

  for (let i = 0; i < offset; i++) {
    html += `<div class="calendar-cell empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = toDateString(year, month, day);
    const dayPlans = plansForDate(data, dateStr);

    let statusClass = "";

   if (dayPlans.length > 0) {
  const allDone = dayPlans.every(p => p.done === true);
  statusClass = allDone ? "day-done" : "day-pending";
}


    html += `
      <div class="calendar-cell clickable ${statusClass}" data-date="${dateStr}">
        <div class="calendar-day">${day}</div>
    `;

    dayPlans.forEach(p => {
      html += `<div class="calendar-plan">• ${p.name}</div>`;
    });

    html += `</div>`;
  }

  return html;
}

function plansForDate(data, dateStr) {
  const result = [];

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (planOccursOn(plan, dateStr)) {
        const done = plan.doneDates?.[dateStr] === true;
        result.push({ name: habit.name, done });
      }
    });
  });

  return result;
}


function toDateString(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function monthName(m) {
  return [
    "leden", "únor", "březen", "duben", "květen", "červen",
    "červenec", "srpen", "září", "říjen", "listopad", "prosinec"
  ][m];
}

function planOccursOn(plan, date) {
  if (plan.date === date) return true;

  if (!plan.repeat) return false;

  if (plan.repeat === "daily") return true;

  if (plan.repeat === "weekly") {
    const day = new Date(date).getDay();
    return plan.weekdays?.includes(day);
  }

  return false;
}
