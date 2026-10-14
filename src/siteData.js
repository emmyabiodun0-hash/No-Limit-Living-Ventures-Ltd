// ------------------------------------------------------------------
// Central place for business info + image URLs.
//
// The images below are placeholder stock photography (from
// picsum.photos) so the site works and looks right immediately.
// Replace each URL with your own photography whenever you're ready —
// nothing else in the codebase needs to change.
//
// Your logo and personal photo are served separately from /public
// (see logo.png and mypic.png).
// ------------------------------------------------------------------

export const business = {
  name: 'No Limit Living Ventures Ltd',
  phoneDisplay: '0803 442 6923',
  phoneRaw: '08034426923',
  phoneHref: 'tel:+2348034426923',
  whatsappNumber: '2348034426923',
  whatsappMessage:
    'Hello No Limit Living Ventures Ltd, I would like to make an enquiry about your catering and cake services.',
  email: 'nolimitlivingventureslimited@gmail.com',
}

export const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  business.whatsappMessage,
)}`

export const images = {
  heroCake: 'https://i.pinimg.com/736x/fa/37/74/fa3774b5d41b692a5113ec8d7a3aab9a.jpg',
  heroFoodSpread: 'https://i.pinimg.com/736x/58/73/51/587351f5428e60c70a0de5b0d8c4915f.jpg',

  serviceCustomCake: 'https://i.pinimg.com/1200x/dc/61/45/dc6145a20f1963ed565973c3ffbe215f.jpg',
  serviceWeddingCake: 'https://i.pinimg.com/736x/79/d3/f9/79d3f9dcd3db97ec61369b38b0ba0e82.jpg',
  serviceBirthdayCake: 'https://i.pinimg.com/736x/51/58/41/5158419f759c20a73b46d378d04afe43.jpg',
  servicePastries: 'https://i.pinimg.com/736x/cf/32/c6/cf32c6d91c7b69dcf11307cd7f5d3235.jpg',
  serviceEventCatering: 'https://i.pinimg.com/1200x/54/88/db/5488db13248711be669f43d31c41e7cb.jpg',
  serviceWeddingCatering: 'https://i.pinimg.com/1200x/5f/5d/65/5f5d6521db3317ba7ae6ffb519219d94.jpg',
  serviceNamingCeremony: 'https://i.pinimg.com/1200x/06/11/f4/0611f49a1ed9553af7a93dc800101a80.jpg',
  servicePartyCatering: 'https://i.pinimg.com/736x/58/73/51/587351f5428e60c70a0de5b0d8c4915f.jpg',
  serviceCorporateCatering: 'https://i.pinimg.com/736x/43/eb/49/43eb4998ff27d505b378ede5f6e0eba2.jpg',

  cakeBirthday: 'https://i.pinimg.com/1200x/dc/61/45/dc6145a20f1963ed565973c3ffbe215f.jpg',
  cakeWedding: 'https://i.pinimg.com/736x/79/d3/f9/79d3f9dcd3db97ec61369b38b0ba0e82.jpg',
  cakeAnniversary: 'https://i.pinimg.com/736x/ef/f5/81/eff581de14a194a5771d9c6f76d8fe55.jpg',
  cakeCelebration: 'https://i.pinimg.com/736x/c7/8c/cd/c78ccdbc7ab9bf13e8692c96566b9c3e.jpg',
  cakeCustom: 'https://i.pinimg.com/736x/c5/47/13/c54713d2b238756adefb25caff85e16c.jpg',
  cakeCupcakes: 'https://i.pinimg.com/736x/f7/02/79/f70279b0e41a921f5871d10fcb7aa0b8.jpg',

  cateringCooking: 'https://i.pinimg.com/736x/f3/55/4d/f3554db2ffe496c5cce1af380afb9c04.jpg',
  cateringBuffet: 'https://i.pinimg.com/736x/3a/68/09/3a6809cd9774eacf7a5b71c0a019bd90.jpg',

  galleryOne: 'https://i.pinimg.com/1200x/4c/87/06/4c87060c60731d080d04e1a02836b7cf.jpg',
  galleryTwo: 'https://i.pinimg.com/736x/06/29/3e/06293eed950e06932c840c194fb1adf4.jpg',
  galleryThree: 'https://i.pinimg.com/736x/f0/e0/0d/f0e00d183817ea308de9b2b47de35e5c.jpg',
  galleryFour: 'https://i.pinimg.com/736x/23/ca/6f/23ca6f6505f2fe9122b52a6eb133e8ca.jpg',
  galleryFive: 'https://i.pinimg.com/736x/f7/02/79/f70279b0e41a921f5871d10fcb7aa0b8.jpg',
  gallerySix: 'https://i.pinimg.com/1200x/31/7b/f2/317bf2b3b21b2e884abb44bebc9eadc3.jpg',
}

// ------------------------------------------------------------------
// Your own media files (served from the /public folder).
// If a filename or extension differs, change it here — nothing else.
// ------------------------------------------------------------------
export const media = {
  trainingVideo: '/videos/training-advert.mp4',
  companyVideo: '/videos/company-introduction.mp4',
  // Your flyer's real filename has spaces, so it is URL-encoded here.
  trainingFlyer: `/flyers/${encodeURIComponent('WhatsApp Image 2026-10-12 at 07.59.33.jpeg')}`,
}

export const training = {
  company: 'No Limit Living Ventures Ltd.',
  programme: '3-Day Live & Direct Snacks and Pastries Training',
  dates: 'November 12–14, 2026',
  firstBatch: '9 AM – 1 PM',
  secondBatch: '1 PM – 5 PM',
  registerMessage:
    'Hello No Limit Living Ventures Ltd., I watched your Snacks and Pastries Training advertisement and would like to register for the training from November 12–14, 2026. Please send me the registration details.',
}

export const trainingRegisterLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  training.registerMessage,
)}`

