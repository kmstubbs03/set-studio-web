import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, body, clientEmail } = req.body;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("Missing Gmail credentials");
    return res.status(500).json({ message: 'Server missing email credentials.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sends email to herself as a notification
      replyTo: clientEmail || process.env.GMAIL_USER, // This allows her to just hit "Reply" to reply to the client
      subject: subject || 'New Booking Request - Set Studio',
      text: body,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Error sending email' });
  }
}
