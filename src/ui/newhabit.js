import { saveData } from "../data.js";
import { setScreen } from "../state.js";

export function rendernewhabit(container, data, rerender) {
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

      <div class="actions-row">
        <button id="create">Vytvořit</button>
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

    data.habits[id] = {
      id,
      name,
      place,
      plans: []
    };

    saveData(data);
    setScreen("habitdetail", id);
    rerender();
  };
}
