"""
Current moon phase: lunar phase name, illumination percentage, lunar age, zodiac sign, degree, distance.
Returns moon phase meaning (energy direction, keywords) for moon tracking apps and lunar calendars.
Part of the RoxyAPI Western astrology domain. All query params optional, defaults to today at noon UTC.
"""

import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])


def main():
    # Current moon phase driven by lunar position. Pass date= and timezone= for a specific day.
    moon = roxy.astrology.get_current_moon_phase()

    print("Date:", moon["date"])
    print("Phase:", moon["phase"])
    print("Illumination:", moon["illumination"], "%")
    print("Lunar age:", moon["age"], "days")
    print("Sign:", moon["sign"])
    print("Degree:", moon["degree"])
    print("Distance:", moon["distance"], "km")

    meaning = moon.get("meaning")
    if meaning:
        print()
        print("Symbol:", meaning["symbol"])
        print("Energy:", meaning["energy"])
        print("Keywords:", ", ".join(meaning["keywords"]))
        print("Meaning:", meaning["description"])


if __name__ == "__main__":
    main()
