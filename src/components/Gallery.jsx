import { useState } from 'react'
import { images } from '../siteData'

const GALLERY_ITEMS = [
  { src: images.galleryOne, caption: 'Celebration cake', span: 'tall' },
  { src: images.galleryTwo, caption: 'Catering table setup', span: 'wide' },
  { src: images.galleryThree, caption: 'Wedding food presentation', span: 'normal' },
  { src: images.galleryFour, caption: 'Pastries and treats', span: 'normal' },
  { src: images.galleryFive, caption: 'Buffet for an event', span: 'wide' },
  { src: images.gallerySix, caption: 'Custom cake close-up', span: 'tall' },
]

function Gallery() {
  const [activeImage, setActiveImage] = useState(null)

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__inner">
        <div className="gallery__intro">
          <h2>Gallery</h2>
          <p>Cakes, food and catering setups from recent events.</p>
        </div>

        <div className="gallery__grid">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={item.caption}
              type="button"
              className={`gallery__item gallery__item--${item.span}`}
              onClick={() => setActiveImage(item)}
              aria-label={`View larger image: ${item.caption}`}
            >
              <img src={item.src} alt={item.caption} loading="lazy" />
              <span className="gallery__item-caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption}
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close image"
            onClick={() => setActiveImage(null)}
          >
            &times;
          </button>
          <img src={activeImage.src} alt={activeImage.caption} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default Gallery
