import type { Handler } from '@netlify/functions';
import { sendContactMail, validateContact } from '../../lib/sendContactMail';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');

    // Honeypot: dieses Feld ist für Menschen unsichtbar. Ist es ausgefüllt -> Bot, still ok zurück.
    if (body.company) return { statusCode: 200, body: JSON.stringify({ ok: true }) };

    const data = validateContact(body);
    await sendContactMail(data);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'Unbekannter Fehler';
    const isValidation = raw.startsWith('INVALID:');
    return {
      statusCode: isValidation ? 400 : 500,
      body: JSON.stringify({ ok: false, error: raw.replace('INVALID: ', '') }),
    };
  }
};