const params = new URLSearchParams(window.location.search);
const token = params.get('token');

if (!token) {
  window.location.href = '/';
}

document.getElementById('unsubscribe-btn').addEventListener('click', async () => {
  const email = document.getElementById('unsubscribe-email').value.trim();
  const status = document.getElementById('unsubscribe-status');
  const btn = document.getElementById('unsubscribe-btn');

  if (!email) {
    status.textContent = 'Please enter your email address.';
    return;
  }

  status.textContent = 'Processing...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email })
    });

    const data = await res.json();

    if (!res.ok) {
      status.textContent = 'Invalid email or link. Please check and try again.';
      btn.disabled = false;
      return;
    }

    status.textContent = "You've been unsubscribed. Sorry to see you go!";

    sessionStorage.setItem('unsubscribed', 'true');
    window.location.href = '/unsubscribed.html';

  } catch (err) {
    console.error(err);
    status.textContent = 'Something went wrong. Please try again.';
    btn.disabled = false;
  }
});