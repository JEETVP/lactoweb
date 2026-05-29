import React from 'react';
import ImagePlaceholder from './ImagePlaceholder.jsx';
import Button from './Button.jsx';

function ProductCard({ name, description, tag, price, compact = false, showActions = false }) {
  return (
    <article className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      <ImagePlaceholder label={compact ? 'Producto' : name} className="product-card__image" />
      <div className="product-card__content">
        {tag && <span className="product-card__tag">{tag}</span>}
        <h3>{name}</h3>
        {price && <strong className="product-card__price">{price}</strong>}
        <p>{description}</p>
        {showActions && (
          <div className="product-card__actions">
            <Button className="product-card__button">Ver producto</Button>
            <button className="product-card__cart" aria-label={`Agregar ${name} al carrito`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="9" cy="20" r="1.7" />
                <circle cx="18" cy="20" r="1.7" />
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" />
                <path d="M12 11h5" />
                <path d="M14.5 8.5v5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
