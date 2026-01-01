import { setScreen } from "../state.js";

export function renderhabits(container, data, rerender) {
  container.innerHTML = `
    <div class="page-header habits-header">
      <h2>
        Návyky
        &nbsp; <button id="add-habit" class="icon-btn add-btn" aria-label="Přidat návyk">+</button>
      </h2>
    </div>

    <div id="list"></div>
  `;

  const list = document.getElementById("list");

  Object.values(data.habits).forEach(habit => {
    const item = document.createElement("div");
    item.className = "item clickable habit-text";
    item.textContent = habit.name;

    item.onclick = () => {
      setScreen("habitdetail", habit.id);
      rerender();
    };

    list.appendChild(item);
  });

  document.getElementById("add-habit").onclick = () => {
    setScreen("newhabit");
    rerender();
  };
}
