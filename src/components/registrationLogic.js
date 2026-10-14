// Pure logic for the registration form: validation and the WhatsApp message.
// Kept free of React so it is easy to test.
import { business, registration } from '../siteData'

export const STEPS = [
  { id: 'personal', title: 'Personal information', short: 'Personal' },
  { id: 'training', title: 'Training details', short: 'Training' },
  { id: 'payment', title: 'Payment information', short: 'Payment' },
  { id: 'emergency', title: 'Emergency contact', short: 'Emergency' },
  { id: 'declaration', title: 'Trainee declaration', short: 'Declaration' },
  { id: 'review', title: 'Review & send', short: 'Review' },
]

export const PAYMENT_NOT_PAID = 'Not Paid Yet'
export const PAYMENT_MADE = 'Payment Made'

export const initialValues = {
  full_name: '',
  date_of_birth: '',
  phone_number: '',
  whatsapp_number: '',
  email: '',
  gender: '',
  home_address: '',
  town_city: '',
  state: '',
  preferred_batch: '',
  baking_experience: '',
  skill_to_learn: '',
  payment_status: PAYMENT_NOT_PAID,
  amount_paid: '',
  payment_date: '',
  payment_method: '',
  payment_reference: '',
  emergency_contact_name: '',
  emergency_relationship: '',
  emergency_phone: '',
  alternative_phone: '',
  trainee_declaration: false,
  typed_acknowledgement: '',
}

// Which step each field lives on (used to jump to the first step with an error).
export const FIELD_STEP = {
  full_name: 'personal',
  date_of_birth: 'personal',
  phone_number: 'personal',
  whatsapp_number: 'personal',
  email: 'personal',
  gender: 'personal',
  home_address: 'personal',
  town_city: 'personal',
  state: 'personal',
  preferred_batch: 'training',
  baking_experience: 'training',
  skill_to_learn: 'training',
  payment_status: 'payment',
  amount_paid: 'payment',
  payment_date: 'payment',
  payment_method: 'payment',
  payment_reference: 'payment',
  emergency_contact_name: 'emergency',
  emergency_relationship: 'emergency',
  emergency_phone: 'emergency',
  alternative_phone: 'emergency',
  trainee_declaration: 'declaration',
  typed_acknowledgement: 'declaration',
}

export function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().split('T')[0]
}

const PHONE_RE = /^\+?\d{10,15}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidPhone(value) {
  return PHONE_RE.test(String(value).replace(/[\s\-().]/g, ''))
}

export function normalizeName(value) {
  return String(value).trim().replace(/\s+/g, ' ').toLowerCase()
}

const text = (value) => String(value ?? '').trim()

