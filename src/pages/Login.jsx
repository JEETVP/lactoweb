import React from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function Login() {
  // TODO: Integrar Firebase Auth para inicio de sesion.
  return (
    <div className="site-shell login-shell">
      <Navbar />

      <main className="login-page">
        <section className="login-card">
          <div className="login-card__header">
            <span className="eyebrow">Cuenta Don Juan</span>
            <h1>Iniciar sesión</h1>
            <p>Accede a tu cuenta para realizar pedidos</p>
          </div>

          <form className="login-form">
            <label>
              <span>Correo electrónico o usuario</span>
              <input type="text" placeholder="usuario@empresa.com" />
            </label>

            <label>
              <span>Contraseña</span>
              <input type="password" placeholder="Ingresa tu contraseña" />
            </label>

            <div className="login-form__meta">
              <label className="remember-check">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#recuperar">¿Olvidaste tu contraseña?</a>
            </div>

            <Button className="login-form__submit">Iniciar sesión</Button>
          </form>

          <div className="login-separator">
            <span></span>
            <strong>o continúa con</strong>
            <span></span>
          </div>

          <button className="whatsapp-login" type="button">
            Continuar con WhatsApp
          </button>

          <p className="login-register">
            ¿No tienes cuenta? <a href="#registro">Regístrate</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
