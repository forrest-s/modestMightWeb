export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email required' });

  // Look up the token from Supabase using service role key
  const supabaseRes = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/contacts?email=eq.${encodeURIComponent(email)}&select=token`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    }
  );

  const data = await supabaseRes.json();

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Email not found' });
  }

  const token = data[0].token;
  const unsubscribeLink = `https://modestmightweb.com/unsubscribe?token=${token}&email=${encodeURIComponent(email)}`;

  // Send email via Mailgun
  const mailgunRes = await fetch('https://api.mailgun.net/v3/mail.modestmightweb.com/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('api:' + process.env.MAILGUN_API_KEY),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      from: 'Modest Might Web <hello@mail.modestmightweb.com>',
      to: email,
      subject: 'Unsubscribe from Modest Might Web',
      text: `Click the link below to unsubscribe:\n\n${unsubscribeLink}\n\nIf you did not request this, ignore this email.`
    })
  });

  if (!mailgunRes.ok) {
    const error = await mailgunRes.text();
    return res.status(500).json({ error });
  }

  return res.status(200).json({ success: true });
}