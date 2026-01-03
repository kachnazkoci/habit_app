let state = {
  screen: "habits",
  habitid: null,
  date: null
};

export function setScreen(screen, value = null) {
  state.screen = screen;
  state.habitid = null;
  state.date = null;

  if (screen === "habitdetail") {
    state.habitid = value;
  }

  if (screen === "day") {
    state.date = value;
  }
}

export function getState() {
  return state;
}
