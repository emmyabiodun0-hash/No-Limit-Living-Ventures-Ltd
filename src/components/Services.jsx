import { images } from '../siteData'

const SERVICES = [
  {
    name: 'Custom Cakes',
    description:
      'Beautiful cakes made for birthdays, weddings, anniversaries, and special celebrations.',
    image: images.serviceCustomCake,
  },
  {
    name: 'Wedding Cakes',
    description: 'Elegant wedding cakes designed for memorable wedding celebrations.',
    image: images.serviceWeddingCake,
  },
  {
    name: 'Birthday Cakes',
    description: 'Beautiful and delicious cakes for children and adults.',
    image: images.serviceBirthdayCake,
  },
  {
    name: 'Pastries & Treats',
    description: 'Different pastries, snacks and sweet treats for events and celebrations.',
    image: images.servicePastries,
  },
  {
    name: 'Event Catering',
    description: 'Professional food preparation and catering for different events.',
    image: images.serviceEventCatering,
  },
  {
    name: 'Wedding Catering',
    description: 'Food preparation and catering services for weddings.',
    image: images.serviceWeddingCatering,
  },
  {
    name: 'Naming Ceremony',
    description: 'Catering services for naming ceremonies and family celebrations.',
    image: images.serviceNamingCeremony,
  },
  {
    name: 'Birthday / Party Catering',
    description: 'Food and refreshments for birthday parties and social gatherings.',
    image: images.servicePartyCatering,
  },
  {
    name: 'Corporate Catering',
    description: 'Food and catering services for meetings, office events and corporate occasions.',
    image: images.serviceCorporateCatering,
  },
]

function Services() {
  return (
    <section id="services" className="services">
      <div className="services__inner">
        <div className="services__intro">
          <h2>Our Services</h2>
          <p>Cakes, pastries and full catering — built around your event.</p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <article key={service.name} className="service-card">
              <img src={service.image} alt="" loading="lazy" />
              <div className="service-card__body">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
