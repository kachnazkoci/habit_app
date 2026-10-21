export function renderWizardStep1(container, data, onNext) {
  container.innerHTML = `
    <div class="wizard">
      <h2>1️⃣ Skórkarta návyků</h2>
      <p class="wizard-hint">
        Jen si všímej. Nic neměň.
      </p>

      <div id="wizard-list"></div>

      <div class="wizard-actions">
        <button class="primary" id="next">Pokračovat</button>
        <button class="ghost" id="skip">Přeskočit</button>
      </div>
    </div>
  `;

  const list = container.querySelector("#wizard-list");

  Object.values(data.habits).forEach(habit => {
    const row = document.createElement("div");
    row.className = "wizard-row";

    row.innerHTML = `
      <strong>${habit.name}</strong>
      <textarea
        placeholder="Kdy se obvykle objevuje? Co mu předchází?"
      >${habit.wizard?.awareness || ""}</textarea>
    `;

    row.querySelector("textarea").oninput = e => {
      habit.wizard ??= {};
      habit.wizard.awareness = e.target.value;
    };

    list.appendChild(row);
  });

  container.querySelector("#next").onclick = onNext;
  container.querySelector("#skip").onclick = onNext;
}
