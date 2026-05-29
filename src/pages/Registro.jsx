import React from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function Registro() {
  // TODO: Integrar Firebase Auth para registro.
  // TODO: Guardar perfil de usuario en Firestore.
  return (
    <div className="site-shell login-shell">
      <Navbar />

      <main className="login-page register-page">
        <section className="login-card register-card">
          <div className="login-card__header">
            <span className="eyebrow">Cuenta Don Juan</span>
            <h1>Crear cuenta</h1>
            <p>Regístrate para comenzar a pedir</p>
          </div>

          <form className="login-form register-form">
            <label>
              <span>Nombre completo</span>
              <input type="text" placeholder="Escribe tu nombre completo" />
            </label>

            <label>
              <span>Nombre del negocio / Empresa</span>
              <input type="text" placeholder="Nombre comercial" />
            </label>

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

            <label className="remember-check terms-check">
              <input type="checkbox" />
              <span>Acepto los términos y el aviso de privacidad</span>
            </label>

            <Button className="login-form__submit">Crear cuenta</Button>
          </form>

          <p className="login-register">
            ¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Registro;
