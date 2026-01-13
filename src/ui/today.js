import { todayISO } from "../utils/date.js";
import { renderDay } from "./day.js";

export function rendertoday(container, data) {
  renderDay(container, data, todayISO(), null, false);
}
