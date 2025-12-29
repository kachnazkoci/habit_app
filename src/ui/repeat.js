export function planOccursOn(plan, date) {
  if (plan.date === date) return true;
  if (plan.repeat === "none") return false;

  if (plan.until && date > plan.until) return false;

  if (plan.repeat === "daily") {
    return isEveryNthDay(plan.date, date, plan.interval);
  }

  if (plan.repeat === "weekly") {
    const day = new Date(date).getDay();
    if (!plan.weekdays?.includes(day)) return false;
    return isEveryNthWeek(plan.date, date, plan.interval);
  }

  if (plan.repeat === "monthly") {
    return occursMonthly(plan, date);
  }

  return false;
}

function isEveryNthDay(start, current, interval) {
  const diff = (new Date(current) - new Date(start)) / 86400000;
  return diff >= 0 && diff % interval === 0;
}

function isEveryNthWeek(start, current, interval) {
  const diff = (new Date(current) - new Date(start)) / (86400000 * 7);
  return diff >= 0 && diff % interval === 0;
}

function occursMonthly(plan, date) {
  const d = new Date(date);

  if (plan.monthlyType === "day") {
    return d.getDate() === plan.monthDay;
  }

  if (plan.monthlyType === "week") {
    const week = Math.ceil(d.getDate() / 7);
    return (
      (plan.weekIndex === "last"
        ? week === Math.ceil(new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() / 7)
        : week == plan.weekIndex) &&
      d.getDay() === plan.weekday
    );
  }

  return false;
}

export function getDayStatus(plan, date) {
  if (!planOccursOn(plan, date)) return null;

  if (plan.doneDates?.[date]) return "done";

  const today = new Date().toISOString().slice(0, 10);
  if (date < today) return "missed";

  return "pending";
}