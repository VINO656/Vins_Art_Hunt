import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-inner">

        {/* Left — info */}
        <div className="contact-info">
          <div className="contact-info__img-stack">
            <img src="/uploads/IMG_20260423_214356.jpg" alt="Art" className="contact-info__img1" />
            <img src="/uploads/IMG20260511222043.jpg" alt="Studio" className="contact-info__img2" />
          </div>

          <div className="contact-info__text">
            <p className="section-label">Get in touch</p>
            <h2>Write to me</h2>
            <div className="ink-divider-sm" style={{margin:'1rem 0', marginLeft:0}} />
            <p>
              For enquiries about available works, commissions, prints, or just to say hello —
              I read every letter and write back personally.
            </p>
            <p style={{marginTop:'0.75rem'}}>
              Please allow 24–48 hours. I'm often in the studio.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-detail-label">Location</span>
                <span>Erode, Tamil Nadu, India</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-detail-label">YouTube</span>
                <a href="https://youtube.com/@ovutoflove" target="_blank" rel="noreferrer">@ovutoflove</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-form-col">
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <span className="ornament" style={{fontSize:'2.5rem'}}>✦</span>
                <h3>Your letter has been received.</h3>
                <p>Thank you. I'll write back to <em>{form.email || 'you'}</em> as soon as I can — usually within a day or two.</p>
                <button className="btn-ghost" style={{marginTop:'1.5rem'}} onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h3 className="contact-form-title">Send a letter</h3>
                <p className="contact-form-note">
                  Tell me what you're looking for — a specific piece, a commission, a question.
                </p>
                <div className="ink-divider-sm" style={{margin:'1.25rem 0', marginLeft:0}} />

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-field">
                    <label>Your name</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="How shall I address you?"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label>Your email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="Where shall I write back?"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label>Your message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="What would you like to say?"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="contact-error">Something went wrong. Please try again.</p>
                  )}

                  <button type="submit" className="btn-primary contact-submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending…' : 'Send your letter →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
