import { setScreen } from "../state.js";

export function renderhabits(container, data, rerender) {
  container.innerHTML = `
    <h2>návyky</h2>
    <div id="list"></div>
    <button id="add">+ nový návyk</button>
  `;

  const list = document.getElementById("list");

  Object.values(data.habits).forEach(habit => {
    const item = document.createElement("div");
    item.className = "item";
    item.textContent = habit.name;

    item.onclick = () => {
      setScreen("habitdetail", habit.id);
      rerender();
    };

    list.appendChild(item);
  });

  document.getElementById("add").onclick = () => {
    setScreen("newhabit");
    rerender();
  };
}
