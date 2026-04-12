const SUPABASE_URL = 'https://mjiazcjlucpzmirpogjz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FdhWAYSHleIuhGU8xAMbPQ_y27uXRYE';

document.getElementById('cs-form-1388').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name-1388').value.trim();
  const email = document.getElementById('email-1388').value.trim();
  const username = document.getElementById('username-1388').value.trim();

  if (!name || !email || !username) return;

  if (!name || !email || !username) return;

  const token = crypto.randomUUID();

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ name, email, username, token })
    });

    if (!res.ok) throw new Error('Submission failed');

    await fetch('/api/send-welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, token })
    });

    e.target.reset();
    // Optional: show a success message here
  } catch (err) {
    console.error(err);
    // Optional: show an error message here
  }
});