import React, { useEffect, useState } from 'react';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Recetas', to: '/#recetas' },
  { label: 'Nosotros', to: '/#nosotros' },
  { label: 'Contacto', to: '/#contacto' },
];

const icons = {
  user: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="20" r="1.7" />
      <circle cx="18" cy="20" r="1.7" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.7 19.3 6 15.2a7.6 7.6 0 1 1 2.8 2.7Z" />
      <path d="M9.2 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.2.2-.2.4 0 .7.4.7 1.2 1.6 2.2 2.1.3.2.5.2.7-.1l.5-.6c.2-.2.4-.3.7-.2l1.6.7c.3.1.4.3.4.6 0 .7-.5 1.5-1.2 1.7-.8.3-2.8-.1-4.8-2.1-2-2-2.5-4-2.2-4.8Z" />
    </svg>
  ),
};

function navigateTo(event, to) {
  if (to.includes('#')) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className="navbar__brand" href="/" onClick={(event) => navigateTo(event, '/')} aria-label="Don Juan inicio">
        <span className="navbar__logo">
          {/* TODO: Reemplazar por logo generado con IA o archivo final de marca Don Juan. */}
        </span>
        <span>Don Juan</span>
      </a>

      <nav className="navbar__links" aria-label="Navegacion principal">
        {navItems.map((item) => (
          <a key={item.label} href={item.to} onClick={(event) => navigateTo(event, item.to)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions" aria-label="Acciones rapidas">
        <a className="navbar__icon-link" href="/login" onClick={(event) => navigateTo(event, '/login')} aria-label="Usuario">
          {icons.user}
        </a>
        <a
          className="navbar__icon-link"
          href="/carrito"
          onClick={(event) => navigateTo(event, '/carrito')}
          aria-label="Carrito"
        >
          {icons.cart}
        </a>
        {/* TODO: Integrar envio de pedido por WhatsApp. */}
        <button aria-label="WhatsApp">{icons.whatsapp}</button>
      </div>
    </header>
  );
}

export default Navbar;
