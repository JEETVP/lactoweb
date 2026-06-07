import React, { useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import imgprod1 from '../imgs/imgprod1.png';
import imgprod2 from '../imgs/imgprod2.png';
import imgprod3 from '../imgs/imgprod3.png';
import imgprod4 from '../imgs/imgprod4.png';
import imgprod5 from '../imgs/imgprod5.png';
import imgprod7 from '../imgs/imgprod7.png';

const categories = ['Todos', 'Quesos', 'Cremas', 'Bases para helado'];

// TODO: Leer catalogo desde Firestore y asociar imagenes desde Firebase Storage.
const products = [
  {
    name: 'Queso Frescal',
    price: 126,
    category: 'Quesos',
    imageSrc: imgprod1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Gouda',
    price: 184,
    category: 'Quesos',
    imageSrc: imgprod2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Ranchero',
    price: 142,
    category: 'Quesos',
    imageSrc: imgprod3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Tipo Sierra',
    price: 168,
    category: 'Quesos',
    imageSrc: imgprod4,
    slug: 'queso-tipo-sierra',
    description:
      'Queso semiduro con el tradicional sabor y un ligero toque salado. Ideal para antojitos, quesadillas y ensaladas.',
  },
  {
    name: 'Queso Tipo Gouda',
    price: 156,
    category: 'Quesos',
    imageSrc: imgprod5,
    slug: 'queso-tipo-gouda',
    description:
      'Queso suave y cremoso con un sabor delicado y excelente fundido. Ideal para sándwiches y preparaciones gratinadas.',
  },
  {
    name: 'Queso Cotija',
    price: 198,
    category: 'Quesos',
    imageSrc: imgprod5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Crema',
    price: 118,
    category: 'Cremas',
    imageSrc: imgprod7,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
  {
    name: 'Queso Cheddar',
    price: 176,
    category: 'Quesos',
    imageSrc: imgprod7,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed sapien justo.',
  },
];

function navigateTo(event, to) {
  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function CatalogoProductos() {
  const [filtersOpen, setFiltersOpen] = useState(() => (typeof window === 'undefined' ? true : window.innerWidth > 760));
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
            <span className="eyebrow">Productos lacteos de calidad</span>
            <h1>Catálogo Don Juan</h1>
            <p>Tradición y calidad en cada producto.</p>
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
          {filtersOpen && (
            <button
              type="button"
              className="catalog-filter-backdrop"
              aria-label="Cerrar filtros"
              onClick={() => setFiltersOpen(false)}
            />
          )}

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
              <button
                type="button"
                className="filters-toggle"
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen((value) => !value)}
              >
                {filtersOpen ? 'Cerrar filtros' : 'Abrir filtros'}
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
                  imageSrc={product.imageSrc}
                  href={product.slug ? `/producto/${product.slug}` : undefined}
                  onClick={
                    product.slug ? (event) => navigateTo(event, `/producto/${product.slug}`) : undefined
                  }
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
