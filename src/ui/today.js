import { todayISO } from "../utils/date.js";
import { renderDay } from "./day.js";

export function rendertoday(container, data, rerender) {
  // Stejný detail dne jako v Kalendáři, včetně možnosti vytvořit jednorázový úkol.
  renderDay(container, data, todayISO(), null, false, rerender);
}
