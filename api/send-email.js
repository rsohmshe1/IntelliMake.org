const { Resend } = require('resend');

// IMPORTANT: You'''ll need to get an API key from Resend (resend.com)
// and configure it as a RESEND_API_KEY environment variable in your Vercel project.
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = request.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'IntelliMake Contact Form <onboarding@resend.dev>', // This will be the sender address
      to: ['rsohmshe@gmail.com'], // Corrected email address
      subject: `New message from ${name}`,
      html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return response.status(400).json({ error: error.message });
    }

    return response.status(200).json(data);
  } catch (e) {
    console.error('Error sending email:', e);
    return response.status(500).json({ error: 'Something went wrong while sending the email.' });
  }
};
