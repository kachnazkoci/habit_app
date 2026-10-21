export function renderWizardStep2(container, data, onNext, onBack) {
  container.innerHTML = `
  <div class="page-header habits-header">
    <h2>Návyky</h2>

    <div class="habit-header-actions">
      <button id="open-wizard" class="icon-btn">Pomocník</button>
      <button id="add-habit" class="icon-btn add-btn">+</button>
    </div>
  </div>

  ${hasUnassigned ? `
    <div class="wizard-callout">
      <strong>Máš návyky bez určení směru.</strong><br>
      Chceš si ujasnit, které ti pomáhají a které tě brzdí?
      <button id="start-wizard" class="wizard-btn">
        Spustit pomocníka
      </button>
    </div>
  ` : ""}

  <div id="list"></div>
`;

document.getElementById("add-habit").onclick = () => {
  setScreen("newhabit");
  rerender();
};

const wizardBtn = document.getElementById("open-wizard");
if (wizardBtn) {
  wizardBtn.onclick = () => {
    setScreen("wizard", 1);
    rerender();
  };
}

const startWizardBtn = document.getElementById("start-wizard");
if (startWizardBtn) {
  startWizardBtn.onclick = () => {
    setScreen("wizard", 1);
    rerender();
  };
}


  const list = container.querySelector("#wizard-list");

  Object.values(data.habits)
    .filter(h => h.polarity !== "-")
    .forEach(habit => {
      const row = document.createElement("div");
      row.className = "wizard-row";

      const value = habit.wizard?.intention || "";

      row.innerHTML = `
        <strong>${habit.name}</strong>
        <textarea placeholder="Kdy / kde / co přesně">
${value}</textarea>
      `;

      row.querySelector("textarea").oninput = e => {
        habit.wizard ??= {};
        habit.wizard.intention = e.target.value;
      };

      list.appendChild(row);
    });

  container.querySelector("#next").onclick = onNext;
  container.querySelector("#skip").onclick = onNext;
  container.querySelector("#back").onclick = onBack;
}
