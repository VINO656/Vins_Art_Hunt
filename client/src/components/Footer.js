import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__ornament-row">
        <span className="footer__line" />
        <span className="footer__diamond">✦</span>
        <span className="footer__line" />
      </div>

      <div className="footer__inner container">
        <div className="footer__brand">
          <h2 className="footer__wordmark">Vins_Art_Hunt</h2>
          <p className="footer__tagline">Original artworks for quiet souls.</p>
          <p className="footer__location">Erode, Tamil Nadu — India</p>
        </div>

        <div className="footer__nav">
          <p className="section-label" style={{marginBottom:'0.75rem'}}>Navigate</p>
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__connect">
          <p className="section-label" style={{marginBottom:'0.75rem'}}>Connect</p>
          <a href="https://youtube.com/@ovutoflove" target="_blank" rel="noreferrer">YouTube Channel</a>
          <Link to="/contact">Write to me</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Vins_Art_Hunt — All artworks are originals, made with care.</p>
        <p className="footer__bottom-sub">Each piece is one of a kind. Prints and commissions available on request.</p>
        <Link to="/login" className="footer__admin-link" style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'none' }}>Studio Login</Link>
      </div>
    </footer>
  );
}
