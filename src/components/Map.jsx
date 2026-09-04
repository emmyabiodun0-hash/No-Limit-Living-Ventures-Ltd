// Replace MAP_EMBED_SRC below with the correct Google Maps embed URL
// whenever the exact business location needs to change. Nothing else
// in this component needs to be touched.
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.6745763442764!2d4.707072674777302!3d7.610345692404787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103823045d74460b%3A0xd5f0a6e6406bd2b1!2sNo%20Limit%20Living%20Ventures%20Ltd!5e0!3m2!1sen!2sng!4v1788449867067!5m2!1sen!2sng'

function Map() {
  return (
    <section id="map" className="map-section">
      <div className="map-section__inner">
        <h2>Our Location</h2>
        <p>We look forward to serving you.</p>

        <div className="map-section__frame">
          <iframe
            src={MAP_EMBED_SRC}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="No Living Limit Venture Ltd location"
          />
        </div>
      </div>
    </section>
  )
}

export default Map
