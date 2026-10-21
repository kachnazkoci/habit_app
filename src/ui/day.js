import { formatDateHuman, parseLocalDate, todayISO } from "../utils/date.js";
import { planOccursOn } from "./repeat.js";
import { saveData } from "../data.js";
import { setScreen } from "../state.js";

export function renderDay(
  container,
  data,
  dateISO,
  onBack = null,
  showBack = true,
  rerender = null
) {
  container.innerHTML = "";

  const date = parseLocalDate(dateISO);

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
    renderDay(container, data, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`, onBack, showBack, rerender);
  };

  const title = document.createElement("h2");
  title.textContent = formatDateHuman(date);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "▶";
  nextBtn.onclick = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    renderDay(container, data, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`, onBack, showBack, rerender);
  };

  header.append(prevBtn, title, nextBtn);
  container.appendChild(header);

  /* ================= DAY FEEDBACK ================= */

  const feedback = document.createElement("div");
  feedback.className = "day-feedback";

  function isToday() {
    return dateISO === todayISO();
  }

  function getDayProgress() {
    const plansForDay = [];

    Object.values(data.habits).forEach(habit => {
      habit.plans?.forEach(plan => {
        if (planOccursOn(plan, dateISO)) plansForDay.push(plan);
      });
    });

    const done = plansForDay.filter(plan => plan.doneDates?.[dateISO] === true).length;
    return { total: plansForDay.length, done };
  }

  function updateDayFeedback() {
    const { total, done } = getDayProgress();

    if (total === 0) {
      feedback.className = "day-feedback hidden";
      feedback.innerHTML = "";
      return;
    }

    const complete = done === total;
    const partial = done > 0 && done < total;
    const phase = complete ? 3 : partial ? 2 : 1;
    const today = isToday();

    const messages = today
      ? [
          "Dnes tě čeká příležitost, jak pozvednout své já.",
          "Ještě nám zbývají nějaké plány pro dnešní den.",
          "Dnes jsi splnil maximum, které sis na dnešek naplánoval."
        ]
      : [
          "V tento den bude možné pozvednout své já.",
          "V tento den ti ještě zbývají nějaké plány.",
          "V tento den jsi splnil maximum, které sis naplánoval."
        ];

    const labels = ["Příležitost", "Pokračuješ", "Maximum"];
    const angle = total > 0 ? (done * 360) / total : 0;

    feedback.className = `day-feedback day-feedback--phase-${phase}`;
    feedback.innerHTML = `
      <div class="day-feedback-visual" aria-hidden="true">
        <div class="day-feedback-switch">
          <span class="day-feedback-mark day-feedback-mark--1">1</span>
          <span class="day-feedback-mark day-feedback-mark--2">2</span>
          <span class="day-feedback-mark day-feedback-mark--3">3</span>
          <div class="day-feedback-leaf" style="--leaf-angle:${angle}deg">
            <span></span>
          </div>
        </div>
        <div class="day-feedback-label">${labels[phase - 1]}</div>
      </div>
      <div class="day-feedback-copy">
        <strong>${messages[phase - 1]}</strong>
        <span>${done} z ${total} plánů hotovo</span>
      </div>`;
  }

  container.appendChild(feedback);
  updateDayFeedback();

  const addPlan = document.createElement("button");
  addPlan.type = "button";
  addPlan.className = "day-add-oneoff";
  addPlan.textContent = `＋ Přidat jednorázový úkol na ${formatDateHuman(date)}`;
  addPlan.onclick = () => {
    setScreen("newhabit", { date: dateISO });
    if (rerender) rerender();
  };
  container.appendChild(addPlan);

  /* ================= HABITS ================= */

  const list = document.createElement("div");
  list.className = "day-habits";

  Object.values(data.habits).forEach(habit => {
    habit.plans.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;
      if (!plan.doneDates) plan.doneDates = {};

      const isDone = plan.doneDates[dateISO] === true;

      const row = document.createElement("div");
      //row.className = "habit-row plan-row";
      row.className = "item plan-row clickable";

      const main = document.createElement("label");
      main.className = "habit-main";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isDone;
      checkbox.onclick = e => e.stopPropagation();
      checkbox.onchange = () => {
        plan.doneDates[dateISO] = checkbox.checked;
        saveData(data);
        updateDayFeedback();
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
          setScreen("habitdetail", habit.id);
          if (rerender) rerender();
        }
      };

      list.appendChild(row);
    });
  });

  container.appendChild(list);

  // Připravené místo pro data z propojených zařízení.
  // Zobrazí se pouze uživateli, který má zařízení skutečně připojené.
  if (localStorage.getItem("garmin-connected") === "true") {
    const deviceCard = document.createElement("section");
    deviceCard.className = "day-device-summary";
    deviceCard.innerHTML = `
      <div class="day-device-header"><span>⌚</span><div><strong>Dnešní data ze zařízení</strong><small>Garmin Connect</small></div></div>
      <div class="day-device-grid">
        <div><span>👟 Kroky</span><b data-garmin-steps>—</b></div>
        <div><span>❤️ Tep</span><b data-garmin-hr>—</b></div>
        <div><span>🌙 Spánek</span><b data-garmin-sleep>—</b></div>
        <div><span>🔋 Body Battery</span><b data-garmin-body>—</b></div>
      </div>`;
    container.appendChild(deviceCard);
    try {
      const summary = JSON.parse(localStorage.getItem("garmin-summary") || "null");
      if (summary) {
        deviceCard.querySelector("[data-garmin-steps]").textContent = summary.steps ?? "—";
        deviceCard.querySelector("[data-garmin-hr]").textContent = summary.heartRate ?? "—";
        deviceCard.querySelector("[data-garmin-sleep]").textContent = summary.sleep ?? "—";
        deviceCard.querySelector("[data-garmin-body]").textContent = summary.bodyBattery ?? "—";
      }
    } catch (_) {}
    try {
      const activities = JSON.parse(localStorage.getItem("garmin-activities") || "[]");
      if (Array.isArray(activities) && activities.length) {
        const activityCard = document.createElement("section");
        activityCard.className = "day-device-activities";
        activityCard.innerHTML = `<div class="day-device-header"><span>🏃</span><div><strong>Poslední aktivity</strong><small>Z propojeného zařízení</small></div></div><div class="day-device-activity-list">${activities.slice(0,4).map(a => `<div><b>${a.name || "Aktivita"}</b><span>${a.date || ""}</span><span>${a.distance ? a.distance + " km" : ""}</span><span>${a.duration || ""}</span></div>`).join("")}</div>`;
        container.appendChild(activityCard);
      }
    } catch (_) {}
  }
}
