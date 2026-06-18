import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ArtworkDetail.css';

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  const inCart = artwork && cartItems.find(i => i._id === artwork._id);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`/api/artworks/${id}`)
      .then(res => { setArtwork(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-quill" style={{marginTop:'8rem'}}>Opening the piece…</div>;
  if (!artwork) return <div className="container" style={{paddingTop:'8rem', textAlign:'center'}}><p>Artwork not found.</p><Link to="/gallery" className="btn-ghost" style={{marginTop:'1rem', display:'inline-block'}}>Back to gallery</Link></div>;

  return (
    <div className="detail-page">
      <div className="detail-container">

        {/* Image */}
        <div className="detail-image-col">
          <div className="detail-image-wrap">
            <img src={artwork.imageUrl} alt={artwork.title} className="detail-image" />
            {!artwork.available && (
              <div className="detail-sold-overlay">
                <span>This piece has found its home</span>
              </div>
            )}
          </div>
          <p className="detail-image-caption">
            {artwork.medium} — {artwork.dimensions}
          </p>
        </div>

        {/* Info */}
        <div className="detail-info-col">
          <Link to="/gallery" className="detail-back">← Back to gallery</Link>

          <p className="section-label" style={{marginTop:'1.5rem'}}>{artwork.category}</p>
          <h1 className="detail-title">{artwork.title}</h1>
          <div className="ink-divider-sm" style={{margin:'1rem 0', marginLeft:0}} />

          <p className="detail-description">{artwork.description}</p>

          {/* Meta */}
          <div className="detail-meta">
            <div className="detail-meta-item">
              <span className="detail-meta-label">Year</span>
              <span>{artwork.year}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Medium</span>
              <span>{artwork.medium}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Dimensions</span>
              <span>{artwork.dimensions}</span>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-label">Status</span>
              <span className={artwork.available ? 'detail-available' : 'detail-sold'}>
                {artwork.available ? 'Available' : 'Sold'}
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="detail-purchase">
            <span className="detail-price">₹{artwork.price.toLocaleString()}</span>
            {artwork.available ? (
              <button
                className={`btn-primary detail-add ${inCart ? 'btn-ghost' : ''}`}
                onClick={() => addToCart(artwork)}
                disabled={!!inCart}
              >
                {inCart ? '✓ Added to collection' : 'Add to Collection'}
              </button>
            ) : (
              <span className="detail-sold-label">No longer available</span>
            )}
          </div>

          {/* Tags */}
          {artwork.tags && artwork.tags.length > 0 && (
            <div className="detail-tags">
              {artwork.tags.map(tag => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Commission note */}
          <div className="detail-commission">
            <span className="ornament">✦</span>
            <p>
              Interested in a similar work, or a commission for a specific place or person?{' '}
              <Link to="/contact">Write to me →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
