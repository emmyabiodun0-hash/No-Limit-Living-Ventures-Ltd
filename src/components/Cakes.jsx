import { images } from '../siteData'

const CAKES = [
  {
    name: 'Birthday Cakes',
    description: 'Fun, colourful and delicious cakes for every age.',
    image: images.cakeBirthday,
  },
  {
    name: 'Wedding Cakes',
    description: 'Elegant tiered cakes designed around your wedding theme.',
    image: images.cakeWedding,
  },
  {
    name: 'Anniversary Cakes',
    description: 'Cakes made to mark another year of celebration.',
    image: images.cakeAnniversary,
  },
  {
    name: 'Celebration Cakes',
    description: 'For graduations, promotions and every milestone.',
    image: images.cakeCelebration,
  },
  {
    name: 'Custom Cakes',
    description: 'A design built around your theme, colours and taste.',
    image: images.cakeCustom,
  },
  {
    name: 'Cupcakes',
    description: 'Beautifully finished cupcakes for guest favours and trays.',
    image: images.cakeCupcakes,
  },
]

function Cakes() {
  return (
    <section id="cakes" className="cakes">
      <div className="cakes__inner">
        <div className="cakes__intro">
          <h2>Our Delicious Cakes</h2>
          <p>Every cake is baked to order and finished by hand.</p>
        </div>

        <div className="cakes__grid">
          {CAKES.map((cake) => (
            <article key={cake.name} className="cake-card">
              <img src={cake.image} alt={cake.name} loading="lazy" />
              <div className="cake-card__body">
                <h3>{cake.name}</h3>
                <p>{cake.description}</p>
                <a href="#booking" className="cake-card__link">
                  Order / Book Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cakes
