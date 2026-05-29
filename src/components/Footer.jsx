import React from 'react';

function Footer() {
  const navigateTo = (event, to) => {
    if (to.includes('#')) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('app:navigation'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="contacto">
      <div className="footer__grid">
        <div>
          <strong>Don Juan</strong>
          <p>Lacto Productos de Oriente. Quesos y lacteos artesanales para mesas, tiendas y cocinas profesionales.</p>
        </div>
        <div>
          <h3>Explora</h3>
          <a href="/productos" onClick={(event) => navigateTo(event, '/productos')}>
            Productos
          </a>
          <a href="/#recetas">Recetas</a>
          <a href="/#nosotros">Nosotros</a>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>Pedidos B2B y B2C</p>
          <p>WhatsApp: +52 000 000 0000</p>
          <p>contacto@donjuan.mx</p>
        </div>
        <div>
          <h3>Horario</h3>
          <p>Lunes a sabado</p>
          <p>8:00 a.m. - 6:00 p.m.</p>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Lacto Productos de Oriente</span>
        <span>Hecho para crecer con sabor artesanal.</span>
      </div>
    </footer>
  );
}

export default Footer;
