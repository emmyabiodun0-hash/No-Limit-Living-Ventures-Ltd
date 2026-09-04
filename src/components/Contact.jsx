import { business, whatsappLink } from '../siteData'

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <h2>Have an event coming up? Let's make it special.</h2>
          <p>Reach out directly, or send us your event details below.</p>
          <a href="#booking" className="button button--primary">
            Book Us Today
          </a>
        </div>

        <ul className="contact__details">
          <li>
            <span>Phone</span>
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
          </li>
          <li>
            <span>Email</span>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </li>
          <li>
            <span>WhatsApp</span>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              Message us on WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Contact
