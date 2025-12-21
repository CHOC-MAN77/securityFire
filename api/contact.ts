
import type { VercelRequest, VercelResponse } from '@vercel/node';
import postgres from 'postgres';
import { Resend } from 'resend';

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL || '');
const resend = new Resend(process.env.RESEND_API_KEY);

async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        company TEXT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        request_type TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await initializeDatabase();

  if (req.method === 'POST') {
    try {
      const { firstName, lastName, company, email, phone, requestType, message } = req.body;

      // Insert data into the database
      await sql`
        INSERT INTO quotes (first_name, last_name, company, email, phone, request_type, message)
        VALUES (${firstName}, ${lastName}, ${company}, ${email}, ${phone}, ${requestType}, ${message})
      `;

      // Send email notification
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'besi.services.incendie@gmail.com',
        subject: `Nouvelle demande de devis de ${firstName} ${lastName}`,
        html: `
          <h1>Nouvelle demande de devis</h1>
          <p><strong>Prénom:</strong> ${firstName}</p>
          <p><strong>Nom:</strong> ${lastName}</p>
          <p><strong>Société:</strong> ${company || 'Non spécifiée'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Type de demande:</strong> ${requestType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      res.status(200).json({ message: 'Quote request submitted successfully' });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ message: 'Error submitting quote request' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
