"""Download last 7 days of Garmin data to garmin_data/garmin_test.json."""
import json, sys
from datetime import date, timedelta
from pathlib import Path
from garminconnect import Garmin

OUT = Path("garmin_data")
TOKENS = OUT / "tokens"
TOKEN_FILE = TOKENS / "garmin_tokens.json"
OUT.mkdir(parents=True, exist_ok=True)
TOKENS.mkdir(parents=True, exist_ok=True)

def main():
    if not TOKEN_FILE.is_file():
        raise RuntimeError("Missing garmin_data/tokens/garmin_tokens.json")
    client = Garmin()
    client.login(tokenstore=str(TOKENS))
    today = date.today()
    start = today - timedelta(days=6)
    result = {"date_range":{"from":start.isoformat(),"to":today.isoformat()},
              "daily":{}, "activities":[]}
    for i in range(7):
        day = (start + timedelta(days=i)).isoformat()
        print(f"Loading daily data: {day}")
        values = {}
        for label, method in (("steps","get_steps_data"),("sleep","get_sleep_data"),
                              ("daily_summary","get_user_summary")):
            try:
                values[label] = getattr(client, method)(day)
            except Exception as exc:
                values[label] = {"error":type(exc).__name__}
                print(f"Warning: could not load {label} for {day}")
        result["daily"][day] = values
    result["activities"] = client.get_activities_by_date(start.isoformat(), today.isoformat())
    successes = sum(1 for d in result["daily"].values() for k in ("steps","sleep","daily_summary")
                    if isinstance(d.get(k), dict) and "error" not in d[k])
    if successes == 0 and not result["activities"]:
        raise RuntimeError("Garmin returned no usable daily data or activities")
    (OUT/"garmin_test.json").write_text(json.dumps(result, ensure_ascii=False, indent=2, default=str), encoding="utf-8")
    print("Garmin JSON export complete.")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"Garmin export failed: {type(exc).__name__}. Check token validity and login.", file=sys.stderr)
        sys.exit(1)
