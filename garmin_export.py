"""Převod garmin_test.json do CSV pro Habit APP."""
import csv
import json
from pathlib import Path

DATA_DIR = Path("garmin_data")
SOURCE = DATA_DIR / "garmin_test.json"


def write_csv(filename, rows, columns):
    path = DATA_DIR / filename
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Vytvořeno: {path} ({len(rows)} záznamů)")


def main():
    if not SOURCE.exists():
        raise SystemExit(
            f"Soubor {SOURCE} nebyl nalezen. Nejdříve spusť garmin_test.py."
        )

    data = json.loads(SOURCE.read_text(encoding="utf-8"))

    daily_rows = []
    for day, values in data.get("daily", {}).items():
        summary = values.get("daily_summary") or {}
        sleep = values.get("sleep") or {}
        sleep_dto = sleep.get("dailySleepDTO") or {}
        sleep_seconds = sleep_dto.get("sleepTimeSeconds")
        daily_rows.append({
            "date": day,
            "steps": summary.get("totalSteps"),
            "active_calories": summary.get("activeKilocalories"),
            "total_calories": summary.get("totalKilocalories"),
            "sleep_seconds": sleep_seconds,
            "sleep_hours": round(sleep_seconds / 3600, 2)
                if isinstance(sleep_seconds, (int, float)) else None,
        })
    daily_rows.sort(key=lambda row: row["date"])
    write_csv("daily_summary.csv", daily_rows, [
        "date", "steps", "active_calories", "total_calories",
        "sleep_seconds", "sleep_hours",
    ])

    activity_rows = []
    for activity in data.get("activities", []):
        activity_type = activity.get("activityType")
        if isinstance(activity_type, dict):
            activity_type = activity_type.get("typeKey")
        activity_rows.append({
            "date": activity.get("startTimeLocal"),
            "name": activity.get("activityName"),
            "type": activity_type,
            "distance_meters": activity.get("distance"),
            "duration_seconds": activity.get("duration"),
            "calories": activity.get("calories"),
        })
    activity_rows.sort(key=lambda row: str(row["date"] or ""))
    write_csv("activities.csv", activity_rows, [
        "date", "name", "type", "distance_meters",
        "duration_seconds", "calories",
    ])

    sleep_rows = []
    for day, values in data.get("daily", {}).items():
        sleep = values.get("sleep") or {}
        dto = sleep.get("dailySleepDTO") or {}
        sleep_rows.append({
            "date": day,
            "sleep_seconds": dto.get("sleepTimeSeconds"),
            "deep_sleep_seconds": dto.get("deepSleepSeconds"),
            "light_sleep_seconds": dto.get("lightSleepSeconds"),
            "rem_sleep_seconds": dto.get("remSleepSeconds"),
            "awake_sleep_seconds": dto.get("awakeSleepSeconds"),
            "avg_overnight_hrv": sleep.get("avgOvernightHrv"),
            "resting_heart_rate": sleep.get("restingHeartRate"),
        })
    sleep_rows.sort(key=lambda row: row["date"])
    write_csv("sleep_details.csv", sleep_rows, [
        "date", "sleep_seconds", "deep_sleep_seconds",
        "light_sleep_seconds", "rem_sleep_seconds",
        "awake_sleep_seconds", "avg_overnight_hrv",
        "resting_heart_rate",
    ])
    print("Export dokončen.")


if __name__ == "__main__":
    main()
