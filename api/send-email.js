
import { Resend } from 'resend';

// IMPORTANT: You'''ll need to get an API key from Resend (resend.com)
// and configure it as a RESEND_API_KEY environment variable in your Vercel project.
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = request.body;

  try {
    const data = await resend.emails.send({
      from: 'IntelliMake Contact Form <onboarding@resend.dev>', // This will be the sender address
      to: ['rsohmshe1@gmail.com'], // Replace with the email address you want to receive messages at.
      subject: `New message from ${name}`,
      react: (
        <div>
          <p>You have a new message from <strong>{name}</strong> ({email}):</p>
          <p>{message}</p>
        </div>
      ),
    });

    return response.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ error: 'Something went wrong while sending the email.' });
  }
}
