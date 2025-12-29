import { saveData } from "../data.js";
import { setScreen } from "../state.js";

export function rendernewhabit(container, data, rerender) {
  container.innerHTML = `
    <h2>nový návyk</h2>

    <input id="name" placeholder="název">
    <input id="place" placeholder="místo">

    <button id="create">vytvořit</button>
  `;

  document.getElementById("create").onclick = () => {
    const name = document.getElementById("name").value.trim();
    const place = document.getElementById("place").value.trim();

    if (!name) {
      alert("vyplň název");
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
