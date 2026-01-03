import { loadData } from "./data.js";
import { getState, setScreen } from "./state.js";

import { rendertoday } from "./ui/today.js";
import { rendercalendar } from "./ui/calendar.js";
import { rendernewhabit } from "./ui/newhabit.js";
import { renderhabitdetail } from "./ui/habitdetail.js";
import { renderhabits } from "./ui/habits.js";
import { renderday } from "./ui/day.js";


const app = document.getElementById("app");
const data = loadData();

export function rerender() {
  app.innerHTML = `<div class="app-content"></div>`;
  const container = app.firstChild;

  const state = getState();

  if (state.screen === "day") {
    renderday(container, data, state.date, rerender);
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
    rendernewhabit(container, data, rerender);
    return;
  }

  if (state.screen === "habitdetail") {
    renderhabitdetail(container, data, state.habitid, rerender);
    return;
  }
}

/* ===== DESKTOP NAVBAR ===== */
document.querySelectorAll(".navbar button").forEach(button => {
  button.onclick = () => {
    setScreen(button.dataset.screen);
    rerender();
  };
});

/* ===== MOBILE MENU ===== */
/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // klik na položku menu
  mobileMenu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      setScreen(btn.dataset.screen);
      mobileMenu.classList.add("hidden");
      rerender();
    });
  });

  // klik mimo menu = zavřít
  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });

  // zabrání zavření při kliknutí dovnitř menu
  mobileMenu.addEventListener("click", e => e.stopPropagation());
}


setScreen("habits");
rerender();
