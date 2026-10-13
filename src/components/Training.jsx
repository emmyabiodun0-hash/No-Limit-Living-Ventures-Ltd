import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { media, training, trainingRegisterLink } from '../siteData'

function Training() {
  const [flyerMissing, setFlyerMissing] = useState(false)
  const [isFlyerOpen, setIsFlyerOpen] = useState(false)

  // Close the enlarged flyer with the Escape key
  useEffect(() => {
    if (!isFlyerOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsFlyerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isFlyerOpen])

  const flyerAlt = `${training.programme} flyer, ${training.dates}`

  return (
    <section id="training" className="training">
      <div className="training__inner">
        <div className="training__intro">
          <h2>Learn to Make Snacks &amp; Pastries in Just 3 Days!</h2>
          <p>
            Learn practical skills in making delicious snacks and pastries
            that can help you start or grow your own food business.
          </p>
        </div>

        <div className="training__layout">
          <div className="training__video">
            <VideoPlayer
              src={media.trainingVideo}
              title="Snacks and Pastries Training advertisement"
              description={`${training.programme} — ${training.dates}.`}
            />
          </div>

          <div className="training__flyer">
            {flyerMissing ? (
              <div className="training__flyer-missing" role="status">
                <p>
                  Flyer not found. Add the file at{' '}
                  <code>public{media.trainingFlyer}</code> and refresh the
                  page.
                </p>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="training__flyer-button"
                  onClick={() => setIsFlyerOpen(true)}
                  aria-label="View the training flyer larger"
                >
                  <img
                    src={media.trainingFlyer}
                    alt={flyerAlt}
                    onError={() => setFlyerMissing(true)}
                  />
                </button>
                <p className="training__flyer-hint">Tap the flyer to enlarge</p>
                <a
                  href={media.trainingFlyer}
                  download="snacks-training-flyer.jpeg"
                  className="button button--ghost"
                >
                  Download Flyer
                </a>
              </>
            )}
          </div>

          <div className="training__info">
            <dl className="training__details">
              <div>
                <dt>Company</dt>
                <dd>{training.company}</dd>
              </div>
              <div>
                <dt>Programme</dt>
                <dd>{training.programme}</dd>
              </div>
              <div>
                <dt>Dates</dt>
                <dd>{training.dates}</dd>
              </div>
              <div>
                <dt>First batch</dt>
                <dd>{training.firstBatch}</dd>
              </div>
              <div>
                <dt>Second batch</dt>
                <dd>{training.secondBatch}</dd>
              </div>
            </dl>

            <a
              href={trainingRegisterLink}
              target="_blank"
              rel="noreferrer"
              className="button button--gold training__register"
            >
              Register for Training
            </a>
          </div>
        </div>
      </div>

      {isFlyerOpen && !flyerMissing && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Training flyer"
          onClick={() => setIsFlyerOpen(false)}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close flyer"
            onClick={() => setIsFlyerOpen(false)}
          >
            &times;
          </button>
          <img src={media.trainingFlyer} alt={flyerAlt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default Training
