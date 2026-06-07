import React from 'react';
import ImagePlaceholder from './ImagePlaceholder.jsx';
import Button from './Button.jsx';

function ProductCard({
  name,
  description,
  tag,
  price,
  presentation,
  compact = false,
  showActions = false,
  imageSrc,
  href,
  onClick,
  onAddToCart,
}) {
  const isClickableCard = showActions && onClick;
  const className = `product-card ${compact ? 'product-card--compact' : ''} ${
    isClickableCard ? 'product-card--clickable' : ''
  }`.trim();
  const handleViewProduct = (event) => {
    event.stopPropagation();
    onClick?.(event);
  };
  const handleAddToCart = (event) => {
    event.stopPropagation();
    onAddToCart?.(event);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleViewProduct(event);
    }
  };
  const content = (
    <>
      <ImagePlaceholder label={compact ? name || 'Producto' : name} src={imageSrc} className="product-card__image" />
      <div className="product-card__content">
        {tag && <span className="product-card__tag">{tag}</span>}
        <h3>{name}</h3>
        {presentation && <span className="product-card__presentation">Presentación: {presentation}</span>}
        {price && <strong className="product-card__price">{price}</strong>}
        {description && <p>{description}</p>}
        {showActions && (
          <div className="product-card__actions">
            <Button className="product-card__button" onClick={handleViewProduct}>
              Ver producto
            </Button>
            <button
              className="product-card__cart"
              type="button"
              aria-label={`Agregar ${name} al carrito`}
              onClick={handleAddToCart}
            >
              Agregar
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (href && !showActions) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <article
      className={className}
      onClick={isClickableCard ? onClick : undefined}
      onKeyDown={isClickableCard ? handleKeyDown : undefined}
      role={isClickableCard ? 'button' : undefined}
      tabIndex={isClickableCard ? 0 : undefined}
    >
      {content}
    </article>
  );
}

export default ProductCard;
