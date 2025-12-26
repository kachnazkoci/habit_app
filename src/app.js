import { loadData } from "./data.js";
import { getState, setScreen } from "./state.js";

import { rendertoday } from "./ui/today.js";
import { rendercalendar } from "./ui/calendar.js";
import { rendernewhabit } from "./ui/newhabit.js";
import { renderhabitdetail } from "./ui/habitdetail.js";
import { renderhabits } from "./ui/habits.js";

const app = document.getElementById("app");
const data = loadData();

function rerender() {
  app.innerHTML = "";
  const state = getState();

  if (state.screen === "today") {
    rendertoday(app, data, rerender);
    return;
  }

  if (state.screen === "calendar") {
    rendercalendar(app, data, rerender);
    return;
  }

  if (state.screen === "habits") {
    renderhabits(app, data, rerender);
    return;
  }

  if (state.screen === "newhabit") {
    rendernewhabit(app, data, rerender);
    return;
  }

  if (state.screen === "habitdetail") {
    renderhabitdetail(app, data, state.habitid, rerender);
    return;
  }
}

document.querySelectorAll(".navbar button").forEach(button => {
  button.onclick = () => {
    setScreen(button.dataset.screen);
    rerender();
  };
});

setScreen("habits");
rerender();
