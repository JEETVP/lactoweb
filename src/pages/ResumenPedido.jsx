import React, { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';

const initialItems = [
  {
    id: 1,
    name: 'Queso Gouda',
    presentation: '1 kg',
    pricePerKg: 184,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Quesillo',
    presentation: '3 kg',
    pricePerKg: 156,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Queso Crema',
    presentation: '1 kg',
    pricePerKg: 118,
    quantity: 3,
  },
];

// TODO: Sincronizar carrito y pedido con Firestore cuando exista backend.
const currency = new Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  maximumFractionDigits: 0,
  style: 'currency',
});

function ResumenPedido() {
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id, value) => {
    const nextValue = Number(value);

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number.isNaN(nextValue) ? 1 : Math.max(1, nextValue),
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const orderTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.pricePerKg * item.quantity, 0);
  }, [items]);

  return (
    <div className="site-shell order-summary-shell">
      <Navbar />

      <main className="order-summary-page fade-in">
        <section className="order-summary__header">
          <span className="eyebrow">Resumen de pedido</span>
          <h1>Artículos por ordenar</h1>
        </section>

        <section className="order-panel" aria-label="Articulos seleccionados">
          <div className="order-table order-table--head" aria-hidden="true">
            <span>Producto</span>
            <span>Presentación</span>
            <span>Precio por kilo</span>
            <span>Cantidad</span>
            <span>Total</span>
            <span></span>
          </div>

          <div className="order-table__body">
            {items.map((item) => (
              <article className="order-row" key={item.id}>
                <div className="order-row__product" data-label="Producto">
                  <ImagePlaceholder label={item.name} className="order-row__image" />
                  <strong>{item.name}</strong>
                </div>

                <span data-label="Presentación">{item.presentation}</span>
                <span data-label="Precio por kilo">{currency.format(item.pricePerKg)}</span>

                <label className="order-quantity" data-label="Cantidad">
                  <span>Cantidad</span>
                  <div className="order-quantity__controls">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Restar">
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, event.target.value)}
                      aria-label={`Cantidad de ${item.name}`}
                    />
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Sumar">
                      +
                    </button>
                  </div>
                </label>

                <strong className="order-row__total" data-label="Total">
                  {currency.format(item.pricePerKg * item.quantity)}
                </strong>

                <button className="order-row__remove" type="button" onClick={() => removeItem(item.id)}>
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="order-panel__footer">
            <Button variant="light">Seguir comprando</Button>
            <div className="order-total">
              <span>Total acumulado</span>
              <strong>{currency.format(orderTotal)}</strong>
            </div>
            <Button>Continuar pedido</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ResumenPedido;
