let state = {
  screen: "home",
  habitid: null,
  date: null,
  wizardStep: 1,
  knowhowTopic: null,
  newHabitDate: null
};

export function setScreen(screen, value = null) {
  state.screen = screen;
  state.habitid = null;
  state.date = null;
  state.knowhowTopic = null;
  state.newHabitDate = null;

  if (screen === "habitdetail") {
    state.habitid = value;
  }

  if (screen === "day") {
    state.date = value;
  }

  if (screen === "wizard") {
    state.wizardStep = value || 1;
  }

  if (screen === "knowhow") {
    state.knowhowTopic = value || null;
  }

  if (screen === "newhabit" && value && typeof value === "object") {
    state.newHabitDate = value.date || null;
  }
}

export function getState() {
  return state;
}
