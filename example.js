import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

/**
 * Current moon phase: returns lunar phase name, illumination, age, zodiac sign, degree, distance.
 * Pass an optional date and timezone for a specific lunar calendar day. Defaults to today at noon UTC.
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

  if (data.meaning) {
    console.log('Keywords:', data.meaning.keywords.join(', '));
  }
}

main().catch(console.error);
