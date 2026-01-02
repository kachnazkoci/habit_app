export function planOccursOn(plan, dateISO) {
  const day = new Date(dateISO);
  const start = new Date(plan.date);

  // před začátkem
  if (day < start) return false;

  // po konci
  if (plan.until && dateISO > plan.until) return false;

  // ===== DENNĚ =====
  if (plan.repeat === "daily") {
    const diffDays =
      Math.floor((day - start) / (1000 * 60 * 60 * 24));
    return diffDays % (plan.interval || 1) === 0;
  }

  // ===== TÝDNĚ =====
  if (plan.repeat === "weekly") {
    if (!plan.weekdays || plan.weekdays.length === 0) return false;

    const weekday = day.getDay();
    if (!plan.weekdays.includes(weekday)) return false;

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

    if (plan.monthlyType === "day") {
      return day.getDate() === plan.monthDay;
    }

    if (plan.monthlyType === "week") {
      const first = new Date(day.getFullYear(), day.getMonth(), 1);
      const week =
        Math.ceil((day.getDate() + first.getDay()) / 7);

      const isLast =
        new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate() -
          day.getDate() < 7;

      return (
        (plan.weekIndex === "last" ? isLast : week === Number(plan.weekIndex))
        && day.getDay() === plan.weekday
      );
    }
  }

  return false;
}
