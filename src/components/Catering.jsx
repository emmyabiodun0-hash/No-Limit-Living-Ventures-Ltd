import { images } from '../siteData'

const CATEGORIES = [
  'Weddings',
  'Naming Ceremonies',
  'Birthdays',
  'Anniversaries',
  'Corporate Events',
  'Burials / Funeral Events',
  'Private Parties',
  'Church Events',
  'Family Gatherings',
  'Other Events',
]

function Catering() {
  return (
    <section id="catering" className="catering">
      <div className="catering__inner">
        <div className="catering__copy">
          <h2>Catering For Every Occasion</h2>
          <p>
            From intimate family gatherings to full wedding receptions, meals
            are prepared fresh and served with attention to presentation —
            so your guests are well fed and well taken care of.
          </p>

          <ul className="catering__categories">
            {CATEGORIES.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>

          <a href="#booking" className="button button--primary">
            Book Catering Service
          </a>
        </div>

        <div className="catering__visual">
          <img
            className="catering__img catering__img--main"
            src={images.cateringCooking}
            alt="Professional food preparation for an event"
            loading="lazy"
          />
          <img
            className="catering__img catering__img--secondary"
            src={images.cateringBuffet}
            alt="Buffet setup at a catered event"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Catering
