export function planOccursOn(plan, dateISO) {
  const day = new Date(dateISO);
  const start = new Date(plan.date);

  // ⛔ před začátkem plánu
  if (day < start) return false;

  // ⛔ po ukončení plánu
  if (plan.until && dateISO > plan.until) return false;

  // ===== DENNĚ =====
  if (plan.repeat === "daily") {
    const diff =
      Math.floor((day - start) / (1000 * 60 * 60 * 24));
    return diff % (plan.interval || 1) === 0;
  }

  // ===== TÝDNĚ =====
  if (plan.repeat === "weekly") {
    const weekday = day.getDay();
    if (!plan.weekdays?.includes(weekday)) return false;

    const diffWeeks =
      Math.floor((day - start) / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks % (plan.interval || 1) === 0;
  }

  // ===== MĚSÍČNĚ =====
  if (plan.repeat === "monthly") {
    const monthDiff =
      (day.getFullYear() - start.getFullYear()) * 12 +
      (day.getMonth() - start.getMonth());

    if (monthDiff % (plan.interval || 1) !== 0) return false;

    // stejný den v měsíci
    if (plan.monthlyType === "day") {
      return day.getDate() === plan.monthDay;
    }

    // stejný týden v měsíci
    if (plan.monthlyType === "week") {
      const first = new Date(day.getFullYear(), day.getMonth(), 1);
      const week =
        Math.ceil((day.getDate() + first.getDay()) / 7);

      return (
        String(plan.weekIndex) === "last"
          ? new Date(
              day.getFullYear(),
              day.getMonth() + 1,
              0
            ).getDate() - day.getDate() < 7
          : week === Number(plan.weekIndex)
      ) && day.getDay() === plan.weekday;
    }
  }

  return false;
}
