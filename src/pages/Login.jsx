import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import imgFotoFamiliar from '../imgs/imgfotofamiliar.png';

const demoUser = {
  email: 'consumidor@lactoproductos.com',
  password: '1234abc',
};

function navigateTo(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Login() {
  // TODO: Integrar Firebase Auth para inicio de sesion.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if (email.trim().toLowerCase() !== demoUser.email || password !== demoUser.password) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    window.localStorage.setItem('donJuanAuth', 'true');
    window.localStorage.setItem('donJuanUser', demoUser.email);

    const redirectPath = window.sessionStorage.getItem('donJuanRedirectAfterLogin') || '/confirmacion-pedido';
    window.sessionStorage.removeItem('donJuanRedirectAfterLogin');
    navigateTo(redirectPath);
  };

  return (
    <div className="site-shell login-shell">
      <Navbar />

      <main className="login-page">
        <section className="login-showcase" style={{ '--login-image': `url(${imgFotoFamiliar})` }}>
          <div className="login-showcase__content">
            <span className="eyebrow">Tradición familiar</span>
            <h2>Más de 80 años llevando tradición y sabor a la mesa.</h2>
            <p>Accede a tu cuenta para realizar pedidos, consultar productos y disfrutar la calidad Don Juan.</p>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card__header">
            <h1>Iniciar sesión</h1>
            <p>Accede a tu cuenta para realizar pedidos</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label>
              <span>Correo electrónico o usuario</span>
              <input
                type="text"
                placeholder="consumidor@lactoproductos.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
              />
            </label>

            <label>
              <span>Contraseña</span>
              <input
                type="password"
                placeholder="1234abc"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError('');
                }}
              />
            </label>

            <div className="login-form__meta">
              <label className="remember-check">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#recuperar">¿Olvidaste tu contraseña?</a>
            </div>

            {error && <p className="login-form__error">{error}</p>}

            <Button className="login-form__submit" type="submit">
              Iniciar sesión
            </Button>
          </form>

          <p className="login-register">
            ¿No tienes cuenta?{' '}
            <a
              href="/registro"
              onClick={(event) => {
                event.preventDefault();
                navigateTo('/registro');
              }}
            >
              Regístrate
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
