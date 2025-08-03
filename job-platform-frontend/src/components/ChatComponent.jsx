import React, { useState } from 'react';
import { sendMessage, resetSession } from '../services/ChatService';

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const agentReply = await sendMessage(input);
    const agentMessage = { role: 'agent', content: agentReply };

    setMessages(prev => [...prev, agentMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleReset = () => {
    resetSession(); // איפוס session_id
    setMessages([]);
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>🧠 סוכן הלמידה שלך</h2>

      <div style={{ minHeight: '400px', background: '#f9f9f9', padding: '1rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem'
            }}
          >
            <div
              style={{
                background: msg.role === 'user' ? '#4285f4' : '#e2e3e5',
                color: msg.role === 'user' ? '#fff' : '#000',
                padding: '0.8rem 1.2rem',
                borderRadius: '1rem',
                maxWidth: '80%',
                whiteSpace: 'pre-wrap'
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ marginTop: '1rem', fontStyle: 'italic', color: '#888' }}>הסוכן כותב...</div>
        )}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="כתוב שאלה או בקשה..."
          style={{
            flex: 1,
            padding: '0.8rem 1rem',
            borderRadius: '2rem',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button onClick={handleSend} style={{ padding: '0.8rem 1.2rem', borderRadius: '2rem', background: '#4285f4', color: '#fff', border: 'none' }}>
          שלח
        </button>
        <button onClick={handleReset} style={{ padding: '0.8rem 1.2rem', borderRadius: '2rem', background: '#ddd', color: '#000', border: 'none' }}>
          התחלה מחדש
        </button>
      </div>
    </div>
  );
}

export default HomePage;
