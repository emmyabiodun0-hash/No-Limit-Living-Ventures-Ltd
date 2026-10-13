import VideoPlayer from './VideoPlayer';
import { media } from '../siteData';

function CompanyVideo() {
  return (
    <section id="videos" className="company-video">
      <div className="company-video__inner">
        <div className="company-video__intro">
          <h2>Meet No Limit Living Ventures Ltd.</h2>

          <p className="company-video__subtitle">
            Discover Our Passion for Cakes, Food and Catering.
          </p>

          <p>
            Watch our introduction video to learn about the company, explore
            our services, and discover how to book cakes and catering for
            your events.
          </p>

          <div className="company-video__actions">
            <a href="#services" className="button button--primary">
              Explore Our Services
            </a>

            <a href="#booking" className="button button--gold">
              Book Us
            </a>

            <a href="#contact" className="button button--ghost">
              Contact Us
            </a>
          </div>
        </div>

        <VideoPlayer
          src={media.companyVideo}
          title="Company introduction video"
          description="An introduction to No Limit Living Ventures Ltd. — our cakes, food and catering."
        />
      </div>
    </section>
  );
}

export default CompanyVideo;