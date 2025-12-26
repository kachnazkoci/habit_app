import { saveData } from "../data.js";

const WEEKDAYS = [
  { label: "Po", value: 1 },
  { label: "Út", value: 2 },
  { label: "St", value: 3 },
  { label: "Čt", value: 4 },
  { label: "Pá", value: 5 },
  { label: "So", value: 6 },
  { label: "Ne", value: 0 }
];

export function renderhabitdetail(container, data, habitid, rerender) {
  const habit = data.habits[habitid];
  if (!habit) {
    container.innerHTML = "nenalezen";
    return;
  }

  container.innerHTML = `
    <h2 contenteditable="true" id="name">${habit.name}</h2>
    <p contenteditable="true" id="place">${habit.place}</p>

    <h3>plány</h3>
    <div id="plans"></div>

    <h4>přidat plán</h4>
    <input id="date" type="date">
    <input id="time" type="time">

    <select id="repeat">
      <option value="once">jednorázově</option>
      <option value="daily">každý den</option>
      <option value="weekdays">vybrané dny v týdnu</option>
      <option value="weekly">týdně</option>
      <option value="monthly">měsíčně</option>
    </select>

    <div id="weekdayPicker" style="display:none;margin:8px 0;">
      ${WEEKDAYS.map(
        d => `<label style="margin-right:6px">
          <input type="checkbox" value="${d.value}"> ${d.label}
        </label>`
      ).join("")}
    </div>

    <div id="repeatEnd" style="display:none;margin-top:8px;">
      <label>
        <input type="checkbox" id="endOfYear" checked>
        do konce roku 2026
      </label>
      <br>
      nebo do data:
      <input type="date" id="endDate">
    </div>

    <button id="add">přidat plán</button>
  `;

  /* ===== editace názvu a místa ===== */
  const nameEl = document.getElementById("name");
  const placeEl = document.getElementById("place");

  nameEl.onblur = () => {
    habit.name = nameEl.textContent.trim();
    saveData(data);
    rerender();
  };

  placeEl.onblur = () => {
    habit.place = placeEl.textContent.trim();
    saveData(data);
  };

  /* ===== zobrazení plánů ===== */
  const plansEl = document.getElementById("plans");
  habit.plans
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach(p => {
      const d = document.createElement("div");
      d.className = "item";
      d.textContent = `${p.date} ${p.time}`;
      plansEl.appendChild(d);
    });

  /* ===== UI logika ===== */
  const repeatSelect = document.getElementById("repeat");
  const repeatEndBox = document.getElementById("repeatEnd");
  const weekdayPicker = document.getElementById("weekdayPicker");

  repeatSelect.onchange = () => {
    repeatEndBox.style.display =
      repeatSelect.value === "once" ? "none" : "block";

    weekdayPicker.style.display =
      repeatSelect.value === "weekdays" ? "block" : "none";
  };

  /* ===== přidání plánu ===== */
  document.getElementById("add").onclick = () => {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const repeat = repeatSelect.value;

    if (!date || !time) {
      alert("datum a čas jsou povinné");
      return;
    }

    let endDate;
    const customEnd = document.getElementById("endDate").value;

    if (customEnd) {
      endDate = new Date(customEnd);
    } else {
      endDate = new Date(2026, 11, 31);
    }

    if (repeat === "once") {
      habit.plans.push({ id: crypto.randomUUID(), date, time });
    }

    if (repeat === "daily") {
      generateByStep(habit, date, time, endDate, 1);
    }

    if (repeat === "weekly") {
      generateByStep(habit, date, time, endDate, 7);
    }

    if (repeat === "monthly") {
      generateMonthly(habit, date, time, endDate);
    }

    if (repeat === "weekdays") {
      const selected = [...weekdayPicker.querySelectorAll("input:checked")]
        .map(i => Number(i.value));

      if (!selected.length) {
        alert("vyber alespoň jeden den v týdnu");
        return;
      }

      generateByWeekdays(habit, date, time, endDate, selected);
    }

    saveData(data);
    rerender();
  };
}

/* ===== generátory ===== */

function generateByStep(habit, startDate, time, endDate, stepDays) {
  let d = parseDate(startDate);

  while (d <= endDate) {
    habit.plans.push({
      id: crypto.randomUUID(),
      date: d.toISOString().slice(0, 10),
      time
    });
    d.setDate(d.getDate() + stepDays);
  }
}

function generateMonthly(habit, startDate, time, endDate) {
  let d = parseDate(startDate);

  while (d <= endDate) {
    habit.plans.push({
      id: crypto.randomUUID(),
      date: d.toISOString().slice(0, 10),
      time
    });
    d.setMonth(d.getMonth() + 1);
  }
}

function generateByWeekdays(habit, startDate, time, endDate, weekdays) {
  let d = parseDate(startDate);

  while (d <= endDate) {
    if (weekdays.includes(d.getDay())) {
      habit.plans.push({
        id: crypto.randomUUID(),
        date: d.toISOString().slice(0, 10),
        time
      });
    }
    d.setDate(d.getDate() + 1);
  }
}

function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}