// "1995-04-12" -> "12 April 1995" (no time-zone surprises)
export function formatDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text(iso))
  if (!match) return text(iso)
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function validators(stepId, values) {
  const e = {}

  if (stepId === 'personal') {
    if (text(values.full_name).length < 3) e.full_name = 'Please enter your full name.'

    if (!values.date_of_birth) e.date_of_birth = 'Please enter your date of birth.'
    else if (values.date_of_birth > todayISO()) e.date_of_birth = 'Date of birth cannot be in the future.'
    else if (values.date_of_birth < '1900-01-01') e.date_of_birth = 'Please enter a valid date of birth.'

    if (!text(values.phone_number)) e.phone_number = 'Please enter your phone number.'
    else if (!isValidPhone(values.phone_number)) e.phone_number = 'Enter a valid phone number, e.g. 08012345678.'

    if (!text(values.whatsapp_number)) e.whatsapp_number = 'Please enter your WhatsApp number.'
    else if (!isValidPhone(values.whatsapp_number)) e.whatsapp_number = 'Enter a valid WhatsApp number, e.g. 08012345678.'

    if (text(values.email) && !EMAIL_RE.test(text(values.email))) e.email = 'Enter a valid email address, or leave it blank.'

    if (text(values.home_address).length < 5) e.home_address = 'Please enter your home address.'
    if (!text(values.town_city)) e.town_city = 'Please enter your town or city.'
    if (!values.state) e.state = 'Please select your state.'
  }

  if (stepId === 'training') {
    if (!values.preferred_batch) e.preferred_batch = 'Please choose a batch.'
    if (!values.baking_experience) e.baking_experience = 'Please select your baking experience.'
    if (text(values.skill_to_learn).length < 3) e.skill_to_learn = 'Please tell us the main skill you want to learn.'
  }

  if (stepId === 'payment') {
    if (![PAYMENT_NOT_PAID, PAYMENT_MADE].includes(values.payment_status)) {
      e.payment_status = 'Please choose a payment status.'
    }
    if (values.payment_status === PAYMENT_MADE) {
      const amount = Number(values.amount_paid)
      if (!text(values.amount_paid) || !Number.isFinite(amount) || amount <= 0) {
        e.amount_paid = 'Enter the amount you paid, e.g. 20000.'
      }
      if (!values.payment_date) e.payment_date = 'Please choose the date you made the payment.'
      if (!values.payment_method) e.payment_method = 'Please choose a payment method.'
      if (!text(values.payment_reference)) e.payment_reference = 'Enter the payment reference or teller number.'
    }
  }

  if (stepId === 'emergency') {
    if (text(values.emergency_contact_name).length < 3) e.emergency_contact_name = "Please enter the emergency contact's full name."
    if (!text(values.emergency_relationship)) e.emergency_relationship = 'Please enter their relationship to you.'
    if (!text(values.emergency_phone)) e.emergency_phone = "Please enter the emergency contact's phone number."
    else if (!isValidPhone(values.emergency_phone)) e.emergency_phone = 'Enter a valid phone number, e.g. 08012345678.'
    if (text(values.alternative_phone) && !isValidPhone(values.alternative_phone)) {
      e.alternative_phone = 'Enter a valid phone number, or leave it blank.'
    }
  }

  if (stepId === 'declaration') {
    if (!values.trainee_declaration) e.trainee_declaration = "Please tick the box to agree to the trainee's declaration."
    if (!text(values.typed_acknowledgement)) {
      e.typed_acknowledgement = 'Please type your full name to acknowledge the declaration.'
    } else if (normalizeName(values.typed_acknowledgement) !== normalizeName(values.full_name)) {
      e.typed_acknowledgement = 'This must match the full name you entered in Personal information.'
    }
  }

  return e
}

export function validateStep(stepId, values) {
  return validators(stepId, values)
}

export function validateAll(values) {
  return STEPS.reduce((all, step) => ({ ...all, ...validators(step.id, values) }), {})
}

// The registration as a WhatsApp message. Only typed details go in here —
// the passport photograph and receipt are sent by the trainee as attachments.
export function buildWhatsAppMessage(values) {
  const paid = values.payment_status === PAYMENT_MADE
  const lines = []
  const add = (label, value) => {
    if (text(value)) lines.push(`${label}: ${text(value)}`)
  }

  lines.push('*TRAINING REGISTRATION*')
  lines.push(`Training: ${registration.trainingName}`)
  lines.push(`Dates: ${registration.trainingDates}`)
  lines.push(`Fee: ${registration.feeDisplay}`)

  lines.push('', '*PERSONAL INFORMATION*')
  add('Full name', values.full_name)
  add('Date of birth', formatDate(values.date_of_birth))
  add('Phone number', values.phone_number)
  add('WhatsApp number', values.whatsapp_number)
  add('Email', values.email)
  add('Gender', values.gender)
  add('Home address', values.home_address)
  add('Town/City', values.town_city)
  add('State', values.state)

  lines.push('', '*TRAINING DETAILS*')
  add('Batch', values.preferred_batch)
  add('Baking experience', values.baking_experience)
  add('Main skill to learn', values.skill_to_learn)

  lines.push('', '*PAYMENT*')
  add('Payment status', values.payment_status)
  if (paid) {
    add('Amount paid', `₦${Number(values.amount_paid).toLocaleString('en-NG')}`)
    add('Payment date', formatDate(values.payment_date))
    add('Payment method', values.payment_method)
    add('Payment reference', values.payment_reference)
  }

  lines.push('', '*EMERGENCY CONTACT*')
  add('Name', values.emergency_contact_name)
  add('Relationship', values.emergency_relationship)
  add('Phone number', values.emergency_phone)
  add('Alternative phone', values.alternative_phone)

  lines.push('', '*DECLARATION*')
  lines.push('I have read and agree to the trainee\'s declaration.')
  add('Typed name', values.typed_acknowledgement)

  lines.push(
    '',
    paid
      ? "I'm sending my passport photograph and payment receipt in this chat now."
      : "I'm sending my passport photograph in this chat now.",
  )

  return lines.join('\n')
}

export function buildWhatsAppUrl(values) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(values))}`
}