// ------------------------------------------------------------------
// Training registration (page: /training/register)
// Everything the registration form needs lives here, in one place.
// ------------------------------------------------------------------
export const registration = {
  // The ONLY place the Formspree endpoint is written.
  formspreeEndpoint: 'https://formspree.io/f/xzedjdwl',

  trainingName: training.programme,
  trainingDates: training.dates,
  fee: 20000,
  feeDisplay: '₦20,000',

  batches: [
    { label: 'Batch 1', time: '9:00 AM–1:00 PM' },
    { label: 'Batch 2', time: '1:00 PM–5:00 PM' },
  ],

  phones: {
    primary: business.phoneRaw, // 08034426923
    primaryHref: business.phoneHref,
    alternative: '08145479336',
    alternativeHref: 'tel:+2348145479336',
  },

  // DEMO details — replace before publishing, then set isDemo to false
  // to hide the warning banner on the form.
  bank: {
    isDemo: true,
    bankName: 'Example Bank',
    accountName: 'NO LIMIT LIVING VENTURES LTD.',
    accountNumber: '0000000000',
  },

  // Upload rules (checked in the browser before anything is sent).
  // Formspree itself allows up to 25 MB per file; these are lower on purpose.
  files: {
    passport: {
      maxMB: 5,
      types: ['image/jpeg', 'image/png', 'image/webp'],
      extensions: ['jpg', 'jpeg', 'png', 'webp'],
      readable: 'JPG, JPEG, PNG or WEBP',
    },
    receipt: {
      maxMB: 5,
      types: ['image/jpeg', 'image/png', 'application/pdf'],
      extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      readable: 'JPG, JPEG, PNG or PDF',
    },
  },

  // Opens WhatsApp after a successful submission. Contains NO personal
  // details and no file contents.
  whatsappMessage: `Hello No Limit Living Ventures Ltd., I have just submitted my registration for the ${training.programme} (${training.dates}). I can provide my registration details if needed.`,
}

export const registrationWhatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  registration.whatsappMessage,
)}`

export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
]
