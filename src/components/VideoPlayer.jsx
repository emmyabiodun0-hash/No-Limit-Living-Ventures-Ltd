import { useState } from 'react'

// Reusable, accessible video player.
// - Native controls, playsInline, never autoplays
// - Defaults to a portrait 9:16 frame (your videos are 360x640)
// - If the file is missing/unplayable it shows a clear message instead of
//   a broken player (and never substitutes another video)
function VideoPlayer({ src, title, description, aspectRatio = '9 / 16' }) {
  const [hasError, setHasError] = useState(false)
  const descriptionId = `${title.replace(/\W+/g, '-').toLowerCase()}-desc`

  return (
    <figure className="video-player">
      {hasError ? (
        <div className="video-player__missing" role="status" style={{ aspectRatio }}>
          <p>
            Video not found. Add the file at <code>public{src}</code> and
            refresh the page.
          </p>
        </div>
      ) : (
        <video
          className="video-player__video"
          // #t=0.1 makes phones show the first frame instead of a black box
          src={`${src}#t=0.1`}
          style={{ aspectRatio }}
          controls
          playsInline
          preload="metadata"
          title={title}
          aria-label={title}
          aria-describedby={descriptionId}
          onError={() => setHasError(true)}
        >
          Your browser does not support the video tag.
        </video>
      )}
      <figcaption id={descriptionId} className="video-player__caption">
        {description}
      </figcaption>
    </figure>
  )
}

export default VideoPlayer
