import { business } from '../siteData'

function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <div className="about__visual">
          <div className="about__photo-frame">
            <img src="./mypic.png" alt={`${business.name} founder`} />
          </div>
        </div>

        <div className="about__copy">
          <h2>{business.name}</h2>
          <p>
            {business.name} provides quality cakes, delicious food and
            professional catering services for weddings, birthdays, naming
            ceremonies, corporate events and every occasion worth
            celebrating.
          </p>
          <p>
            Every cake is baked and finished with care, every menu is
            prepared fresh, and every event is handled with attention to
            presentation and detail — so the food looks as good as it
            tastes, and your guests are well taken care of from start to
            finish.
          </p>

          <ul className="about__values">
            <li>
              <span className="about__values-term">Quality &amp; presentation</span>
              Cakes and meals made with care and finished beautifully.
            </li>
            <li>
              <span className="about__values-term">Custom cakes</span>
              Designs built around your event, theme and taste.
            </li>
            <li>
              <span className="about__values-term">Professional catering</span>
              Reliable food preparation and service for events of any size.
            </li>
          </ul>

          <a href="#booking" className="button button--primary">
            Book Our Service
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
