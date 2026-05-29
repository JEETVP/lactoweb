import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';

const presentations = ['1 kg', '3 kg', '5 kg'];

function DetalleProducto() {
  // TODO: Leer detalle del producto desde Firestore usando el id de la ruta.
  const [quantity, setQuantity] = useState(1);
  const [presentation, setPresentation] = useState('1 kg');

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
          <strong>Queso Gouda</strong>
        </nav>

        <section className="product-detail">
          <div className="product-detail__gallery">
            <ImagePlaceholder label="Queso Gouda" className="product-detail__main-image" />

            <div className="product-detail__thumbs" aria-label="Galeria del producto">
              {[1, 2, 3, 4].map((item) => (
                <button className={item === 1 ? 'is-active' : ''} key={item} type="button">
                  <ImagePlaceholder label={`Vista ${item}`} />
                </button>
              ))}
            </div>
          </div>

          <article className="product-detail__info">
            <span className="product-detail__badge">Quesos</span>
            <h1>Queso Gouda</h1>
            <strong className="product-detail__price">$XXX</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo. Nulla facilisi. Sed
              consequat, augue vel gravida posuere, ligula erat dapibus sem, sed luctus mi lorem non lacus.
            </p>

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
