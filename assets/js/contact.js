const form = document.getElementById('cs-form-265');
const btn = form.querySelector('.cs-submit');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  if (form.querySelector('[name="_honey"]').value) return;

  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await response.json();

    if (json.success) {
      btn.textContent = 'Message Sent!';
      form.reset();
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch (err) {
    btn.textContent = 'Something went wrong — try again';
    btn.disabled = false;
  }
});