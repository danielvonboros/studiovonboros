import nodemailer from 'nodemailer';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

// Validierung – wirft bei ungültigen Eingaben (wird oben als 400 behandelt).
export function validateContact(data: Partial<ContactPayload>): ContactPayload {
  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const message = (data.message ?? '').trim();

  if (!name || !email || !message) throw new Error('INVALID: Bitte alle Felder ausfüllen.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('INVALID: Ungültige E-Mail-Adresse.');
  if (message.length > 5000) throw new Error('INVALID: Nachricht zu lang.');

  return { name, email, message };
}

export async function sendContactMail(data: ContactPayload): Promise<void> {
  const port = Number(process.env.SMTP_PORT ?? 465);

  const transporter = nodemailer.createTransport({
    host: requireEnv('SMTP_HOST'),
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS -> automatisch abgeleitet
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
  });

  const from = requireEnv('SMTP_USER');
  const to = process.env.CONTACT_TO ?? from;

  await transporter.sendMail({
    from: `"Studio von Boros – Kontaktformular" <${from}>`, // muss deine eigene Adresse sein
    to,
    replyTo: `"${data.name}" <${data.email}>`, // so kannst du direkt "Antworten" drücken
    subject: `Neue Kontaktanfrage von ${data.name}`,
    text: `Name: ${data.name}\nE-Mail: ${data.email}\n\n${data.message}`,
  });
}