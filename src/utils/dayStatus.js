import { planOccursOn } from "../ui/repeat.js";

export function getDayStatus(data, dateISO) {
  const todayISO = new Date().toISOString().slice(0, 10);

  let total = 0;
  let done = 0;

  Object.values(data.habits).forEach(habit => {
    habit.plans?.forEach(plan => {

      if (plan.repeat === "none") {
        if (plan.date !== dateISO) return;
      } else {
        if (!planOccursOn(plan, dateISO)) return;
      }

      total++;
      if (plan.doneDates?.[dateISO]) done++;
    });
  });

  if (total === 0) return null;

  let status;
  if (done === total) status = "done";
  else if (done > 0) status = "pending";
  else if (dateISO < todayISO) status = "missed";
  else status = "pending";

  return { status, done, total };
}
