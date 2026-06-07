import React from 'react';
import Button from '../components/Button.jsx';
import Footer from '../components/Footer.jsx';
import ImagePlaceholder from '../components/ImagePlaceholder.jsx';
import Navbar from '../components/Navbar.jsx';
import imgprod5 from '../imgs/imgprod5.png';
import imgreceta2 from '../imgs/imgreceta2.png';

const recipeFacts = [
  ['Tiempo', '20 min'],
  ['Dificultad', 'Fácil'],
  ['Porciones', '2 porciones'],
];

const molletesIngredients = [
  '2 bolillos partidos a la mitad',
  '1 taza de frijoles refritos',
  'Queso Tipo Gouda Don Juan al gusto',
  'Pico de gallo al gusto',
  'Cilantro fresco al gusto',
  'Mantequilla o aceite para dorar',
];

const molletesSteps = [
  'Parte los bolillos por la mitad y dóralos ligeramente en comal, sartén u horno.',
  'Unta una capa generosa de frijoles refritos sobre cada mitad.',
  'Agrega Queso Tipo Gouda Don Juan al gusto.',
  'Hornea o calienta hasta que el queso se funda.',
  'Sirve con pico de gallo y cilantro fresco.',
];

function navigateTo(event, to) {
  event.preventDefault();
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('app:navigation'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function DetalleReceta() {
  return (
    <div className="site-shell recipe-detail-shell">
      <Navbar />

      <main className="recipe-page fade-in">
        <Button className="recipe-page__back" onClick={(event) => navigateTo(event, '/')}>
          Volver a recetas
        </Button>

        <section className="recipe-detail recipe-detail--page" aria-labelledby="molletes-title">
          <div className="recipe-detail__media">
            <ImagePlaceholder label="Molletes Don Juan" src={imgreceta2} className="recipe-detail__image" />
            <div className="recipe-product-card">
              <ImagePlaceholder label="Queso Tipo Gouda Don Juan" src={imgprod5} className="recipe-product-card__image" />
              <div>
                <span>Prepárala con</span>
                <strong>Queso Tipo Gouda Don Juan</strong>
              </div>
            </div>
          </div>

          <article className="recipe-detail__content">
            <span className="recipe-detail__tag">Receta destacada</span>
            <h1 id="molletes-title">Molletes Don Juan</h1>
            <p>
              Una receta sencilla, cremosa y perfecta para disfrutar en familia o como una opción rápida para cualquier
              momento del día.
            </p>

            <div className="recipe-detail__facts">
              {recipeFacts.map(([label, value]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  {label}
                </span>
              ))}
            </div>

            <div className="recipe-detail__panels">
              <div className="recipe-panel">
                <h2>Ingredientes</h2>
                <ul>
                  {molletesIngredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-panel">
                <h2>Preparación</h2>
                <ol>
                  {molletesSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="recipe-tip">
              <strong>Tip Don Juan</strong>
              <p>
                Para un mejor resultado, gratina los molletes durante unos minutos hasta que el queso tome una textura
                cremosa y ligeramente dorada.
              </p>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DetalleReceta;
