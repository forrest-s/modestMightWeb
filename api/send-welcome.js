export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, token } = req.body;

  const unsubscribeLink = `https://modestmightweb.com/unsubscribe.html?token=${token}`;

  const response = await fetch('https://api.mailgun.net/v3/mail.modestmightweb.com/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('api:' + process.env.MAILGUN_API_KEY),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      from: 'Modest Might Web <hello@mail.modestmightweb.com>',
      to: email,
      subject: 'Welcome to Modest Might Web',
      text: `Hi ${name},\n\nThanks for subscribing!\n\nTo unsubscribe at any time, click here:\n${unsubscribeLink}`
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ error });
  }

  return res.status(200).json({ success: true });
}