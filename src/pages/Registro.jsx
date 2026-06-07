import React from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import imgFotoFamiliar from '../imgs/imgfotofamiliar.png';

function navigateTo(event, to) {
  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Registro() {
  // TODO: Integrar Firebase Auth para registro.
  // TODO: Guardar perfil de usuario en Firestore.
  return (
    <div className="site-shell login-shell">
      <Navbar />

      <main className="login-page register-page">
        <section className="login-showcase" style={{ '--login-image': `url(${imgFotoFamiliar})` }}>
          <div className="login-showcase__content">
            <span className="eyebrow">Tradición familiar</span>
            <h2>Únete a la familia Don Juan y disfruta sabor en cada pedido.</h2>
            <p>Crea tu cuenta para realizar pedidos, consultar productos y tener una experiencia más cercana con Don Juan.</p>
          </div>
        </section>

        <section className="login-card register-card">
          <div className="login-card__header">
            <h1>Crear cuenta</h1>
            <p>Regístrate para comenzar a pedir</p>
          </div>

          <form className="login-form register-form">
            <label>
              <span>Correo electrónico</span>
              <input type="email" placeholder="correo@empresa.com" />
            </label>

            <label>
              <span>Contraseña</span>
              <input type="password" placeholder="Crea una contraseña" />
            </label>

            <label>
              <span>Confirmar contraseña</span>
              <input type="password" placeholder="Confirma tu contraseña" />
            </label>

            <Button className="login-form__submit">Crear cuenta</Button>
          </form>

          <p className="login-register">
            ¿Ya tienes cuenta? <a href="/login" onClick={(event) => navigateTo(event, '/login')}>Inicia sesión</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Registro;
