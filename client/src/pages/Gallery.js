import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkCard from '../components/ArtworkCard';
import './Gallery.css';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSoldOut, setShowSoldOut] = useState(true);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/categories').then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    axios.get('/api/artworks', { params })
      .then(res => {
        let data = res.data;
        if (!showSoldOut) data = data.filter(a => a.available);
        setArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory, showSoldOut, search]);

  return (
    <div className="gallery-page">
      {/* Page header */}
      <div className="gallery-header">
        <div className="gallery-header__bg" />
        <div className="gallery-header__content container">
          <p className="section-label">The collection</p>
          <h1 className="gallery-header__title">Gallery</h1>
          <div className="ink-divider-sm" />
          <p className="gallery-header__sub">
            Original works, each made slowly. Some available, some already gone to their home.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="gallery-filters container">
        <div className="gallery-filters__categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`gallery-filter-btn ${activeCategory === cat ? 'gallery-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-filters__right">
          <label className="gallery-filter-toggle">
            <input
              type="checkbox"
              checked={showSoldOut}
              onChange={e => setShowSoldOut(e.target.checked)}
            />
            <span>Show sold works</span>
          </label>

          <div className="gallery-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search works…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="ink-divider container" style={{marginTop:0}} />

      {/* Grid */}
      <div className="gallery-grid container">
        {loading ? (
          <div className="loading-quill" style={{gridColumn:'1/-1'}}>
            Unrolling the scrolls…
          </div>
        ) : artworks.length === 0 ? (
          <div className="gallery-empty">
            <span className="ornament" style={{fontSize:'2rem'}}>✦</span>
            <p>No works found in this collection.</p>
          </div>
        ) : (
          artworks.map(art => <ArtworkCard key={art._id} artwork={art} />)
        )}
      </div>

      {!loading && artworks.length > 0 && (
        <p className="gallery-count container">
          {artworks.length} work{artworks.length !== 1 ? 's' : ''} in the collection
        </p>
      )}
    </div>
  );
}
