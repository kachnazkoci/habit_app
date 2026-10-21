import { setScreen } from "../state.js";
import { saveData } from "../data.js";

/*
 * Asistent / průvodce návyky.
 *
 * Nejde o další formulář pro založení plánu. První kroky mají uživatele
 * nejprve přivést k pozorování vlastních návyků, potom k jejich rozřazení
 * a teprve nakonec k úvaze o směru, kterým se chce vydat.
 */

export function renderHabitWizard(container, data, rerender, options = {}) {
  let step = Number(options.step || 1);

  const render = () => {
    container.innerHTML = `
      <section class="card wizard-card">
        <div class="wizard-topline">
          <span>Asistent</span>
          <span>Krok ${step} / 3</span>
        </div>

        <div id="wizard-content"></div>

        <div class="wizard-nav">
          ${step > 1 ? `<button id="wizard-back">Zpět</button>` : `<span></span>`}
          <div class="wizard-nav-right">
            <button id="wizard-exit">Zavřít</button>
            <button id="wizard-next" class="wizard-btn">${step === 3 ? "Dokončit" : "Pokračovat"}</button>
          </div>
        </div>
      </section>
    `;

    const content = container.querySelector("#wizard-content");

    if (step === 1) renderStep1(content);
    if (step === 2) renderStep2(content);
    if (step === 3) renderStep3(content);

    container.querySelector("#wizard-exit").onclick = () => {
      saveData(data);
      setScreen("habits");
      rerender();
    };

    const back = container.querySelector("#wizard-back");
    if (back) {
      back.onclick = () => {
        step--;
        render();
      };
    }

    container.querySelector("#wizard-next").onclick = () => {
      saveData(data);
      if (step < 3) {
        step++;
        render();
      } else {
        setScreen("habits");
        rerender();
      }
    };
  };

  function renderStep1(content) {
    content.innerHTML = `
      <h2>Nejdřív se podívejme, co už je součástí tvého života.</h2>
      <p class="wizard-intro">
        Asistent tě nebude zkoušet ani nutit do vyplňování. Jen se bude ptát a pomůže ti
        všimnout si toho, co už děláš automaticky. Z toho pak můžeme stavět nové návyky.
      </p>

      <div class="wizard-assistant-question">
        <strong>Co už děláš pravidelně, téměř bez přemýšlení?</strong>
        <span>Například vstaneš z postele, uvaříš kávu, zapneš počítač nebo si večer vyčistíš zuby.</span>
      </div>

      <div class="wizard-list" id="current-habits"></div>

      <div class="wizard-add-row">
        <input id="wizard-new-habit" placeholder="Např. ráno si dělám kávu">
        <button id="wizard-add-habit" class="icon-btn" aria-label="Přidat návyk">+</button>
      </div>

      <div class="wizard-assistant-question wizard-assistant-optional">
        <strong>Chceš něco změnit už teď?</strong>
        <span>Nemusíš odpovídat. Pokud ano, můžeš si to zatím jen poznamenat.</span>
        <textarea id="wizard-change-note" placeholder="Např. chtěl/a bych večer méně používat telefon…"></textarea>
      </div>
    `;

    const list = content.querySelector("#current-habits");

    Object.values(data.habits).forEach(habit => {
      const row = document.createElement("div");
      row.className = "wizard-list-row";
      row.innerHTML = `
        <span>${escapeHtml(habit.name)}</span>
        <button class="wizard-delete" title="Odstranit ze seznamu">🗑</button>
      `;

      row.querySelector(".wizard-delete").onclick = () => {
        delete data.habits[habit.id];
        saveData(data);
        renderStep1(content);
      };

      list.appendChild(row);
    });

    const changeNote = content.querySelector("#wizard-change-note");
    const firstHabit = Object.values(data.habits)[0];
    changeNote.value = firstHabit?.wizard?.changeNote || "";
    changeNote.oninput = () => {
      Object.values(data.habits).forEach(h => {
        h.wizard ??= {};
        h.wizard.changeNote = changeNote.value;
      });
      saveData(data);
    };

    content.querySelector("#wizard-add-habit").onclick = () => {
      const input = content.querySelector("#wizard-new-habit");
      const name = input.value.trim();
      if (!name) return;

      const id = crypto.randomUUID();
      data.habits[id] = {
        id,
        name,
        place: "",
        polarity: null,
        reviewDate: null,
        wizard: {},
        plans: []
      };

      input.value = "";
      saveData(data);
      renderStep1(content);
    };
  }

  function renderStep2(content) {
    content.innerHTML = `
      <h2>Jak se na své návyky díváš?</h2>
      <p class="wizard-intro">
        Teď nemusíš nic opravovat. Jen si vyber, co chceš podporovat, co ti neslouží
        a co je zatím neutrální. Výběr můžeš kdykoli změnit.
      </p>

      <div class="wizard-assistant-question">
        <strong>Malá otázka pro každý návyk:</strong>
        <span>Pomáhá mi tento návyk být člověkem, kterým chci být, nebo mě od toho vzdaluje?</span>
      </div>

      <div class="wizard-polarity-list" id="polarity-list"></div>
    `;

    const list = content.querySelector("#polarity-list");

    Object.values(data.habits).forEach(habit => {
      const row = document.createElement("div");
      row.className = "wizard-polarity-row";

      const selected = habit.polarity;
      const buttons = selected
        ? polarityButton(selected === "-" ? "−" : selected, selected === "+" ? "positive" : selected === "N" ? "neutral" : "negative", true)
        : `
          ${polarityButton("+", "positive", false)}
          ${polarityButton("N", "neutral", false)}
          ${polarityButton("−", "negative", false)}
        `;

      row.innerHTML = `
        <div class="wizard-habit-left">
          <span class="wizard-habit-name">${escapeHtml(habit.name)}</span>
        </div>
        <div class="wizard-polarity-actions">${buttons}</div>
      `;

      row.querySelectorAll(".polarity-btn").forEach(btn => {
        btn.onclick = e => {
          e.stopPropagation();
          const value = btn.dataset.polarity;
          habit.polarity = habit.polarity === value ? null : value;
          saveData(data);
          renderStep2(content);
        };
      });

      list.appendChild(row);
    });
  }

  function renderStep3(content) {
    const today = new Date().toISOString().slice(0, 10);
    const habits = Object.values(data.habits);
    const firstHabit = habits[0];

    content.innerHTML = `
      <h2>Kam se chceš posunout?</h2>
      <p class="wizard-intro">
        Nejde jen o nové činnosti. Přemýšlej také o člověku, kterým se chceš stát,
        a o malých činnostech, které ti k tomu mohou pomoci.
      </p>

      <div class="wizard-identity card-inner">
        <label for="wizard-identity">Chci být člověkem, který…</label>
        <textarea id="wizard-identity" placeholder="Např. pečuje o své tělo, čte, má klidnější rána…"></textarea>
      </div>

      <h3>Možné další kroky</h3>
      <div class="wizard-list" id="future-list"></div>
      <div class="wizard-add-row">
        <input id="wizard-new-intention" placeholder="Např. přečíst dvě stránky knihy denně">
        <button id="wizard-add-intention" class="icon-btn" aria-label="Přidat záměr">+</button>
      </div>

      <div class="wizard-assistant-question wizard-assistant-optional">
        <strong>Nemusíš mít všechno vymyšlené.</strong>
        <span>Pokud chceš, můžeme nový návyk společně zmenšit na první dvouminutový krok a najít mu vhodné místo v tvém dni.</span>
      </div>

      <div class="wizard-coaching-grid">
        <div class="wizard-coaching-card">
          <strong>Jak malý může být začátek?</strong>
          <p>Co by šlo udělat za dvě minuty nebo méně?</p>
          <textarea id="wizard-two-minute" placeholder="Např. otevřu knihu a přečtu jednu stránku…"></textarea>
        </div>
        <div class="wizard-coaching-card">
          <strong>Co můžeš připravit předem?</strong>
          <p>Co v prostředí odstraní překážku nebo usnadní začátek?</p>
          <textarea id="wizard-environment" placeholder="Např. večer položím knihu na polštář…"></textarea>
        </div>
        <div class="wizard-coaching-card">
          <strong>Co tě může potěšit hned?</strong>
          <p>Jaká malá okamžitá odměna ti připomene, že se vyplatí pokračovat?</p>
          <textarea id="wizard-reward" placeholder="Např. odškrtnu dnešek v kalendáři…"></textarea>
        </div>
      </div>

      <div class="wizard-implementation">
        <h3>Kdy a kde?</h3>
        <p class="wizard-intro">
          Když víš, <strong>co</strong> chceš dělat, pomáhá také určit předem
          <strong>kdy a kde</strong> se nový návyk odehraje. Nemusíš to vyplnit hned.
        </p>
        <div id="implementation-list"></div>
      </div>
    `;

    const identity = content.querySelector("#wizard-identity");
    identity.value = firstHabit?.wizard?.identity || "";
    identity.oninput = () => {
      Object.values(data.habits).forEach(h => {
        h.wizard ??= {};
        h.wizard.identity = identity.value;
      });
      saveData(data);
    };

    const coachingFields = [
      ["#wizard-two-minute", "twoMinute"],
      ["#wizard-environment", "environment"],
      ["#wizard-reward", "reward"]
    ];

    coachingFields.forEach(([selector, key]) => {
      const field = content.querySelector(selector);
      field.value = firstHabit?.wizard?.[key] || "";
      field.oninput = () => {
        Object.values(data.habits).forEach(h => {
          h.wizard ??= {};
          h.wizard[key] = field.value;
        });
        saveData(data);
      };
    });

    const list = content.querySelector("#future-list");
    const intentions = firstHabit?.wizard?.intentions || [];

    intentions.forEach((intention, index) => {
      const row = document.createElement("div");
      row.className = "wizard-list-row wizard-intention-row";
      row.innerHTML = `
        <input class="wizard-intention-text" value="${escapeAttr(intention.text || "")}">
        <input class="wizard-review-date" type="date" value="${intention.reviewDate || ""}" title="Datum dalšího ohlédnutí">
        <button class="wizard-delete" title="Odstranit">🗑</button>
      `;

      row.querySelector(".wizard-intention-text").oninput = e => {
        updateIntention(data, index, "text", e.target.value);
      };
      row.querySelector(".wizard-review-date").onchange = e => {
        updateIntention(data, index, "reviewDate", e.target.value || null);
      };
      row.querySelector(".wizard-delete").onclick = () => {
        Object.values(data.habits).forEach(h => {
          h.wizard ??= {};
          h.wizard.intentions ??= [];
          h.wizard.intentions.splice(index, 1);
        });
        saveData(data);
        renderStep3(content);
      };

      list.appendChild(row);
    });

    content.querySelector("#wizard-add-intention").onclick = () => {
      const input = content.querySelector("#wizard-new-intention");
      const text = input.value.trim();
      if (!text) return;

      Object.values(data.habits).forEach(h => {
        h.wizard ??= {};
        h.wizard.intentions ??= [];
        h.wizard.intentions.push({ text, reviewDate: null });
      });

      input.value = "";
      saveData(data);
      renderStep3(content);
    };

    /* ===== IMPLEMENTAČNÍ ZÁMĚR: KDY + KDE ===== */
    const implementationList = content.querySelector("#implementation-list");

    habits
      .filter(habit => habit.polarity === "+")
      .forEach(habit => {
        habit.wizard ??= {};
        habit.wizard.implementation ??= {
          startDate: today,
          weekdays: [],
          place: habit.place || ""
        };

        const impl = habit.wizard.implementation;
        const row = document.createElement("div");
        row.className = "wizard-implementation-row";
        row.innerHTML = `
          <strong>${escapeHtml(habit.name)}</strong>

          <label>
            Kde?
            <input class="implementation-place" value="${escapeAttr(habit.place || impl.place || "")}" placeholder="Např. doma, v kuchyni, v parku">
          </label>

          <label>
            Od kdy?
            <input class="implementation-start" type="date" value="${impl.startDate || today}">
          </label>

          <div class="implementation-days">
            <span>Které dny?</span>
            <div class="implementation-day-buttons">
              ${[[1,"Po"],[2,"Út"],[3,"St"],[4,"Čt"],[5,"Pá"],[6,"So"],[0,"Ne"]]
                .map(([value,label]) => `
                  <label>
                    <input class="implementation-day" type="checkbox" value="${value}" ${impl.weekdays?.includes(value) ? "checked" : ""}>
                    <span>${label}</span>
                  </label>
                `).join("")}
            </div>
          </div>
        `;

        const placeInput = row.querySelector(".implementation-place");
        placeInput.oninput = e => {
          habit.place = e.target.value;
          impl.place = e.target.value;
          saveData(data);
        };

        row.querySelector(".implementation-start").onchange = e => {
          impl.startDate = e.target.value || today;
          saveData(data);
        };

        row.querySelectorAll(".implementation-day").forEach(cb => {
          cb.onchange = () => {
            impl.weekdays = [...row.querySelectorAll(".implementation-day:checked")]
              .map(input => Number(input.value));
            saveData(data);
          };
        });

        implementationList.appendChild(row);
      });

    if (!implementationList.children.length) {
      implementationList.innerHTML = `
        <p class="wizard-empty-note">
          Nejprve v předchozím kroku označ některý návyk jako <strong>+</strong>.
          Potom mu zde můžeš určit místo a konkrétní dny.
        </p>
      `;
    }
  }

  render();
}

function updateIntention(data, index, key, value) {
  Object.values(data.habits).forEach(h => {
    h.wizard ??= {};
    h.wizard.intentions ??= [];
    if (h.wizard.intentions[index]) h.wizard.intentions[index][key] = value;
  });
  saveData(data);
}

function polarityButton(label, type, selected) {
  return `<button class="polarity-btn ${type} ${selected ? "selected" : ""}" data-polarity="${label}">${label}</button>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
