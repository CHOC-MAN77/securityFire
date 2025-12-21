import type { VercelRequest, VercelResponse } from '@vercel/node';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL || '');

async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        message TEXT NOT NULL,
        service TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved BOOLEAN DEFAULT FALSE
      )
    `;
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  await initializeDatabase();

  if (req.method === 'GET') {
    try {
      const testimonials = await sql`
        SELECT id, name, company, rating, message, service, created_at
        FROM testimonials
        WHERE approved = TRUE
        ORDER BY created_at DESC
      `;
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('API GET error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, company, rating, message, service } = req.body;

      if (!name || !email || !message || !service || !rating) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await sql`
        INSERT INTO testimonials (name, email, company, rating, message, service)
        VALUES (${name}, ${email}, ${company || null}, ${rating}, ${message}, ${service})
        RETURNING id
      `;

      return res.status(200).json({
        success: true,
        id: result[0].id,
        message: 'Testimonial submitted successfully'
      });
    } catch (error) {
      console.error('API POST error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
