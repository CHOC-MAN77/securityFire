
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'ngaiporoathanase@gmail.com'; // IMPORTANT: Change this to your email address
const FROM_EMAIL = 'besi.dev'; // IMPORTANT: This must be a verified domain on Resend

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  const { name, email, company, rating, message, service } = request.body;

  if (!name || !email || !rating || !message || !service) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { error } = await resend.emails.send({
      from: `Testimonial Form <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `New Testimonial from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Rating:</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return response.status(500).json({ error: 'Error sending email' });
    }

    return response.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    return response.status(500).json({ error: errorMessage });
  }
}
