import React from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import bannercontacto from '../imgs/bannercontacto.png';

function Contacto() {
  return (
    <div className="site-shell contact-shell">
      <Navbar />

      <main className="contact-page fade-in">
        <section className="contact-banner" aria-label="Contacto Don Juan">
          <img src={bannercontacto} alt="Contacto Don Juan" />
        </section>

        <section className="contact-card">
          <span className="eyebrow">Contacto directo</span>
          <h1>Contacto</h1>
          <div className="contact-info">
            <p>
              <strong>Teléfono:</strong> 222 235 4901
            </p>
            <p>
              <strong>Dirección:</strong> Cdad. Militar 15, Ignacio Zaragoza, 72380 Heroica Puebla de Zaragoza, Pue.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contacto;
