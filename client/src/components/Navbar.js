import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, setCartOpen } = useCart();
  const { isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';
  const navClass = `navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHome && !scrolled ? 'navbar--hero-top' : ''}`;

  return (
    <header className={navClass}>
      <div className="navbar__inner">
        {/* Left nav */}
        <nav className="navbar__links navbar__links--left">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
        </nav>

        {/* Wordmark */}
        <Link to="/" className="navbar__wordmark">
          <span className="navbar__wordmark-main">Vins_Art_Hunt</span>
          <span className="navbar__wordmark-sub">— original artworks —</span>
        </Link>

        {/* Right nav */}
        <nav className="navbar__links navbar__links--right">
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          
          {isAdmin && (
            <>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Dashboard</Link>
              <button onClick={handleLogout} className="navbar__logout-btn" style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', marginLeft: '0.5rem' }}>Logout</button>
            </>
          )}

          <button
            className="navbar__cart"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartItems.length > 0 && (
              <span className="navbar__cart-count">{cartItems.length}</span>
            )}
          </button>
        </nav>

        {/* Mobile burger */}
        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {isAdmin && (
          <>
            <Link to="/admin">Dashboard</Link>
            <button onClick={handleLogout} style={{ color: '#c62828' }}>Logout</button>
          </>
        )}
        <button onClick={() => { setCartOpen(true); setMenuOpen(false); }}>
          Basket ({cartItems.length})
        </button>
      </div>
    </header>
  );
}
