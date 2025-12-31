import { setScreen } from "../state.js";
import { saveData } from "../data.js";

let step = 1;
let habitDraft = {};
let mode = "create";
let editingId = null;

export function renderHabitWizard(
  container,
  data,
  rerender,
  options = { mode: "create", habitId: null }
) {
  mode = options.mode;
  editingId = options.habitId;

  if (mode === "edit" && editingId && !habitDraft.name) {
    const h = data.habits[editingId];
    habitDraft = {
      name: h.name,
      place: h.place,
      plans: JSON.parse(JSON.stringify(h.plans))
    };
  }

  container.innerHTML = `
    <div class="wizard">
      <div class="wizard-steps">Krok ${step} / 3</div>
      <div id="wizard-content"></div>
      <div class="wizard-nav">
        ${step > 1 ? `<button id="prev">Zpět</button>` : ""}
        <button id="next">
          ${step === 3
            ? mode === "edit" ? "Uložit změny" : "Vytvořit návyk"
            : "Další"}
        </button>
      </div>
    </div>
  `;

  const content = document.getElementById("wizard-content");

  /* ========== KROK 1 – ZÁKLAD ========== */

  if (step === 1) {
    content.innerHTML = `
      <h2>${mode === "edit" ? "Upravit návyk" : "Nový návyk"}</h2>

      <label>
        Název návyku
        <input id="name" value="${habitDraft.name || ""}">
      </label>

      <label>
        Místo (volitelné)
        <input id="place" value="${habitDraft.place || ""}">
      </label>
    `;
  }

  /* ========== KROK 2 – PLÁN ========== */

  if (step === 2) {
    const plan = habitDraft.plans?.[0] || {};

    content.innerHTML = `
      <h2>Plán návyku</h2>

      <label>
        Začíná od
        <input type="date" id="start-date" value="${plan.startDate || ""}">
      </label>

      <label>
        Opakování
        <select id="repeat">
          <option value="once">Jednorázově</option>
          <option value="daily">Denně</option>
          <option value="weekly">Týdně</option>
          <option value="monthly">Měsíčně</option>
        </select>
      </label>

      <div id="repeat-extra"></div>
    `;

    const repeatSelect = document.getElementById("repeat");
    const extra = document.getElementById("repeat-extra");

    repeatSelect.value = plan.repeat || "once";

    const renderExtra = () => {
      extra.innerHTML = "";

      if (repeatSelect.value === "weekly") {
        extra.innerHTML = `
          <p>Vyber dny</p>
          <div class="weekday-select">
            ${["Po","Út","St","Čt","Pá","So","Ne"].map((d, i) => `
              <label>
                <input type="checkbox" value="${i}"
                  ${plan.days?.includes(i) ? "checked" : ""}>
                ${d}
              </label>
            `).join("")}
          </div>
        `;
      }
    };

    renderExtra();
    repeatSelect.onchange = renderExtra;
  }

  /* ========== KROK 3 – SHRNUTÍ ========== */

  if (step === 3) {
    content.innerHTML = `
      <h2>${mode === "edit" ? "Uložit změny" : "Hotovo 🎉"}</h2>

      <div class="wizard-summary">
        <strong>${habitDraft.name}</strong><br>
        ${habitDraft.place || ""}
      </div>
    `;
  }

  /* ========== NAV ========== */

  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  if (prev) {
    prev.onclick = () => {
      step--;
      renderHabitWizard(container, data, rerender, options);
    };
  }

  next.onclick = () => {
    /* SAVE STEP 1 */
    if (step === 1) {
      const name = document.getElementById("name").value.trim();
      if (!name) {
        alert("Zadej název návyku");
        return;
      }
      habitDraft.name = name;
      habitDraft.place = document.getElementById("place").value.trim();
    }

    /* SAVE STEP 2 */
    if (step === 2) {
      const startDate = document.getElementById("start-date").value;
      const repeat = document.getElementById("repeat").value;

      if (!startDate) {
        alert("Vyber datum");
        return;
      }

      const plan = {
        startDate,
        repeat,
        doneDates: habitDraft.plans?.[0]?.doneDates || {}
      };

      if (repeat === "weekly") {
        plan.days = [...document.querySelectorAll(".weekday-select input:checked")]
          .map(cb => Number(cb.value));
      }

      habitDraft.plans = [plan];
    }

    /* FINISH */
    if (step === 3) {
      if (mode === "edit") {
        data.habits[editingId] = {
          ...data.habits[editingId],
          name: habitDraft.name,
          place: habitDraft.place,
          plans: habitDraft.plans
        };
      } else {
        const id = crypto.randomUUID();
        data.habits[id] = {
          id,
          name: habitDraft.name,
          place: habitDraft.place,
          plans: habitDraft.plans
        };
      }

      saveData(data);
      step = 1;
      habitDraft = {};
      setScreen("habits");
      rerender();
      return;
    }

    step++;
    renderHabitWizard(container, data, rerender, options);
  };
}
