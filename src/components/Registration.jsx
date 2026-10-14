import { useRef, useState } from 'react'
import { business, nigerianStates, registration } from '../siteData'
import { Link, navigate } from '../router'
import { generateRegistrationNumber } from '../registrationNumber'
import {
  PAYMENT_MADE,
  PAYMENT_NOT_PAID,
  STEPS,
  FIELD_STEP,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatDate,
  initialValues,
  todayISO,
  validateAll,
  validateStep,
} from './registrationLogic'
import './Registration.css'

const EXPERIENCE_OPTIONS = ['Beginner', 'Some Experience', 'Experienced']
const PAYMENT_METHODS = ['Bank Transfer', 'Cash', 'Other']
const GENDER_OPTIONS = ['Female', 'Male', 'Prefer not to say']
const DECLARATION_TEXT =
  "I confirm that the information provided on this form is correct. I agree to follow the trainer's instructions, observe hygiene and safety rules, and treat other trainees and training materials with respect."

function omitKey(object, key) {
  const copy = { ...object }
  delete copy[key]
  return copy
}

function Req() {
  return (
    <span className="reg-req" aria-hidden="true">
      {' '}*
    </span>
  )
}

// One text / textarea / select field with label, hint and error.
function Input({ name, label, value, onChange, error, required, hint, as = 'input', className = '', children, ...rest }) {
  const id = `reg-${name}`
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const common = {
    id,
    name,
    value,
    required,
    onChange: (event) => onChange(name, event.target.value),
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
  }

  let control
  if (as === 'textarea') control = <textarea {...common} {...rest} />
  else if (as === 'select') control = <select {...common} {...rest}>{children}</select>
  else control = <input {...common} {...rest} />

  return (
    <div className={`reg-field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className="reg-label">
        {label}
        {required ? <Req /> : <span className="reg-optional"> (optional)</span>}
      </label>
      {hint && (
        <p className="reg-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {control}
      {error && (
        <p className="reg-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Radio buttons shown as selectable cards or chips.
function ChoiceGroup({ name, legend, required, value, onChange, options, error, variant = 'chip', hint }) {
  return (
    <fieldset className={`reg-field reg-choices reg-choices--${variant} ${error ? 'has-error' : ''}`}>
      <legend className="reg-label">
        {legend}
        {required && <Req />}
      </legend>
      {hint && <p className="reg-hint">{hint}</p>}
      <div className="reg-choices__grid">
        {options.map((option) => {
          const selected = value === option.value
          return (
            <label key={option.value} className={`reg-choice ${selected ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(name, option.value)}
                className="reg-sr-only"
                aria-invalid={error ? 'true' : undefined}
              />
              <span className="reg-choice__body">
                <span className="reg-choice__title">{option.title}</span>
                {option.description && <span className="reg-choice__desc">{option.description}</span>}
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p className="reg-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <section className="reg-review__section">
      <div className="reg-review__head">
        <h3>{title}</h3>
        <button type="button" className="reg-link-button" onClick={onEdit}>
          Edit
        </button>
      </div>
      <dl className="reg-review__list">{children}</dl>
    </section>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="reg-review__row">
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  )
}

function Registration() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent
  const [copied, setCopied] = useState(false)
  // The shared registration number from Supabase. Requested once per active form,
  // then reused for WhatsApp, "Open WhatsApp again" and "Copy my details".
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [popupBlocked, setPopupBlocked] = useState(false)
  const submittingRef = useRef(false) // blocks rapid double-clicks before React re-renders
  const topRef = useRef(null)

  const isLastStep = step === STEPS.length - 1
  const paymentMade = values.payment_status === PAYMENT_MADE
  const today = todayISO()

  // The form values plus the generated number (empty until the number exists).
  const valuesWithNumber = { ...values, registration_number: registrationNumber }

  function setValue(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => (previous[name] ? omitKey(previous, name) : previous))
  }

  function goToStep(index) {
    setStep(index)
    window.setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 20)
  }

  function focusFirstError() {
    window.setTimeout(() => {
      document.querySelector('.reg-step:not([hidden]) [aria-invalid="true"]')?.focus()
    }, 60)
  }

  function handleNext() {
    const stepErrors = validateStep(STEPS[step].id, values)
    if (Object.keys(stepErrors).length) {
      setErrors((previous) => ({ ...previous, ...stepErrors }))
      focusFirstError()
      return
    }
    goToStep(step + 1)
  }

  // Validates the form, gets ONE registration number from Supabase, then opens
  // WhatsApp with the whole registration typed in. The trainee still has to press
  // Send there, so the page never says the registration was "received".
  async function handleSendOnWhatsApp() {
    if (submittingRef.current) return

    const allErrors = validateAll(values)
    if (Object.keys(allErrors).length) {
      setErrors(allErrors)
      const firstField = Object.keys(allErrors)[0]
      const stepIndex = STEPS.findIndex((item) => item.id === FIELD_STEP[firstField])
      goToStep(stepIndex === -1 ? 0 : stepIndex)
      focusFirstError()
      return
    }

    setSubmitError('')

    // Number already generated for this form: reuse it, never ask Supabase again.
    if (registrationNumber) {
      const opened = window.open(buildWhatsAppUrl(valuesWithNumber), '_blank', 'noopener,noreferrer')
      setPopupBlocked(!opened)
      setStatus('sent')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    submittingRef.current = true
    setIsSubmitting(true)

    // Browsers block window.open() after an await, so open a blank tab now,
    // while we are still inside the click, and point it at WhatsApp afterwards.
    const popup = window.open('', '_blank')
    if (popup) {
      try {
        popup.opener = null
        popup.document.title = 'Opening WhatsApp…'
        popup.document.body.textContent = 'Preparing your WhatsApp message…'
      } catch {
        // Cosmetic only — ignore.
      }
    }

    try {
      const number = await generateRegistrationNumber()
      setRegistrationNumber(number)

      const url = buildWhatsAppUrl({ ...values, registration_number: number })
      if (popup && !popup.closed) {
        popup.location.href = url
        setPopupBlocked(false)
      } else {
        // Tab was blocked or closed: the success screen has a working button.
        setPopupBlocked(true)
      }
      setStatus('sent')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      if (popup && !popup.closed) popup.close()
      setSubmitError(error?.message || 'Unable to generate your registration number. Please try again.')
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    if (isLastStep) handleSendOnWhatsApp()
    else handleNext()
  }

  async function copyDetails() {
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage(valuesWithNumber))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const header = (
    <header className="reg-header">
      <Link to="/" className="reg-brand">
        <img
          src="/logo.png"
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <span>{business.name}</span>
      </Link>
      <Link to="/" className="reg-back">
        ← Back to website
      </Link>
    </header>
  )

  // ------------------------------------------------------------------
  // After pressing "Send registration on WhatsApp"
  // ------------------------------------------------------------------
  if (status === 'sent') {
    const url = buildWhatsAppUrl(valuesWithNumber)
    return (
      <div className="reg-page">
        {header}
        <main className="reg-container">
          <section className="reg-card reg-success" role="status">
            <div className="reg-success__icon" aria-hidden="true">
              ↗
            </div>
            <h1>Almost done — press Send in WhatsApp</h1>
            <p>
              WhatsApp should have opened with your registration details already typed in. Your registration is only
              received once you press <strong>Send</strong> on that message.
            </p>

            {registrationNumber && (
              <p className="reg-info">
                Your registration number: <strong>{registrationNumber}</strong>
              </p>
            )}
            {popupBlocked && (
              <p className="reg-info">
                Your browser did not open WhatsApp automatically. Tap <strong>OPEN WHATSAPP AGAIN</strong> below.
              </p>
            )}

            <div className="reg-next">
              <h2>Then send these in the same WhatsApp chat</h2>
              <ol>
                <li>
                  <strong>Your passport photograph</strong> — a clear, recent photo of your face.
                </li>
                <li>
                  <strong>Your payment receipt</strong>
                  {paymentMade
                    ? ' — a photo or screenshot of your receipt or transfer confirmation.'
                    : ' — once you have paid, send it here too.'}
                </li>
              </ol>
              <p>
                Payment is confirmed by {business.name} after checking, not automatically.
              </p>
            </div>

            <div className="reg-success__actions">
              <a href={url} target="_blank" rel="noreferrer" className="reg-btn reg-btn--gold">
                OPEN WHATSAPP AGAIN
              </a>
              <button type="button" className="reg-btn reg-btn--outline" onClick={copyDetails}>
                {copied ? 'Copied' : 'Copy my details'}
              </button>
            </div>
            <div className="reg-success__actions">
              <button
                type="button"
                className="reg-btn reg-btn--outline"
                onClick={() => {
                  setStatus('idle')
                  goToStep(STEPS.length - 1)
                }}
              >
                Edit my details
              </button>
              <button type="button" className="reg-btn reg-btn--outline" onClick={() => navigate('/')}>
                Back to website
              </button>
            </div>

            <p className="reg-success__help">
              WhatsApp didn't open? Tap “Copy my details”, then paste them into a chat with{' '}
              <a href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noreferrer">
                {registration.phones.primary}
              </a>
              , or call <a href={registration.phones.primaryHref}>{registration.phones.primary}</a> /{' '}
              <a href={registration.phones.alternativeHref}>{registration.phones.alternative}</a>.
            </p>
          </section>
        </main>
      </div>
    )
  }

  // ------------------------------------------------------------------
  // The form
  // ------------------------------------------------------------------
  const batchOptions = registration.batches.map((batch) => ({
    value: `${batch.label} (${batch.time})`,
    title: batch.label,
    description: batch.time,
  }))

  return (
    <div className="reg-page">
      {header}

      <main className="reg-container">
        <section className="reg-intro">
          <p className="reg-intro__eyebrow">Training registration</p>
          <h1>{registration.trainingName}</h1>
          <ul className="reg-intro__facts">
            <li>
              <span>Dates</span>
              {registration.trainingDates}
            </li>
            <li>
              <span>Batches</span>
              {registration.batches.map((batch) => `${batch.label}: ${batch.time}`).join(' · ')}
            </li>
            <li>
              <span>Training fee</span>
              {registration.feeDisplay}
            </li>
          </ul>
        </section>

        <div ref={topRef} className="reg-scroll-anchor" />

        <nav className="reg-progress" aria-label="Registration progress">
          <p className="reg-progress__text">
            Step {step + 1} of {STEPS.length}: <strong>{STEPS[step].title}</strong>
          </p>
          <div
            className="reg-progress__bar"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
            aria-valuetext={`Step ${step + 1} of ${STEPS.length}`}
          >
            <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
          <ol className="reg-steps">
            {STEPS.map((item, index) => (
              <li key={item.id} className={index < step ? 'is-done' : index === step ? 'is-current' : ''}>
                <button
                  type="button"
                  disabled={index >= step}
                  onClick={() => goToStep(index)}
                  aria-current={index === step ? 'step' : undefined}
                >
                  <span className="reg-steps__num">{index < step ? '✓' : index + 1}</span>
                  <span className="reg-steps__label">{item.short}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <form id="reg-form" className="reg-card" noValidate onSubmit={handleFormSubmit}>
          <p className="reg-required-note">
            Fields marked <span className="reg-req">*</span> are required.
          </p>

          {/* ---------- Step 1: Personal information ---------- */}
          <section className="reg-step" hidden={step !== 0} aria-labelledby="reg-h-personal">
            <h2 id="reg-h-personal">Personal information</h2>
            <div className="reg-grid">
              <Input name="full_name" label="Full name" required value={values.full_name} onChange={setValue} error={errors.full_name} autoComplete="name" maxLength={100} className="reg-span-2" />
              <Input name="date_of_birth" label="Date of birth" required type="date" min="1900-01-01" max={today} value={values.date_of_birth} onChange={setValue} error={errors.date_of_birth} autoComplete="bday" />
              <Input name="gender" label="Gender" as="select" value={values.gender} onChange={setValue} error={errors.gender}>
                <option value="">Select (optional)</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
              <Input name="phone_number" label="Phone number" required type="tel" inputMode="tel" value={values.phone_number} onChange={setValue} error={errors.phone_number} autoComplete="tel" placeholder="08012345678" maxLength={20} />
              <Input name="whatsapp_number" label="WhatsApp number" required type="tel" inputMode="tel" value={values.whatsapp_number} onChange={setValue} error={errors.whatsapp_number} placeholder="08012345678" maxLength={20} />
              <Input name="email" label="Email address" type="email" inputMode="email" value={values.email} onChange={setValue} error={errors.email} autoComplete="email" maxLength={100} className="reg-span-2" />
              <Input name="home_address" label="Home address" required as="textarea" rows="2" value={values.home_address} onChange={setValue} error={errors.home_address} autoComplete="street-address" maxLength={250} className="reg-span-2" />
              <Input name="town_city" label="Town or city" required value={values.town_city} onChange={setValue} error={errors.town_city} autoComplete="address-level2" maxLength={80} />
              <Input name="state" label="State" required as="select" value={values.state} onChange={setValue} error={errors.state}>
                <option value="">Select your state</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Input>
              <p className="reg-info reg-span-2">
                <strong>Passport photograph:</strong> you don't upload it here. After you send your registration on
                WhatsApp, send a clear, recent passport photograph in the same chat.
              </p>
            </div>
          </section>

          {/* ---------- Step 2: Training details ---------- */}
          <section className="reg-step" hidden={step !== 1} aria-labelledby="reg-h-training">
            <h2 id="reg-h-training">Training details</h2>
            <ChoiceGroup
              name="preferred_batch"
              legend="Choose your batch"
              required
              variant="card"
              value={values.preferred_batch}
              onChange={setValue}
              options={batchOptions}
              error={errors.preferred_batch}
            />
            <ChoiceGroup
              name="baking_experience"
              legend="Previous baking experience"
              required
              variant="chip"
              value={values.baking_experience}
              onChange={setValue}
              options={EXPERIENCE_OPTIONS.map((option) => ({ value: option, title: option }))}
              error={errors.baking_experience}
            />
            <Input
              name="skill_to_learn"
              label="What is the main skill you want to learn?"
              required
              as="textarea"
              rows="3"
              maxLength={300}
              value={values.skill_to_learn}
              onChange={setValue}
              error={errors.skill_to_learn}
              hint="For example: small chops, meat pies, doughnuts, cakes, puff-puff, or other snacks and pastries."
            />
          </section>

          {/* ---------- Step 3: Payment information ---------- */}
          <section className="reg-step" hidden={step !== 2} aria-labelledby="reg-h-payment">
            <h2 id="reg-h-payment">Payment information</h2>

            <div className="reg-fee">
              <span>Training fee</span>
              <strong>{registration.feeDisplay}</strong>
            </div>

            <div className="reg-bank">
              {registration.bank.isDemo && (
                <p className="reg-bank__demo" role="note">
                  DEMO BANK DETAILS — NOT VALID FOR PAYMENT. Replace these details before publishing.
                </p>
              )}
              <dl>
                <div>
                  <dt>Bank name</dt>
                  <dd>{registration.bank.bankName}</dd>
                </div>
                <div>
                  <dt>Account name</dt>
                  <dd>{registration.bank.accountName}</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd className="reg-bank__number">{registration.bank.accountNumber}</dd>
                </div>
              </dl>
            </div>

            <ChoiceGroup
              name="payment_status"
              legend="Payment status"
              required
              variant="card"
              value={values.payment_status}
              onChange={setValue}
              options={[
                { value: PAYMENT_NOT_PAID, title: PAYMENT_NOT_PAID, description: 'I will pay later' },
                { value: PAYMENT_MADE, title: PAYMENT_MADE, description: 'I have already paid' },
              ]}
              error={errors.payment_status}
            />

            {paymentMade ? (
              <div className="reg-grid">
                <Input name="amount_paid" label="Amount paid (₦)" required type="number" inputMode="numeric" min="1" step="1" value={values.amount_paid} onChange={setValue} error={errors.amount_paid} placeholder="20000" />
                <Input name="payment_date" label="Date you made the payment" required type="date" value={values.payment_date} onChange={setValue} error={errors.payment_date} />
                <Input name="payment_method" label="Payment method" required as="select" value={values.payment_method} onChange={setValue} error={errors.payment_method}>
                  <option value="">Select a method</option>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </Input>
                <Input name="payment_reference" label="Payment reference or teller number" required value={values.payment_reference} onChange={setValue} error={errors.payment_reference} maxLength={80} />
                <p className="reg-info reg-span-2">
                  <strong>Payment receipt:</strong> you don't upload it here. After you send your registration on
                  WhatsApp, send a photo or screenshot of your receipt in the same chat. Payment is confirmed by{' '}
                  {business.name} after checking.
                </p>
              </div>
            ) : (
              <p className="reg-info">
                No payment details are needed right now. You can pay using the bank details above, then send your
                receipt to us on WhatsApp.
              </p>
            )}
          </section>

          {/* ---------- Step 4: Emergency contact ---------- */}
          <section className="reg-step" hidden={step !== 3} aria-labelledby="reg-h-emergency">
            <h2 id="reg-h-emergency">Emergency contact</h2>
            <div className="reg-grid">
              <Input name="emergency_contact_name" label="Emergency contact person's full name" required value={values.emergency_contact_name} onChange={setValue} error={errors.emergency_contact_name} maxLength={100} className="reg-span-2" />
              <Input name="emergency_relationship" label="Relationship to trainee" required value={values.emergency_relationship} onChange={setValue} error={errors.emergency_relationship} placeholder="e.g. Mother, Husband, Friend" maxLength={60} />
              <Input name="emergency_phone" label="Emergency contact phone number" required type="tel" inputMode="tel" value={values.emergency_phone} onChange={setValue} error={errors.emergency_phone} placeholder="08012345678" maxLength={20} />
              <Input name="alternative_phone" label="Alternative phone number" type="tel" inputMode="tel" value={values.alternative_phone} onChange={setValue} error={errors.alternative_phone} maxLength={20} />
            </div>
          </section>

          {/* ---------- Step 5: Declaration ---------- */}
          <section className="reg-step" hidden={step !== 4} aria-labelledby="reg-h-declaration">
            <h2 id="reg-h-declaration">Trainee declaration</h2>
            <blockquote className="reg-declaration">{DECLARATION_TEXT}</blockquote>

            <div className={`reg-field reg-check ${errors.trainee_declaration ? 'has-error' : ''}`}>
              <label className="reg-check__label">
                <input
                  type="checkbox"
                  name="trainee_declaration"
                  checked={values.trainee_declaration}
                  onChange={(event) => setValue('trainee_declaration', event.target.checked)}
                  aria-invalid={errors.trainee_declaration ? 'true' : undefined}
                  required
                />
                <span>
                  I have read and agree to the trainee's declaration.
                  <Req />
                </span>
              </label>
              {errors.trainee_declaration && (
                <p className="reg-error" role="alert">
                  {errors.trainee_declaration}
                </p>
              )}
            </div>

            <Input
              name="typed_acknowledgement"
              label="Type your full name to acknowledge"
              required
              value={values.typed_acknowledgement}
              onChange={setValue}
              error={errors.typed_acknowledgement}
              hint="Type your name exactly as you entered it in Personal information."
              autoComplete="off"
              maxLength={100}
            />
          </section>

          {/* ---------- Step 6: Review & send ---------- */}
          <section className="reg-step" hidden={step !== 5} aria-labelledby="reg-h-review">
            <h2 id="reg-h-review">Review your details</h2>
            <p className="reg-info">
              Check everything below. When you press the button, WhatsApp opens with these details typed in — you must
              press <strong>Send</strong> there. Then send your passport photograph
              {paymentMade ? ' and payment receipt' : ''} in the same chat.
            </p>

            <p className="reg-info">
              {registrationNumber ? (
                <>
                  Your registration number: <strong>{registrationNumber}</strong>
                </>
              ) : (
                'Your registration number is generated when you press the button below, so it does not appear on this page yet.'
              )}
            </p>

            <div className="reg-review">
              <ReviewSection title="Personal information" onEdit={() => goToStep(0)}>
                <ReviewRow label="Full name" value={values.full_name} />
                <ReviewRow label="Date of birth" value={formatDate(values.date_of_birth)} />
                <ReviewRow label="Phone number" value={values.phone_number} />
                <ReviewRow label="WhatsApp number" value={values.whatsapp_number} />
                <ReviewRow label="Email" value={values.email} />
                <ReviewRow label="Gender" value={values.gender} />
                <ReviewRow label="Home address" value={values.home_address} />
                <ReviewRow label="Town or city" value={values.town_city} />
                <ReviewRow label="State" value={values.state} />
                <ReviewRow label="Passport photograph" value="Send it on WhatsApp after your registration" />
              </ReviewSection>

              <ReviewSection title="Training details" onEdit={() => goToStep(1)}>
                <ReviewRow label="Training" value={`${registration.trainingName} — ${registration.trainingDates}`} />
                <ReviewRow label="Batch" value={values.preferred_batch} />
                <ReviewRow label="Baking experience" value={values.baking_experience} />
                <ReviewRow label="Main skill to learn" value={values.skill_to_learn} />
              </ReviewSection>

              <ReviewSection title="Payment information" onEdit={() => goToStep(2)}>
                <ReviewRow label="Training fee" value={registration.feeDisplay} />
                <ReviewRow label="Payment status" value={values.payment_status} />
                {paymentMade && (
                  <>
                    <ReviewRow label="Amount paid" value={values.amount_paid ? `₦${Number(values.amount_paid).toLocaleString('en-NG')}` : ''} />
                    <ReviewRow label="Payment date" value={formatDate(values.payment_date)} />
                    <ReviewRow label="Payment method" value={values.payment_method} />
                    <ReviewRow label="Payment reference" value={values.payment_reference} />
                    <ReviewRow label="Payment receipt" value="Send it on WhatsApp after your registration" />
                  </>
                )}
              </ReviewSection>

              <ReviewSection title="Emergency contact" onEdit={() => goToStep(3)}>
                <ReviewRow label="Full name" value={values.emergency_contact_name} />
                <ReviewRow label="Relationship" value={values.emergency_relationship} />
                <ReviewRow label="Phone number" value={values.emergency_phone} />
                <ReviewRow label="Alternative phone" value={values.alternative_phone} />
              </ReviewSection>

              <ReviewSection title="Declaration" onEdit={() => goToStep(4)}>
                <ReviewRow label="Agreed to declaration" value={values.trainee_declaration ? 'Yes' : 'No'} />
                <ReviewRow label="Typed acknowledgement" value={values.typed_acknowledgement} />
              </ReviewSection>
            </div>
          </section>

          {isLastStep && submitError && (
            <div className="reg-alert" role="alert">
              <p>{submitError}</p>
            </div>
          )}

          {/* ---------- Navigation buttons ---------- */}
          <div className="reg-actions">
            {step > 0 && !isLastStep && (
              <button type="button" className="reg-btn reg-btn--outline" onClick={() => goToStep(step - 1)}>
                ← Back
              </button>
            )}
            {isLastStep && (
              <button
                type="button"
                className="reg-btn reg-btn--outline"
                onClick={() => goToStep(0)}
                disabled={isSubmitting}
              >
                ← Back to form
              </button>
            )}
            {!isLastStep ? (
              <button type="submit" className="reg-btn reg-btn--primary">
                Continue →
              </button>
            ) : (
              <button type="submit" className="reg-btn reg-btn--gold" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? 'GENERATING REGISTRATION NUMBER...' : 'SEND REGISTRATION ON WHATSAPP'}
              </button>
            )}
          </div>
        </form>

        <p className="reg-contact">
          Questions? Call <a href={registration.phones.primaryHref}>{registration.phones.primary}</a> or{' '}
          <a href={registration.phones.alternativeHref}>{registration.phones.alternative}</a>.
        </p>
      </main>
    </div>
  )
}

export default Registration