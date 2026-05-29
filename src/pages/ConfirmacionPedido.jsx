import React, { useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';

const orderItems = [
  {
    id: 1,
    name: 'Queso Gouda',
    quantity: 2,
    total: 368,
  },
  {
    id: 2,
    name: 'Quesillo',
    quantity: 1,
    total: 156,
  },
  {
    id: 3,
    name: 'Queso Crema',
    quantity: 3,
    total: 354,
  },
];

// TODO: Guardar usuarios y pedidos en Firestore.
// TODO: Integrar envio de pedido por WhatsApp.
const currency = new Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  maximumFractionDigits: 0,
  style: 'currency',
});

function ConfirmacionPedido() {
  const [whatsappStatus, setWhatsappStatus] = useState('');

  const estimatedTotal = useMemo(() => {
    return orderItems.reduce((total, item) => total + item.total, 0);
  }, []);

  const handleWhatsApp = (event) => {
    event.preventDefault();
    setWhatsappStatus('Simulación: aquí se abriría WhatsApp con el resumen del pedido.');
  };

  return (
    <div className="site-shell checkout-shell">
      <Navbar />

      <main className="checkout-page fade-in">
        <section className="checkout-header">
          <span className="eyebrow">Confirmación</span>
          <h1>Finaliza tu pedido Don Juan</h1>
        </section>

        <section className="checkout-layout">
          <form className="checkout-form" onSubmit={handleWhatsApp}>
            <fieldset>
              <legend>Datos del cliente</legend>

              <label>
                <span>Nombre completo</span>
                <input type="text" placeholder="Escribe tu nombre" />
              </label>

              <label>
                <span>Nombre del negocio / Empresa</span>
                <input type="text" placeholder="Nombre comercial" />
              </label>
            </fieldset>

            <fieldset>
              <legend>Dirección de entrega</legend>

              <label>
                <span>Calle y número</span>
                <input type="text" placeholder="Calle, numero exterior o interior" />
              </label>

              <div className="checkout-form__grid">
                <label>
                  <span>Colonia</span>
                  <input type="text" placeholder="Colonia" />
                </label>

                <label>
                  <span>Ciudad / Municipio</span>
                  <input type="text" placeholder="Ciudad o municipio" />
                </label>
              </div>

              <label>
                <span>Estado</span>
                <input type="text" placeholder="Estado" />
              </label>

              <label>
                <span>Referencias adicionales opcional</span>
                <textarea rows="4" placeholder="Punto de referencia, horario o indicaciones para entrega" />
              </label>
            </fieldset>
          </form>

          <aside className="checkout-summary" aria-label="Resumen del pedido">
            <h2>Resumen del pedido</h2>

            <div className="checkout-summary__items">
              {orderItems.map((item) => (
                <article className="checkout-item" key={item.id}>
                  <ImagePlaceholder label={item.name} className="checkout-item__image" />
                  <div>
                    <h3>{item.name}</h3>
                    <span>Cantidad: {item.quantity}</span>
                  </div>
                  <strong>{currency.format(item.total)}</strong>
                </article>
              ))}
            </div>

            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <strong>{currency.format(estimatedTotal)}</strong>
              </div>
              <div className="checkout-totals__final">
                <span>Total estimado</span>
                <strong>{currency.format(estimatedTotal)}</strong>
              </div>
            </div>

            <p className="checkout-note">
              Una vez enviado tu pedido, será recibido por nuestro equipo de ventas para confirmar detalles y tiempos de
              entrega.
            </p>

            <Button className="checkout-whatsapp" onClick={handleWhatsApp}>
              Enviar pedido por WhatsApp
            </Button>

            {whatsappStatus && <p className="checkout-status">{whatsappStatus}</p>}
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ConfirmacionPedido;
