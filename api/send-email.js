import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, subject, body } = req.body || {};

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Thiếu thông tin: to, subject, body' });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return res.status(400).json({ error: 'Địa chỉ email không hợp lệ' });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return res.status(500).json({ error: 'Hệ thống email chưa được cấu hình (GMAIL_USER / GMAIL_APP_PASSWORD)' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });

    const mailOptions = {
      from: `"Tourist Agent" <${user}>`,
      to: to,
      subject: subject,
      text: body
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, id: info.messageId });
  } catch (e) {
    return res.status(500).json({ error: 'Lỗi gửi email SMTP', detail: e.message });
  }
}
