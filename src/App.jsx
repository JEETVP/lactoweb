import React, { Component, useEffect, useState } from 'react';
import CatalogoProductos from './pages/CatalogoProductos.jsx';
import ConfirmacionPedido from './pages/ConfirmacionPedido.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import DetalleReceta from './pages/DetalleReceta.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import ResumenPedido from './pages/ResumenPedido.jsx';

const routes = [
  { pattern: /^\/$/, Component: LandingPage },
  { pattern: /^\/productos\/?$/, Component: CatalogoProductos },
  { pattern: /^\/producto\/[^/]+\/?$/, Component: DetalleProducto },
  { pattern: /^\/recetas\/molletes-don-juan\/?$/, Component: DetalleReceta },
  { pattern: /^\/carrito\/?$/, Component: ResumenPedido },
  { pattern: /^\/confirmacion-pedido\/?$/, Component: ConfirmacionPedido },
  { pattern: /^\/login\/?$/, Component: Login },
  { pattern: /^\/registro\/?$/, Component: Registro },
];

function getCurrentPath() {
  return window.location.pathname || '/';
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app-error">
          <h1>No se pudo cargar la página</h1>
          <p>{this.state.error.message}</p>
        </main>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const onLocationChange = () => setPath(getCurrentPath());

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('app:navigation', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('app:navigation', onLocationChange);
    };
  }, []);

  const match = routes.find((route) => route.pattern.test(path));
  const Page = match?.Component || LandingPage;

  return (
    <AppErrorBoundary>
      <Page />
    </AppErrorBoundary>
  );
}

export default App;
