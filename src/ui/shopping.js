import { saveData } from "../data.js";

let activeListId = null;
let undoItem = null;

function ensureShopping(data) {
  data.shoppingLists ??= [];
  return data.shoppingLists;
}

export function renderShopping(container, data, rerender) {
  const lists = ensureShopping(data);
  if (!activeListId || !lists.some(l => l.id === activeListId)) {
    activeListId = lists[0]?.id || null;
  }

  container.innerHTML = `
    <section class="shopping-center">
      <header class="shopping-header">
        <div>
          <span class="habits-section-kicker">🌿 SEZNAMY</span>
          <h1>Seznamy</h1>
          <p>Vytvoř si vlastní seznamy a postupně je doplňuj. Jakmile něco máš, odškrtni to — položka zmizí, ale můžeš ji hned vrátit zpět.</p>
        </div>
        <button type="button" class="habits-primary-action" id="new-shopping-list">＋ Nový seznam</button>
      </header>

      <div class="shopping-layout">
        <aside class="shopping-list-sidebar">
          <div class="shopping-sidebar-title">Moje seznamy</div>
          <div id="shopping-list-names"></div>
          ${lists.length ? "" : `<div class="shopping-empty-small">Zatím nemáš žádný seznam.</div>`}
        </aside>
        <main class="shopping-main" id="shopping-main"></main>
      </div>
    </section>
  `;

  const names = container.querySelector("#shopping-list-names");
  lists.forEach(list => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = `shopping-list-nav ${list.id === activeListId ? "active" : ""}`;
    row.innerHTML = `<span>☷</span><strong>${escapeHtml(list.name)}</strong><small>${list.items?.length || 0}</small>`;
    row.onclick = () => { activeListId = list.id; rerender(); };
    names.appendChild(row);
  });

  container.querySelector("#new-shopping-list").onclick = () => {
    const name = window.prompt("Název nového seznamu", "Můj seznam");
    if (!name?.trim()) return;
    const list = { id: `shopping-${Date.now()}`, name: name.trim(), items: [] };
    lists.push(list);
    activeListId = list.id;
    saveData(data);
    rerender();
  };

  const main = container.querySelector("#shopping-main");
  const current = lists.find(l => l.id === activeListId);
  if (!current) {
    main.innerHTML = `<div class="shopping-empty"><div class="shopping-empty-icon">🛒</div><h2>Začni vlastním seznamem</h2><p>Pojmenuj si ho třeba „Týdenní nákup“, „Na víkend“ nebo „Grilování“.</p><button type="button" class="habits-primary-action" id="empty-new-list">＋ Vytvořit seznam</button></div>`;
    main.querySelector("#empty-new-list").onclick = () => container.querySelector("#new-shopping-list").click();
    return;
  }

  current.items ??= [];
  main.innerHTML = `
    <div class="shopping-main-header">
      <div>
        <span class="habits-section-kicker">AKTUÁLNÍ SEZNAM</span>
        <h2>${escapeHtml(current.name)}</h2>
      </div>
      <div class="shopping-header-actions">
        <button type="button" class="secondary-action" id="rename-list">Přejmenovat</button>
        <button type="button" class="secondary-action danger" id="delete-list">Smazat seznam</button>
      </div>
    </div>

    <form class="shopping-add-form" id="shopping-add-form">
      <input id="shopping-item-input" type="text" maxlength="120" placeholder="Přidat položku…" autocomplete="off">
      <button type="submit">＋ Přidat</button>
    </form>

    <div class="shopping-undo ${undoItem ? "visible" : "hidden"}" id="shopping-undo">
      <span>„${escapeHtml(undoItem?.text || "")}“ bylo odebráno.</span>
      <button type="button" id="undo-shopping-item">↶ Zpět</button>
    </div>

    <div class="shopping-items" id="shopping-items"></div>
    ${current.items.length ? "" : `<div class="shopping-empty-items"><span>🌱</span><strong>Seznam je zatím prázdný.</strong><small>Přidej první položku výše.</small></div>`}
  `;

  const items = main.querySelector("#shopping-items");
  current.items.forEach(item => {
    const row = document.createElement("label");
    row.className = "shopping-item";
    row.innerHTML = `
      <input type="checkbox" aria-label="Hotovo: ${escapeHtml(item.text)}">
      <span>${escapeHtml(item.text)}</span>
      <button type="button" class="shopping-edit" aria-label="Upravit položku">✎</button>
    `;
    const checkbox = row.querySelector("input");
    checkbox.onchange = () => {
      if (!checkbox.checked) return;
      undoItem = { listId: current.id, item: { ...item }, index: current.items.findIndex(x => x.id === item.id) };
      current.items = current.items.filter(x => x.id !== item.id);
      saveData(data);
      rerender();
    };
    row.querySelector(".shopping-edit").onclick = e => {
      e.preventDefault();
      const next = window.prompt("Upravit položku", item.text);
      if (!next?.trim()) return;
      item.text = next.trim();
      saveData(data);
      rerender();
    };
    items.appendChild(row);
  });

  main.querySelector("#shopping-add-form").onsubmit = e => {
    e.preventDefault();
    const input = main.querySelector("#shopping-item-input");
    const text = input.value.trim();
    if (!text) return;
    current.items.push({ id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`, text });
    undoItem = null;
    saveData(data);
    rerender();
  };

  main.querySelector("#rename-list").onclick = () => {
    const next = window.prompt("Název seznamu", current.name);
    if (!next?.trim()) return;
    current.name = next.trim();
    saveData(data);
    rerender();
  };

  main.querySelector("#delete-list").onclick = () => {
    if (!window.confirm(`Opravdu smazat seznam „${current.name}“?`)) return;
    const index = lists.findIndex(l => l.id === current.id);
    lists.splice(index, 1);
    activeListId = lists[Math.max(0, index - 1)]?.id || lists[0]?.id || null;
    undoItem = null;
    saveData(data);
    rerender();
  };

  main.querySelector("#undo-shopping-item")?.addEventListener("click", () => {
    if (!undoItem) return;
    const target = lists.find(l => l.id === undoItem.listId);
    if (!target) { undoItem = null; rerender(); return; }
    target.items ??= [];
    target.items.splice(Math.min(undoItem.index, target.items.length), 0, undoItem.item);
    activeListId = target.id;
    undoItem = null;
    saveData(data);
    rerender();
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}
