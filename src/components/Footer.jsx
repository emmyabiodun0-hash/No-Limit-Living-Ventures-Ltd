import { business, whatsappLink } from '../siteData'

const FOOTER_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#cakes', label: 'Cakes' },
  { href: '#catering', label: 'Catering' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book Us' },
  { href: '#contact', label: 'Contact' },
]

// Placeholder-only — no real social links exist yet. Replace the `href`
// values once accounts are set up; until then these are non-functional.
const SOCIAL_PLACEHOLDERS = ['Facebook', 'Instagram', 'TikTok']

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="./logo.png" alt={`${business.name} logo`} className="footer__logo-img" />
          <span className="footer__logo-name">{business.name}</span>
          <p>
            Quality cakes, delicious meals and professional catering
            services for memorable occasions.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={business.phoneHref}>{business.phoneDisplay}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <a href={whatsappLink} target="_blank" rel="noreferrer">
            WhatsApp
          </a>

          <div className="footer__social" aria-label="Social media (not yet linked)">
            {SOCIAL_PLACEHOLDERS.map((name) => (
              <span key={name} className="footer__social-icon" title={`Add your ${name} link`}>
                {name.charAt(0)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {year} {business.name}. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
