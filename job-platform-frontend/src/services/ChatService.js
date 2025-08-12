let sessionId = null;

const API_URL = process.env.REACT_APP_API_URL;

export async function sendMessage(prompt) {
  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, session_id: sessionId })
    });

    const data = await res.json();
    if (data.session_id) {
      sessionId = data.session_id;
    }

    return data.response || data.error || '';
  } catch (err) {
    return 'שגיאת רשת';
  }
}

export function resetSession() {
  sessionId = null;
}
