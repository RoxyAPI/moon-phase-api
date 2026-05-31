# AGENTS.md for Moon Phase API

This repo teaches AI coding agents (Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, Gemini CLI) how to use the RoxyAPI moon phase endpoint.

## Endpoint
- Method: `GET`
- URL: `https://roxyapi.com/api/v2/astrology/moon-phase/current`
- Auth: `X-API-Key` header
- Domain: `astrology` (one of 12 in the RoxyAPI catalog)
- Operation ID: `getCurrentMoonPhase` matches the SDK method name in camelCase
- MCP tool: `get_astrology_moon_phase_current` on `https://roxyapi.com/mcp/astrology`

## TypeScript SDK
```ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
const { data, error } = await roxy.astrology.getCurrentMoonPhase({
  query: { date: '2026-05-31', timezone: 5.5 },
});
```

## Python SDK
```python
import os
from roxy_sdk import create_roxy
roxy = create_roxy(os.environ["ROXY_API_KEY"])
result = roxy.astrology.get_current_moon_phase(date="2026-05-31", timezone=5.5)
```

## Setup step (only when the endpoint requires coordinates)
Always call `GET /location/search?q={city}` first. Take `latitude`, `longitude`, `timezone` from `cities[0]` and pipe them in. Never ask the user to type coordinates.

Note: the moon phase endpoint does NOT require coordinates. Moon phase is global, not observer-specific. Call it with no arguments for today, or pass `date`, `time`, and `timezone` for a specific lunar calendar day.

## Request fields
- `date` (query, optional): YYYY-MM-DD. Defaults to today.
- `time` (query, optional): 24-hour HH:MM:SS. Defaults to 12:00:00 (noon). Moon moves ~13 degrees per day so time affects phase precision.
- `timezone` (query, optional): decimal hours (e.g. 5.5 for IST, -5 for EST) OR an IANA name (e.g. "Asia/Kolkata"). IANA is resolved to the DST-correct offset for the given date. Defaults to 0 (UTC).
- `lang` (query, optional): interpretation language. Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en.

## Response top level keys
- `date`: date of this moon phase calculation (YYYY-MM-DD)
- `phase`: current lunar phase name. One of New Moon, Waxing Crescent Moon, First Quarter Moon, Waxing Gibbous Moon, Full Moon, Waning Gibbous Moon, Last Quarter Moon, Waning Crescent Moon
- `illumination`: moon illumination percentage 0-100 (number)
- `age`: lunar age in days since the last New Moon (number)
- `sign`: tropical zodiac sign the Moon currently occupies
- `degree`: degree of the Moon within its current zodiac sign 0-29.999 (number)
- `distance`: distance from Earth to the Moon in kilometers (number)
- `meaning`: optional object with phase meaning. Keys: `name`, `symbol`, `description`, `keywords` (array), `energy` (waxing, waning, new, or full), `illumination` (range description string)

## Domain rules
- Moon phase is global. The same date returns the same phase worldwide. `timezone` only shifts which civil day the calculation anchors to, not an observer location.
- `time` matters for precision. The Moon moves ~13 degrees per day, so a phase near a transition can change name across a single day. Default is noon.
- `illumination` is the lit fraction as a percent. 0 at New Moon, 100 at Full Moon. `energy` in `meaning` summarizes direction: waxing builds, waning releases.
- Positions come from Roxy Ephemeris, verified against NASA JPL Horizons.
- For upcoming transition dates use `GET /astrology/moon-phase/upcoming`. For a full month grid use `GET /astrology/moon-phase/calendar/{year}/{month}`.

## Related endpoints
- `GET /astrology/moon-phase/upcoming` (`getUpcomingMoonPhases`): next New Moon, First Quarter, Full Moon, and Last Quarter transition dates for lunar event calendars
- `GET /astrology/moon-phase/calendar/{year}/{month}` (`getMoonCalendar`): complete lunar calendar with phase and illumination for every day of a month
- `GET /astrology/horoscope/{sign}/daily` (`getDailyHoroscope`): daily transit forecast by zodiac sign with Moon sign, Moon phase, and energy rating

## Verified
2026-Q2 against `https://roxyapi.com/api/v2/openapi.json`. Re-fetch the spec for ground truth before changing this file.

## Discovery
- Full catalog: https://roxyapi.com/AGENTS.md
- LLM index: https://roxyapi.com/llms.txt
- Methodology: https://roxyapi.com/methodology
