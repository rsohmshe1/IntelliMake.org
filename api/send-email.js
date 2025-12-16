
const nodemailer = require('nodemailer');

export default function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = request.body;

  // IMPORTANT: You'''ll need to configure these environment variables in your Vercel project.
  const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net', // Replace with your email provider'''s SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address from a Vercel environment variable
      pass: process.env.EMAIL_PASSWORD, // Your email password from a Vercel environment variable
    },
  });

  const mailOptions = {
    from: '''"IntelliMake Contact Form" <noreply@intelliMake.org>''',
    to: 'your-receiving-email@example.com', // The email address you want to receive messages at.
    subject: `New message from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return response.status(500).json({ error: 'Something went wrong while sending the email.' });
    }
    console.log('Email sent:', info.response);
    return response.status(200).json({ message: 'Email sent successfully!' });
  });
}
