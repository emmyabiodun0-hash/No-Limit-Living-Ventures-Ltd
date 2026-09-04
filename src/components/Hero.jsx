import { business, images, whatsappLink } from '../siteData'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <img src="./logo.png" alt={`${business.name} logo`} className="hero__logo" />

          <h1>Delicious Moments, Beautifully Made</h1>
          <p className="hero__lede">
            Freshly baked cakes, delicious meals and professional catering
            services for every special occasion.
          </p>

          <div className="hero__actions">
            <a href="#booking" className="button button--primary">
              Book Us
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="button button--ghost">
              Chat on WhatsApp
            </a>
          </div>

          <p className="hero__trust">Cakes • Catering • Events • Celebrations</p>
        </div>

        <div className="hero__visual">
          <img
            className="hero__img hero__img--one"
            src={images.heroCake}
            alt="Freshly baked celebration cake"
            loading="eager"
          />
          <img
            className="hero__img hero__img--two"
            src={images.heroFoodSpread}
            alt="Beautifully arranged catering spread"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
