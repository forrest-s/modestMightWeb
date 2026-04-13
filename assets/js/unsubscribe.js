
const SUPABASE_URL = 'https://mjiazcjlucpzmirpogjz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FdhWAYSHleIuhGU8xAMbPQ_y27uXRYE';

const params = new URLSearchParams(window.location.search);
const token = params.get('token');

if (!token) {
  window.location.href = '/';
}

document.getElementById('unsubscribe-btn').addEventListener('click', async () => {
  const status = document.getElementById('unsubscribe-status');
  const btn = document.getElementById('unsubscribe-btn');

  status.textContent = 'Processing...';
  btn.disabled = true;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts?token=eq.${token}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation',
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!data || data.length === 0) {
      status.textContent = 'This link has already been used or is invalid.';
      return;
    }

    status.textContent = "You've been unsubscribed. Sorry to see you go!";

  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong. Please try again.';
    btn.disabled = false;
  }
});