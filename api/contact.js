export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, 'find-us': findUs, message, _honey } = req.body;

  // Honeypot check
  if (_honey) return res.status(200).end();

  const response = await fetch('https://api.mailgun.net/v3/mail.modestmightweb.com/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('api:' + process.env.MAILGUN_API_KEY),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      from: 'Modest Might Web <hello@mail.modestmightweb.com>',
      to: 'forrest@modestmightweb.com',
      subject: `New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `How they found you: ${findUs || 'Not specified'}`,
        `\nmessage:\n${message}`
      ].join('\n')
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ error });
  }

  return res.status(200).json({ success: true });
}