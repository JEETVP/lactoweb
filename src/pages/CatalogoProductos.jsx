import React, { useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';

const categories = ['Todos', 'Quesos', 'Cremas', 'Bases para helado'];

// TODO: Leer catalogo desde Firestore y asociar imagenes desde Firebase Storage.
const products = [
  {
    name: 'Queso Frescal',
    price: 126,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Gouda',
    price: 184,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Ranchero',
    price: 142,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Cubicado',
    price: 168,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Quesillo',
    price: 156,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Cotija',
    price: 198,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Crema',
    price: 118,
    category: 'Cremas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Cheddar',
    price: 176,
    category: 'Quesos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
];

function CatalogoProductos() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [category, setCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => category === 'Todos' || product.category === category)
      .filter((product) => product.name.toLowerCase().includes(search.trim().toLowerCase()))
      .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
  }, [category, search, sortOrder]);

  return (
    <div className="site-shell catalog-shell">
      <Navbar />

      <main className="catalog-page fade-in">
        <section className="catalog-hero">
          <div>
            <span className="eyebrow">Productos artesanales</span>
            <h1>Catálogo de Productos Don Juan</h1>
            <p>
              Una vista comercial para explorar quesos, cremas y bases artesanales con una experiencia clara para venta
              directa o pedidos de negocio.
            </p>
          </div>

          <label className="catalog-search">
            <span>Buscar</span>
            <input
              type="search"
              placeholder="Buscar producto"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </section>

        <section className={`catalog-layout ${filtersOpen ? '' : 'catalog-layout--filters-hidden'}`}>
          <aside className="catalog-filters" aria-label="Filtros del catalogo">
            <div className="catalog-filters__header">
              <h2>Filtros</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Ocultar filtros">
                Ocultar
              </button>
            </div>

            <div className="filter-group">
              <h3>Ordenar</h3>
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sortOrder === 'asc'}
                  onChange={() => setSortOrder('asc')}
                />
                Precio menor a mayor
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  checked={sortOrder === 'desc'}
                  onChange={() => setSortOrder('desc')}
                />
                Precio mayor a menor
              </label>
            </div>

            <div className="filter-group">
              <h3>Categorías</h3>
              {categories.map((item) => (
                <button
                  className={category === item ? 'is-active' : ''}
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <div className="catalog-content">
            <div className="catalog-toolbar">
              <button type="button" className="filters-toggle" onClick={() => setFiltersOpen((value) => !value)}>
                Filtros
              </button>
              <span>{filteredProducts.length} productos</span>
            </div>

            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  price={`$${product.price}`}
                  description={product.description}
                  tag={product.category}
                  showActions
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CatalogoProductos;
