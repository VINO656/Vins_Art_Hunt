import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArtworkCard from '../components/ArtworkCard';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/artworks?featured=true')
      .then(res => { setFeatured(res.data.slice(0, 4)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="/uploads/IMG_20260609_234412_322.webp"
            alt="Studio"
            className="hero__bg-img"
          />
          <div className="hero__bg-overlay" />
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow section-label">Erode, Tamil Nadu — India</p>
          <h1 className="hero__title">
            Art made from<br />
            <em>the inside out</em>
          </h1>
          <div className="ink-divider-sm" style={{margin:'1.5rem 0', background:'var(--gold-pale)'}} />
          <p className="hero__sub">
            Each painting holds a moment — fog, memory, afternoon light.<br />
            Original works in watercolour, oil, and gouache.
          </p>
          <div className="hero__actions">
            <Link to="/gallery" className="btn-primary hero__cta">Browse the Gallery</Link>
            <Link to="/about" className="hero__link">Read my story →</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll">
          <span />
          <p className="section-label">Scroll</p>
        </div>
      </section>

      {/* ── Philosophy strip ── */}
      <section className="philosophy">
        <div className="container philosophy__inner">
          <div className="philosophy__item">
            <span className="philosophy__icon">✦</span>
            <h4>Original works only</h4>
            <p>Every piece is painted by hand. No prints, no reproductions — unless you ask.</p>
          </div>
          <div className="philosophy__divider" />
          <div className="philosophy__item">
            <span className="philosophy__icon">✦</span>
            <h4>Made slowly, on purpose</h4>
            <p>Each painting takes its own time. I don't rush what wants to breathe.</p>
          </div>
          <div className="philosophy__divider" />
          <div className="philosophy__item">
            <span className="philosophy__icon">✦</span>
            <h4>Commissions welcome</h4>
            <p>Have something in mind? Write to me. I love painting for specific people and places.</p>
          </div>
        </div>
      </section>

      {/* ── Featured works ── */}
      <section className="featured container">
        <div className="featured__header">
          <p className="section-label">From the studio</p>
          <h2 className="featured__title">Recent & Selected Works</h2>
          <div className="ink-divider-sm" />
          <p className="featured__sub">
            A small window into what's currently available.
          </p>
        </div>

        {loading ? (
          <div className="loading-quill">Gathering the collection…</div>
        ) : (
          <div className="featured__grid">
            {featured.map(art => <ArtworkCard key={art._id} artwork={art} />)}
          </div>
        )}

        <div className="featured__cta">
          <Link to="/gallery" className="btn-ghost">See the full gallery</Link>
        </div>
      </section>

      {/* ── About strip ── */}
      <section className="about-strip">
        <div className="about-strip__image-col">
          <img
            src="/uploads/IMG_20260530_180041.jpg"
            alt="Artist at work"
          />
          <img
            src="/uploads/IMG_20260513_181116.jpg"
            alt="Painting detail"
            className="about-strip__img2"
          />
        </div>
        <div className="about-strip__text">
          <p className="section-label">The person behind the paintings</p>
          <h2>Painting as a way<br /><em>of remembering</em></h2>
          <div className="ink-divider-sm" style={{margin:'1.25rem 0', marginLeft:0}} />
          <p>
            I paint what the mind keeps returning to — old gardens, light through cloth, the feeling of
            a letter written but never sent. My studio is small. My supplies are few. The work is made
            quietly, mostly in the early mornings, before the day begins its noise.
          </p>
          <p style={{marginTop:'1rem'}}>
            I also share the process on YouTube — the thinking, the doubts, the small discoveries.
          </p>
          <div className="about-strip__links">
            <Link to="/about" className="btn-ghost">About me</Link>
            <a
              href="https://youtube.com/@ovutoflove"
              target="_blank"
              rel="noreferrer"
              className="about-strip__yt"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-block">
            <span className="quote-mark">"</span>
            <blockquote>
              To make something by hand is to leave a record of the mind that held the brush.
            </blockquote>
            <p className="quote-attr">— studio notebook, 2023</p>
          </div>
        </div>
      </section>

      {/* ── Newsletter / CTA ── */}
      <section className="cta-band container">
        <p className="section-label">Stay in touch</p>
        <h2>A letter, when something new is ready</h2>
        <p className="cta-band__sub">
          I don't write often. But when I do, it's worth opening.
        </p>
        <Link to="/contact" className="btn-primary">Write to me</Link>
      </section>

    </div>
  );
}
