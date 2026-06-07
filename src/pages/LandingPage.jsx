import React, { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import heroBg from '../imgs/hero.png';
import imgCalidadEntrega from '../imgs/imgcalidadentrega.png';
import imgFotoFamiliar from '../imgs/imgfotofamiliar.png';
import imgHistoria from '../imgs/imghistoria.png';
import imgIngredientes from '../imgs/imgingredientes.png';
import imgOcasionFamiliar from '../imgs/imgocasionfamiliar.png';
import imgprod4 from '../imgs/imgprod4.png';
import imgprod5 from '../imgs/imgprod5.png';
import imgreceta1 from '../imgs/imgreceta1.png';
import imgreceta2 from '../imgs/imgreceta2.png';
import imgreceta3 from '../imgs/imgreceta3.png';

const featuredProducts = [
  {
    name: 'Queso Tipo Sierra',
    description: 'Queso semiduro con toque salado, ideal para antojitos y quesadillas.',
    tag: 'Tradicional',
    imageSrc: imgprod4,
    href: '/producto/queso-tipo-sierra',
  },
  {
    name: 'Queso Tipo Gouda',
    description: 'Queso suave y cremoso con excelente fundido, ideal para sándwiches y gratinados.',
    tag: 'Cremoso',
    imageSrc: imgprod5,
    href: '/producto/queso-tipo-gouda',
  },
];

const timelineItems = [
  [
    '1940s',
    'La familia Castellanos inicia la venta de productos de abarrotería en el Mercado de La Merced en la Ciudad de México.',
  ],
  ['Años después', 'Epifanio Castellanos funda la marca Don Juan y continúa el legado familiar.'],
  ['Actualidad', 'Más de 80 años de tradición ofreciendo productos lácteos de calidad.'],
];

const historyMetrics = [
  ['80+', 'Años de tradición'],
  ['3', 'Generaciones'],
  ['100%', 'Compromiso familiar'],
];

const tableCards = [
  [
    'Tradición familiar',
    'Más de 80 años preservando el sabor y la calidad que distinguen a Don Juan.',
    'Fotografía tradición familiar',
    imgFotoFamiliar,
  ],
  [
    'Ingredientes seleccionados',
    'Procesos cuidadosamente supervisados para garantizar frescura y consistencia.',
    'Fotografía ingredientes seleccionados',
    imgIngredientes,
  ],
  [
    'Calidad en cada entrega',
    'Productos elaborados bajo estándares que aseguran el mejor resultado en cada presentación.',
    'Fotografía calidad en cada entrega',
    imgCalidadEntrega,
  ],
  [
    'Ideal para cualquier ocasión',
    'Perfectos para recetas caseras, negocios y momentos especiales en familia.',
    'Fotografía ocasión familiar',
    imgOcasionFamiliar,
  ],
];

const recipes = [
  ['Tostadas cremosas', 'Queso fresco, crema y vegetales crujientes para una venta rapida.', imgreceta1],
  ['Molletes Don Juan', 'Quesillo gratinado con notas lacteas profundas y textura elastica.', imgreceta2],
  ['Ensalada de rancho', 'Cubos de queso artesanal con hierbas, tomate y aceite de oliva.', imgreceta3],
];

const recipeFacts = [
  ['Tiempo', '20 min', 'time'],
  ['Dificultad', 'Fácil', 'difficulty'],
  ['Porciones', '2 porciones', 'servings'],
];

const landingSections = [
  ['inicio', 'Inicio'],
  ['nosotros', 'Historia'],
  ['mesa', 'Mesa'],
  ['recetas', 'Recetas'],
  ['pedido', 'Pedido'],
];

function navigateTo(event, to) {
  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleOrderClick(event) {
  const isLoggedIn = window.localStorage.getItem('donJuanAuth') === 'true';
  const nextPath = '/confirmacion-pedido';

  if (!isLoggedIn) {
    window.sessionStorage.setItem('donJuanRedirectAfterLogin', nextPath);
    navigateTo(event, '/login');
    return;
  }

  navigateTo(event, nextPath);
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      const currentSection = landingSections.reduce((current, [id]) => {
        const section = document.getElementById(id);
        if (!section || section.offsetTop > viewportAnchor) {
          return current;
        }
        return id;
      }, 'inicio');

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div className="site-shell">
      <Navbar />

      <nav className="landing-section-nav" aria-label="Secciones de la página principal">
        {landingSections.map(([id, label]) => (
          <a
            className={activeSection === id ? 'is-active' : ''}
            href={`#${id}`}
            key={id}
            onClick={(event) => scrollToSection(event, id)}
          >
            <span aria-hidden="true" />
            <strong>{label}</strong>
          </a>
        ))}
      </nav>

      <main>
        <section className="hero fade-in" id="inicio" style={{ '--hero-bg': `url(${heroBg})` }}>
          <div className="hero__copy">
            <span className="eyebrow">Lacto Productos de Oriente</span>
            <h1>Don Juan Quesos Artesanales</h1>
            <p>
              En Don Juan, elaboramos productos lácteos que combinan la tradición de una receta familiar con altos
              estándares de calidad, para brindarte quesos frescos, deliciosos y al mejor precio posible, ideales para
              acompañar cada momento y cada comida.
            </p>
            <Button onClick={(event) => navigateTo(event, '/productos')}>Conoce nuestros productos</Button>
          </div>

          <aside className="hero__featured" id="productos" aria-label="Productos destacados">
            <span className="hero__featured-label">Destacados</span>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.name}
                {...product}
                compact
                onClick={(event) => navigateTo(event, product.href)}
              />
            ))}
          </aside>
        </section>

        <section className="history section-band fade-in" id="nosotros">
          <div className="history__image">
            <ImagePlaceholder label="Taller artesanal" src={imgHistoria} />
          </div>
          <div className="history__copy">
            <SectionTitle
              align="left"
              kicker="Nuestra historia"
              title="El sabor de una tradición familiar que perdura."
            />
            <div className="history-timeline" aria-label="Línea del tiempo Don Juan">
              {timelineItems.map(([year, text]) => (
                <article className="history-timeline__item" key={year}>
                  <span>{year}</span>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="history-metrics" aria-label="Métricas de tradición Don Juan">
              {historyMetrics.map(([value, label]) => (
                <div className="history-metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="table-journey fade-in" id="mesa">
          <SectionTitle
            title="De la tradición a tu mesa"
            text="Productos elaborados con la calidad, experiencia y sabor que han acompañado a las familias por generaciones."
          />
          <div className="table-journey__grid">
            {tableCards.map(([title, text, imageLabel, imageSrc]) => (
              <article className="table-card" key={title}>
                <ImagePlaceholder label={imageLabel} src={imageSrc} className="table-card__image" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recipes section-band fade-in" id="recetas">
          <SectionTitle
            title="Recetas Don Juan"
            text="Ideas sencillas para disfrutar nuestros productos en cualquier ocasión."
          />
          <div className="recipes__grid">
            {recipes.map(([title, text, imageSrc], index) => (
              <article className={`recipe-card ${index === 1 ? 'recipe-card--featured' : ''}`} key={title}>
                <ImagePlaceholder label={title} src={imageSrc} className="recipe-card__image" />
                <div className="recipe-card__overlay">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="recipe-facts" aria-label="Datos rápidos">
                    {recipeFacts.map(([label, value, icon]) => (
                      <span className="recipe-fact" key={label}>
                        <span className={`recipe-fact__icon recipe-fact__icon--${icon}`} aria-hidden="true" />
                        {value}
                      </span>
                    ))}
                  </div>
                  <Button
                    className="recipe-card__button"
                    onClick={(event) => navigateTo(event, '/recetas/molletes-don-juan')}
                  >
                    Ver receta
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta fade-in" id="pedido">
          <div>
            <span className="eyebrow">Pedido directo</span>
            <h2>¿Listo para disfrutar el auténtico sabor artesanal?</h2>
          </div>
          <Button variant="light" onClick={handleOrderClick}>
            Realizar pedido
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
