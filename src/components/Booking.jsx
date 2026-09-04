import { useState } from 'react'
import { business } from '../siteData'

const EVENT_TYPES = [
  'Wedding',
  'Naming Ceremony',
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Burial / Funeral',
  'Church Event',
  'Graduation',
  'Bridal Shower',
  'Baby Shower',
  'Engagement',
  'House Party',
  'Private Party',
  'Family Gathering',
  'Other',
]

const SERVICES_REQUIRED = [
  'Catering',
  'Wedding Catering',
  'Birthday Catering',
  'Naming Ceremony Catering',
  'Cake',
  'Wedding Cake',
  'Pastries',
  'Full Event Package',
  'Other',
]

function getTodayISODate() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  const localDate = new Date(now.getTime() - offset * 60 * 1000)
  return localDate.toISOString().split('T')[0]
}

const initialFormState = {
  fullName: '',
  phone: '',
  email: '',
  eventType: '',
  eventDate: '',
  eventTime: '',
  guests: '',
  location: '',
  serviceRequired: '',
  details: '',
}

function Booking() {
  const [formData, setFormData] = useState(initialFormState)
  const [status, setStatus] = useState('idle') // idle | submitted
  const minDate = getTodayISODate()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function buildWhatsAppMessage(data) {
    const lines = [
      `New booking request — ${business.name}`,
      '',
      `Full Name: ${data.fullName}`,
      `Phone Number: ${data.phone}`,
      `Email Address: ${data.email}`,
      '',
      `Event Type: ${data.eventType}`,
      `Event Date: ${data.eventDate}`,
      `Event Time: ${data.eventTime}`,
      `Number of Guests: ${data.guests}`,
      `Location / Venue: ${data.location}`,
      `Service Required: ${data.serviceRequired}`,
      '',
      `Additional Details: ${data.details || '—'}`,
    ]
    return lines.join('\n')
  }

  function handleSubmit(event) {
    event.preventDefault()

    // ------------------------------------------------------------
    // Sends the booking straight to WhatsApp instead of a backend.
    // This opens WhatsApp (app on mobile, WhatsApp Web on desktop)
    // with the message pre-filled — the customer still has to press
    // send on their end, nothing is transmitted automatically.
    //
    // If a Flask API is added later, this is also where you'd add:
    // fetch('https://your-api.example.com/bookings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // ------------------------------------------------------------
    const message = buildWhatsAppMessage(formData)
    const url = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')

    setStatus('submitted')
    setFormData(initialFormState)
  }

  return (
    <section id="booking" className="booking">
      <div className="booking__inner">
        <div className="booking__intro">
          <h2>Book Us For Your Event</h2>
          <p>
            Fill in your event details below and the team will reach out to
            confirm availability and discuss the specifics.
          </p>
        </div>

        {status === 'submitted' ? (
          <div className="booking__success" role="status">
            <h3>Thank you!</h3>
            <p>
              WhatsApp should have opened in a new tab with your booking
              details filled in — just press send there to reach us. We'll
              confirm availability and discuss the details from there.
            </p>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => setStatus('idle')}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form className="booking__form" onSubmit={handleSubmit}>
            <h3 className="booking__form-heading">Customer Information</h3>
            <div className="booking__form-grid">
              <div className="booking__form-row">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="booking__form-row">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="booking__form-row">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <h3 className="booking__form-heading">Event Information</h3>
            <div className="booking__form-grid">
              <div className="booking__form-row">
                <label htmlFor="eventType">Event Type</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking__form-row">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  min={minDate}
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking__form-row">
                <label htmlFor="eventTime">Event Time</label>
                <input
                  id="eventTime"
                  name="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking__form-row">
                <label htmlFor="guests">Number of Guests</label>
                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking__form-row booking__form-row--full">
                <label htmlFor="location">Location / Venue</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking__form-row booking__form-row--full">
                <label htmlFor="serviceRequired">Service Required</label>
                <select
                  id="serviceRequired"
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES_REQUIRED.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="booking__form-row">
              <label htmlFor="details">Tell us more about your event</label>
              <textarea
                id="details"
                name="details"
                rows="4"
                value={formData.details}
                onChange={handleChange}
                placeholder="Tell us the type of food, cake requirements, number of guests, decoration preferences, or anything else we should know."
              />
            </div>

            <button type="submit" className="button button--primary">
              Submit Booking Request
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Booking