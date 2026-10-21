export function renderWizardStep3(container, data, onFinish, onBack) {
  container.innerHTML = `
    <div class="wizard">
      <h2>3️⃣ Práce se zlozvyky</h2>

      <div id="wizard-list"></div>

      <div class="wizard-actions">
        <button class="ghost" id="back">Zpět</button>
        <button class="primary" id="finish">Dokončit</button>
      </div>
    </div>
  `;

  const list = container.querySelector("#wizard-list");

  Object.values(data.habits)
    .filter(h => h.polarity === "-")
    .forEach(habit => {
      const row = document.createElement("div");
      row.className = "wizard-row";

      row.innerHTML = `
        <strong>${habit.name}</strong>

        <textarea placeholder="Proč s tím chci přestat?">
${habit.wizard?.frictionNotes || ""}</textarea>

        <label>
          Datum dalšího ohlédnutí:
          <input type="date" value="${habit.wizard?.reviewDate || ""}">
        </label>
      `;

      row.querySelector("textarea").oninput = e => {
        habit.wizard ??= {};
        habit.wizard.frictionNotes = e.target.value;
      };

      row.querySelector("input").onchange = e => {
        habit.wizard ??= {};
        habit.wizard.reviewDate = e.target.value;
      };

      list.appendChild(row);
    });

  container.querySelector("#finish").onclick = onFinish;
  container.querySelector("#back").onclick = onBack;
}
