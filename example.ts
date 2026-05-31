import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

/**
 * Current moon phase: lunar phase name, illumination percentage, lunar age, zodiac sign, degree, distance.
 * Returns moon phase meaning (energy direction, keywords) for moon tracking apps and lunar calendars.
 * Part of the RoxyAPI Western astrology domain. All query params optional, defaults to today at noon UTC.
 */
async function main() {
  const { data, error } = await roxy.astrology.getCurrentMoonPhase();

  if (error) throw new Error(error.error);

  console.log('Date:', data.date);
  console.log('Phase:', data.phase);
  console.log('Illumination:', data.illumination, '%');
  console.log('Lunar age:', data.age, 'days');
  console.log('Sign:', data.sign);
  console.log('Degree:', data.degree);
  console.log('Distance:', data.distance, 'km');

  if (data.meaning) {
    console.log('');
    console.log('Symbol:', data.meaning.symbol);
    console.log('Energy:', data.meaning.energy);
    console.log('Keywords:', data.meaning.keywords.join(', '));
    console.log('Meaning:', data.meaning.description);
  }
}

main().catch(console.error);
