import { loadData } from "./data.js";
import { getState, setScreen } from "./state.js";

import { rendertoday } from "./ui/today.js";
import { rendercalendar } from "./ui/calendar.js";
import { rendernewhabit } from "./ui/newhabit.js";
import { renderhabitdetail } from "./ui/habitdetail.js";
import { renderhabits } from "./ui/habits.js";
import { renderDay } from "./ui/day.js";
import { renderHabitWizard } from "./ui/habitWizard.js";
import { renderKnowHow } from "./ui/knowhow.js";
import { renderHome } from "./ui/home.js?v=59-nav-strength";
import { renderFood } from "./ui/food.js";
import { renderDevices } from "./ui/devices.js";
import { renderShopping } from "./ui/shopping.js";


const app = document.getElementById("app");
const data = loadData();

export function rerender() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  app.dataset.screen = getState().screen;
  app.innerHTML = `<div class="app-content"></div>`;
  updateBottomNav();
  const container = app.firstChild;

  const state = getState();

  if (state.screen === "day") {
    renderDay(container, data, state.date, null, true, rerender);
    return;
  }

  if (state.screen === "home") {
    renderHome(container, rerender);
    return;
  }

  if (state.screen === "today") {
    rendertoday(container, data, rerender);
    return;
  }

  if (state.screen === "calendar") {
    rendercalendar(container, data, rerender);
    return;
  }

  if (state.screen === "habits") {
    renderhabits(container, data, rerender);
    return;
  }

  if (state.screen === "newhabit") {
    rendernewhabit(container, data, rerender, state.newHabitDate);
    return;
  }

  if (state.screen === "habitdetail") {
    renderhabitdetail(container, data, state.habitid, rerender);
    return;
  }

  if (state.screen === "wizard") {
    renderHabitWizard(container, data, rerender, { step: state.wizardStep || 1 });
    return;
  }

  if (state.screen === "knowhow") {
    renderKnowHow(container, rerender, state.knowhowTopic);
    return;
  }

  if (state.screen === "food") {
    renderFood(container, rerender);
    return;
  }

  if (state.screen === "devices") {
    renderDevices(container, rerender);
    return;
  }

  if (state.screen === "shopping") {
    renderShopping(container, data, rerender);
    return;
  }

  if (state.screen === "settings") {
    container.innerHTML = `<section class="card settings-home-placeholder"><h1>Nastavení</h1><p>Základní nastavení aplikace bude doplněno v další fázi. Jednotlivé části můžeš otevřít přímo z levého menu.</p><button type="button" class="primary-button" id="settings-back-home">Zpět na úvod</button></section>`;
    container.querySelector("#settings-back-home")?.addEventListener("click", () => { setScreen("home"); rerender(); });
    return;
  }
}

/* ===== SPODNÍ NAVIGACE ===== */
const bottomNav = document.querySelector(".bottom-nav");
const moreNav = document.getElementById("more-nav");
const morePanel = document.getElementById("more-panel");

function updateBottomNav() {
  if (!bottomNav) return;
  const current = getState().screen;
  bottomNav.querySelectorAll(".bottom-nav-item").forEach(button => {
    const active = button.dataset.screen === current || (button.id === "more-nav" && ["devices", "shopping"].includes(current));
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
}

bottomNav?.querySelectorAll(".bottom-nav-item[data-screen]").forEach(button => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.screen);
    closeMorePanel();
    rerender();
  });
});

function closeMorePanel() {
  if (!morePanel || !moreNav) return;
  morePanel.classList.add("hidden");
  morePanel.setAttribute("aria-hidden", "true");
  moreNav.setAttribute("aria-expanded", "false");
}

moreNav?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!morePanel) return;
  const hidden = morePanel.classList.toggle("hidden");
  morePanel.setAttribute("aria-hidden", hidden ? "true" : "false");
  moreNav.setAttribute("aria-expanded", hidden ? "false" : "true");
});

document.querySelectorAll(".more-panel-link").forEach(button => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.screen);
    closeMorePanel();
    rerender();
  });
});

document.addEventListener("click", (e) => {
  if (morePanel && !morePanel.classList.contains("hidden") && !morePanel.contains(e.target)) {
    closeMorePanel();
  }
});

setScreen("home");
rerender();
