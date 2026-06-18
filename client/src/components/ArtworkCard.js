import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ArtworkCard.css';

export default function ArtworkCard({ artwork }) {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find(i => i._id === artwork._id);

  return (
    <article className="artwork-card">
      <Link to={`/gallery/${artwork._id}`} className="artwork-card__image-wrap">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="artwork-card__img"
          loading="lazy"
        />
        {!artwork.available && <span className="artwork-card__badge artwork-card__badge--sold">Sold</span>}
        <div className="artwork-card__overlay">
          <span className="artwork-card__view">View piece →</span>
        </div>
      </Link>

      <div className="artwork-card__body">
        <p className="artwork-card__category section-label">{artwork.category}</p>
        <Link to={`/gallery/${artwork._id}`}>
          <h3 className="artwork-card__title">{artwork.title}</h3>
        </Link>
        <p className="artwork-card__medium">{artwork.medium}</p>
        <div className="artwork-card__footer">
          <span className="artwork-card__price">₹{artwork.price.toLocaleString()}</span>
          {artwork.available ? (
            <button
              className={`artwork-card__btn ${inCart ? 'artwork-card__btn--added' : ''}`}
              onClick={() => addToCart(artwork)}
              disabled={!!inCart}
            >
              {inCart ? '✓ Added' : 'Add to collection'}
            </button>
          ) : (
            <span className="artwork-card__unavailable">Not available</span>
          )}
        </div>
      </div>
    </article>
  );
}
