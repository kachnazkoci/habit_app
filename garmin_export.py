"""Convert Garmin JSON to the three CSV files used by Habit APP."""
import csv, json
from pathlib import Path

DATA = Path("garmin_data")
SOURCE = DATA / "garmin_test.json"

def write_csv(name, rows, columns):
    path = DATA / name
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Created {path}: {len(rows)} rows")

def main():
    if not SOURCE.exists():
        raise SystemExit(f"Missing {SOURCE}; run garmin_test.py first.")
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    daily = []
    for day, values in data.get("daily", {}).items():
        summary = values.get("daily_summary") or {}
        sleep = values.get("sleep") or {}
        dto = sleep.get("dailySleepDTO") or {}
        secs = dto.get("sleepTimeSeconds")
        daily.append({"date":day, "steps":summary.get("totalSteps"),
          "active_calories":summary.get("activeKilocalories"),
          "total_calories":summary.get("totalKilocalories"), "sleep_seconds":secs,
          "sleep_hours":round(secs/3600,2) if isinstance(secs,(int,float)) else None})
    daily.sort(key=lambda r:r["date"])
    write_csv("daily_summary.csv", daily, ["date","steps","active_calories","total_calories","sleep_seconds","sleep_hours"])

    activities = []
    for a in data.get("activities", []):
        kind = a.get("activityType")
        if isinstance(kind, dict): kind = kind.get("typeKey")
        activities.append({"date":a.get("startTimeLocal"),"name":a.get("activityName"),
          "type":kind,"distance_meters":a.get("distance"),"duration_seconds":a.get("duration"),
          "calories":a.get("calories")})
    activities.sort(key=lambda r:str(r["date"] or ""))
    write_csv("activities.csv", activities, ["date","name","type","distance_meters","duration_seconds","calories"])

    sleeps = []
    for day, values in data.get("daily", {}).items():
        sleep = values.get("sleep") or {}; dto = sleep.get("dailySleepDTO") or {}
        sleeps.append({"date":day,"sleep_seconds":dto.get("sleepTimeSeconds"),
          "deep_sleep_seconds":dto.get("deepSleepSeconds"),"light_sleep_seconds":dto.get("lightSleepSeconds"),
          "rem_sleep_seconds":dto.get("remSleepSeconds"),"awake_sleep_seconds":dto.get("awakeSleepSeconds"),
          "avg_overnight_hrv":sleep.get("avgOvernightHrv"),"resting_heart_rate":sleep.get("restingHeartRate")})
    sleeps.sort(key=lambda r:r["date"])
    write_csv("sleep_details.csv", sleeps, ["date","sleep_seconds","deep_sleep_seconds","light_sleep_seconds",
      "rem_sleep_seconds","awake_sleep_seconds","avg_overnight_hrv","resting_heart_rate"])
    print("CSV export complete.")

if __name__ == "__main__":
    main()
