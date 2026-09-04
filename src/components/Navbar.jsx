import { useEffect, useState } from 'react'
import { business } from '../siteData'

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#cakes', label: 'Cakes' },
  { href: '#catering', label: 'Catering' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book Us' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
  }, [isMenuOpen])

  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__brand" onClick={handleLinkClick}>
          <img src="./logo.png" alt={`${business.name} logo`} className="navbar__logo-img" />
          <span className="navbar__brand-name">{business.name}</span>
        </a>

        <nav className="navbar__links navbar__links--desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#booking" className="navbar__cta">
          Book Us
        </a>

        <button
          className={`navbar__toggle ${isMenuOpen ? 'is-open' : ''}`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`navbar__links navbar__links--mobile ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
