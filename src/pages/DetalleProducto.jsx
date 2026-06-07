import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';
import { addCartItem } from '../utils/cart.js';
import { showSuccessToast } from '../utils/toast.js';
import imgprod1 from '../imgs/imgprod1.png';
import imgprod3 from '../imgs/imgprod3.png';
import imgprod4 from '../imgs/imgprod4.png';
import imgprod5 from '../imgs/imgprod5.png';
import imgprod7 from '../imgs/imgprod7.png';

const presentations = ['1 kg', '3 kg', '5 kg'];
const fallbackProduct = {
  name: 'Queso Tipo Gouda',
  price: 156,
  category: 'Quesos',
  presentation: '3 kg',
  imageSrc: imgprod5,
  slug: 'queso-tipo-gouda',
  description:
    'Queso suave y cremoso con un sabor delicado y excelente fundido. Ideal para sándwiches, hamburguesas y preparaciones gratinadas, ofreciendo la calidad, el rendimiento y el sabor que caracterizan a Don Juan.',
};

const productsBySlug = {
  'queso-frescal': {
    name: 'Queso Frescal',
    price: 126,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod1,
    slug: 'queso-frescal',
    description: 'Queso fresco de sabor suave, ideal para acompañar comidas cotidianas y recetas tradicionales.',
  },
  'queso-gouda': {
    name: 'Queso Gouda',
    price: 184,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod5,
    slug: 'queso-gouda',
    description: 'Queso de textura cremosa y excelente fundido para sándwiches, gratinados y preparaciones calientes.',
  },
  'queso-ranchero': {
    name: 'Queso Ranchero',
    price: 142,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod3,
    slug: 'queso-ranchero',
    description: 'Queso de sabor tradicional, perfecto para antojitos, ensaladas y platillos caseros.',
  },
  'queso-tipo-sierra': {
    name: 'Queso Tipo Sierra',
    price: 168,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod4,
    slug: 'queso-tipo-sierra',
    description:
      'Queso semiduro con el tradicional sabor y un ligero toque salado. Ideal para antojitos, quesadillas y ensaladas, ofreciendo la calidad, el rendimiento y el sabor que caracterizan a Don Juan.',
  },
  'queso-tipo-gouda': fallbackProduct,
  'queso-cotija': {
    name: 'Queso Cotija',
    price: 198,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod5,
    slug: 'queso-cotija',
    description: 'Queso de sabor intenso y textura firme, ideal para dar carácter a antojitos y platillos mexicanos.',
  },
  'queso-crema': {
    name: 'Queso Crema',
    price: 118,
    category: 'Cremas',
    presentation: '3 kg',
    imageSrc: imgprod7,
    slug: 'queso-crema',
    description: 'Producto suave y versátil para recetas cremosas, untables y preparaciones de cocina diaria.',
  },
  'queso-cheddar': {
    name: 'Queso Cheddar',
    price: 176,
    category: 'Quesos',
    presentation: '3 kg',
    imageSrc: imgprod7,
    slug: 'queso-cheddar',
    description: 'Queso de sabor marcado y gran desempeño en fundido para hamburguesas, snacks y gratinados.',
  },
};

function navigateTo(event, to) {
  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function DetalleProducto() {
  // TODO: Leer detalle del producto desde Firestore usando el id de la ruta.
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 1];
  const product = productsBySlug[slug] || fallbackProduct;
  const [quantity, setQuantity] = useState(1);
  const [presentation, setPresentation] = useState(product.presentation || '3 kg');

  const updateQuantity = (value) => {
    const nextValue = Number(value);
    if (Number.isNaN(nextValue)) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.max(1, nextValue));
  };

  const handleAddToCart = () => {
    addCartItem({ ...product, presentation }, quantity);
    showSuccessToast('Tu producto fue agregado a la bolsa');
  };

  const handleSampleRequest = () => {
    addCartItem(
      {
        ...product,
        name: `Muestra ${product.name}`,
        presentation: 'Muestra',
        price: 0,
        slug: `${product.slug || slug}-muestra`,
      },
      1,
    );
    showSuccessToast('Muestra añadida al carrito');
  };

  return (
    <div className="site-shell product-detail-shell">
      <Navbar />

      <main className="product-detail-page fade-in">
        <nav className="breadcrumb" aria-label="Ruta de navegacion">
          <a href="/" onClick={(event) => navigateTo(event, '/')}>Inicio</a>
          <span>/</span>
          <a href="/productos" onClick={(event) => navigateTo(event, '/productos')}>Productos</a>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <section className="product-detail">
          <article className="product-detail__media-card">
            <ImagePlaceholder label={product.name} src={product.imageSrc} className="product-detail__main-image" />
            <div className="product-detail__quick-info" aria-label="Información rápida del producto">
              <span>{product.category}</span>
              <span>{presentation}</span>
              <span>Producto Don Juan</span>
            </div>
          </article>

          <article className="product-detail__info">
            <div className="product-detail__heading">
              <span className="product-detail__badge">{product.category}</span>
              <h1>{product.name}</h1>
              <strong className="product-detail__price">${product.price}</strong>
              <p>{product.description}</p>
            </div>

            <div className="presentation-picker">
              <h2>Presentaciones disponibles</h2>
              <div>
                {presentations.map((item) => (
                  <button
                    className={presentation === item ? 'is-active' : ''}
                    key={item}
                    type="button"
                    onClick={() => setPresentation(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-panel">
              <label className="quantity-selector">
                <span>Cantidad</span>
                <div>
                  <button type="button" onClick={() => updateQuantity(quantity - 1)} aria-label="Restar cantidad">
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => updateQuantity(event.target.value)}
                    aria-label="Cantidad"
                  />
                  <button type="button" onClick={() => updateQuantity(quantity + 1)} aria-label="Sumar cantidad">
                    +
                  </button>
                </div>
              </label>

              <Button className="product-detail__add" onClick={handleAddToCart}>
                Agregar al carrito
              </Button>
            </div>

            <div className="sample-box">
              <div>
                <h2>¿Quieres probarlo primero?</h2>
                <p>Agrega una muestra a tu siguiente pedido y valida su sabor, textura y presentación.</p>
              </div>
              <Button variant="light" onClick={handleSampleRequest}>
                Solicitar muestra
              </Button>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DetalleProducto;
