import React from 'react';

function ImagePlaceholder({ label, className = '' }) {
  return (
    <div className={`image-placeholder ${className}`.trim()} aria-label={label || 'Imagen pendiente'}>
      {/* TODO: Reemplazar este placeholder por imagen generada con IA o fotografia de producto. */}
      {/* TODO: Integrar Firebase Storage para imagenes. */}
      <span>{label}</span>
    </div>
  );
}

export default ImagePlaceholder;
