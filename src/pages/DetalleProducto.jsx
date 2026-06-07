import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';
import imgprod2 from '../imgs/imgprod2.png';
import imgprod3 from '../imgs/imgprod3.png';
import imgprod4 from '../imgs/imgprod4.png';
import imgprod5 from '../imgs/imgprod5.png';
import imgprod6 from '../imgs/imgprod6.png';

const presentations = ['1 kg', '3 kg', '5 kg'];
const fallbackProduct = {
  name: 'Queso Tipo Gouda',
  price: '$XXX',
  category: 'Quesos',
  imageSrc: imgprod5,
  description:
    'Queso suave y cremoso con un sabor delicado y excelente fundido. Ideal para sándwiches, hamburguesas y preparaciones gratinadas, ofreciendo la calidad, el rendimiento y el sabor que caracterizan a Don Juan.',
};

const productsBySlug = {
  'queso-tipo-sierra': {
    name: 'Queso Tipo Sierra',
    price: '$XXX',
    category: 'Quesos',
    imageSrc: imgprod4,
    description:
      'Queso semiduro con el tradicional sabor y un ligero toque salado. Ideal para antojitos, quesadillas y ensaladas, ofreciendo la calidad, el rendimiento y el sabor que caracterizan a Don Juan.',
  },
  'queso-tipo-gouda': fallbackProduct,
};

const galleryImages = [imgprod5, imgprod4, imgprod2, imgprod3, imgprod6];

function DetalleProducto() {
  // TODO: Leer detalle del producto desde Firestore usando el id de la ruta.
  const [quantity, setQuantity] = useState(1);
  const [presentation, setPresentation] = useState('1 kg');
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 1];
  const product = productsBySlug[slug] || fallbackProduct;

  const updateQuantity = (value) => {
    const nextValue = Number(value);
    if (Number.isNaN(nextValue)) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.max(1, nextValue));
  };

  return (
    <div className="site-shell product-detail-shell">
      <Navbar />

      <main className="product-detail-page fade-in">
        <nav className="breadcrumb" aria-label="Ruta de navegacion">
          <a href="#inicio">Inicio</a>
          <span>/</span>
          <a href="#productos">Productos</a>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <section className="product-detail">
          <div className="product-detail__gallery">
            <ImagePlaceholder label={product.name} src={product.imageSrc} className="product-detail__main-image" />

            <div className="product-detail__thumbs" aria-label="Galeria del producto">
              {[product.imageSrc, ...galleryImages.filter((image) => image !== product.imageSrc)].map(
                (image, index) => (
                  <button className={index === 0 ? 'is-active' : ''} key={image} type="button">
                    <ImagePlaceholder label={`Vista ${index + 1}`} src={image} />
                  </button>
                ),
              )}
            </div>
          </div>

          <article className="product-detail__info">
            <span className="product-detail__badge">{product.category}</span>
            <h1>{product.name}</h1>
            <strong className="product-detail__price">{product.price}</strong>
            <p>{product.description}</p>

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

              <Button className="product-detail__add">Agregar al carrito</Button>
            </div>

            <div className="sample-box">
              <div>
                <h2>¿Quieres probarlo primero?</h2>
                <p>Agrega una muestra a tu siguiente pedido y valida sabor, textura y presentacion.</p>
              </div>
              <Button variant="light">Solicitar muestra con mi pedido</Button>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DetalleProducto;
