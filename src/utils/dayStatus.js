import { planOccursOn } from "../ui/repeat.js";

export function getDayStatus(data, dateISO) {
  let total = 0;
  let done = 0;

  Object.values(data.habits).forEach(habit => {
    habit.plans?.forEach(plan => {
      if (!planOccursOn(plan, dateISO)) return;

      total++;
      if (plan.doneDates?.[dateISO]) done++;
    });
  });

  let status = "empty";
  if (total > 0 && done === 0) status = "none";
  else if (done === total) status = "all";
  else if (done > 0) status = "partial";

  return {
    status,
    done,
    total
  };
}
