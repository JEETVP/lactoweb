import React from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const featuredProducts = [
  {
    name: 'Queso Fresco',
    description: 'Textura suave, sabor limpio y rendimiento ideal para mesa o cocina.',
    tag: 'Favorito',
  },
  {
    name: 'Quesillo Artesanal',
    description: 'Hebras suaves con caracter lacteo y acabado cremoso.',
    tag: 'Artesanal',
  },
];

const benefits = [
  ['Origen cuidado', 'Procesos artesanales con seleccion de leche y control de frescura.'],
  ['Pedido flexible', 'Atencion para familias, restaurantes, tiendas y distribuidores.'],
  ['Sabor constante', 'Recetas tradicionales con estandar comercial para cada entrega.'],
  ['Marca confiable', 'Presentacion limpia, cercana y lista para anaquel o cocina.'],
];

const recipes = [
  ['Tostadas cremosas', 'Queso fresco, crema y vegetales crujientes para una venta rapida.'],
  ['Molletes Don Juan', 'Quesillo gratinado con notas lacteas profundas y textura elastica.'],
  ['Ensalada de rancho', 'Cubos de queso artesanal con hierbas, tomate y aceite de oliva.'],
];

function LandingPage() {
  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="hero fade-in" id="inicio">
          <div className="hero__copy">
            <span className="eyebrow">Lacto Productos de Oriente</span>
            <h1>Don Juan Quesos Artesanales</h1>
            <p>
              Lacteos con raiz tradicional y presencia moderna para hogares, negocios y cocinas que buscan sabor real,
              frescura y una marca lista para vender.
            </p>
            <Button>Conoce nuestros productos</Button>
          </div>

          <div className="hero__media">
            <ImagePlaceholder label="Logo / Marca Don Juan" className="hero__placeholder" />
          </div>

          <aside className="hero__featured" id="productos" aria-label="Productos destacados">
            <span className="hero__featured-label">Destacados</span>
            {featuredProducts.map((product) => (
              <ProductCard key={product.name} {...product} compact />
            ))}
          </aside>
        </section>

        <section className="history section-band fade-in" id="nosotros">
          <div className="history__image">
            <ImagePlaceholder label="Taller artesanal" />
          </div>
          <div className="history__copy">
            <SectionTitle
              align="left"
              kicker="Nuestra historia"
              title="Tradicion lactea con mirada comercial"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lectus vitae urna facilisis fermentum."
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet, justo id luctus tincidunt, nibh sem
              condimentum ipsum, vitae viverra lorem justo at magna. Curabitur gravida, nibh ac posuere fermentum, sem
              eros gravida lacus, vitae finibus massa sapien in lorem.
            </p>
          </div>
        </section>

        <section className="benefits fade-in">
          <SectionTitle
            kicker="Diferenciales"
            title="¿Por qué elegir Don Juan?"
            text="Una propuesta pensada para el antojo diario y para negocios que necesitan producto consistente."
          />
          <div className="benefits__grid">
            {benefits.map(([title, text], index) => (
              <article className="benefit-card" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recipes section-band fade-in" id="recetas">
          <SectionTitle
            kicker="Inspiracion"
            title="Recetas para disfrutar"
            text="Ideas sencillas para mostrar la versatilidad del catalogo Don Juan en casa y negocio."
          />
          <div className="recipes__grid">
            {recipes.map(([title, text]) => (
              <article className="recipe-card" key={title}>
                <ImagePlaceholder label={title} className="recipe-card__image" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta fade-in">
          <div>
            <span className="eyebrow">Pedido directo</span>
            <h2>¿Listo para disfrutar el auténtico sabor artesanal?</h2>
          </div>
          <Button variant="light">Realizar pedido</Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
