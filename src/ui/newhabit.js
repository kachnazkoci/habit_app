import { saveData } from "../data.js";
import { setScreen, getState } from "../state.js";

export function rendernewhabit(container, data, rerender, presetDate = null) {
  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">Nový návyk</h2>

      <div class="form-block">
        <label for="name">Název</label>
        <input id="name" placeholder="např. Cvičení">
      </div>

      <div class="form-block">
        <label for="place">Místo</label>
        <input id="place" placeholder="např. Doma">
      </div>

      ${presetDate ? `
      <div class="form-block">
        <label>Jednorázový plán na datum</label>
        <input id="plan-date" type="date" value="${presetDate}">
        <small class="form-hint">Tento plán se zobrazí pouze v tomto konkrétním dni a nebude se opakovat.</small>
      </div>` : ""}

      <div class="actions-row">
        <button id="create">${presetDate ? "Vytvořit plán" : "Vytvořit"}</button>
      </div>
    </section>
  `;

  document.getElementById("create").onclick = () => {
    const name = document.getElementById("name").value.trim();
    const place = document.getElementById("place").value.trim();

    if (!name) {
      alert("Vyplň název");
      return;
    }

    const id = crypto.randomUUID();

    const oneOffDate = presetDate || document.getElementById("plan-date")?.value || null;

    data.habits[id] = {
      id,
      name,
      place,
      plans: oneOffDate ? [{
        id: crypto.randomUUID(),
        date: oneOffDate,
        repeat: "none",
        interval: 1,
        until: null,
        doneDates: {}
      }] : []
    };

    saveData(data);
    setScreen("habitdetail", id);
    rerender();
  };
}
