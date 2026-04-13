export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token, email } = req.body;

  if (!token || !email) return res.status(400).json({ error: 'Token and email required' });

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/contacts?token=eq.${token}&email=eq.${encodeURIComponent(email)}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation',
        'Content-Type': 'application/json'
      }
    }
  );

  const data = await response.json();

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'No matching subscriber found' });
  }

  return res.status(200).json({ success: true });
}