"""
Garmin Connect export pro GitHub Actions i lokální spuštění.

Očekává:
- platné Garmin Connect tokeny v garmin_data/tokens/
- balíček garminconnect
- bez interaktivního MFA při automatickém běhu

Bezpečnost:
- nikdy nevypisuje hesla ani obsah tokenů
- při fatální chybě končí nenulovým návratovým kódem
"""
import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path

from garminconnect import Garmin

OUTPUT_DIR = Path("garmin_data")
TOKEN_DIR = OUTPUT_DIR / "tokens"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TOKEN_DIR.mkdir(parents=True, exist_ok=True)

EMAIL = os.getenv("GARMIN_EMAIL", "").strip()
PASSWORD = os.getenv("GARMIN_PASSWORD", "")
TOKENSTORE = str(TOKEN_DIR)


def main():
    # V automatizaci nepoužívat getpass ani interaktivní MFA.
    # Při lokálním spuštění lze použít stejné uložené tokeny jako dosud.
    if not any(TOKEN_DIR.iterdir()):
        raise RuntimeError(
            "Ve složce garmin_data/tokens nejsou žádné Garmin tokeny. "
            "Nejdříve je bezpečně obnov nebo nahraj do pracovního prostředí."
        )

    client = Garmin()
    client.login(tokenstore=TOKENSTORE)
    print("Přihlášení ke Garmin Connect proběhlo úspěšně.")

    today = date.today()
    start = today - timedelta(days=6)
    results = {
        "date_range": {"from": start.isoformat(), "to": today.isoformat()},
        "daily": {},
        "activities": [],
    }

    # Chyba jednotlivého dne se zaznamená, ale chyba autentizace / celého
    # stahování musí skončit chybou, aby ji GitHub Actions zachytil.
    for offset in range(7):
        day_str = (start + timedelta(days=offset)).isoformat()
        print(f"Načítám denní data: {day_str}")
        daily = {}
        for label, method in (
            ("steps", "get_steps_data"),
            ("sleep", "get_sleep_data"),
            ("daily_summary", "get_user_summary"),
        ):
            try:
                daily[label] = getattr(client, method)(day_str)
            except Exception as exc:
                daily[label] = {"error": type(exc).__name__}
                print(f"Upozornění: {label} pro {day_str} se nepodařilo načíst.")

        results["daily"][day_str] = daily

    results["activities"] = client.get_activities_by_date(
        start.isoformat(), today.isoformat()
    )

    output_file = OUTPUT_DIR / "garmin_test.json"
    output_file.write_text(
        json.dumps(results, ensure_ascii=False, indent=2, default=str),
        encoding="utf-8",
    )
    print(f"JSON uložen: {output_file}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"CHYBA Garmin exportu: {type(exc).__name__}: {exc}", file=sys.stderr)
        sys.exit(1)
