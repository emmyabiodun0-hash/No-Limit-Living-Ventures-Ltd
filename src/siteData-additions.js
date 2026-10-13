// ---- APPEND THIS TO THE BOTTOM OF YOUR src/siteData.js ----
// ------------------------------------------------------------------
// Your own media files (served from the /public folder).
// If a filename or extension differs, change it here — nothing else.
// ------------------------------------------------------------------
export const media = {
  trainingVideo: '/videos/training-advert.mp4',
  companyVideo: '/videos/company-introduction.mp4',
  trainingFlyer: '/flyers/snacks-training.png',
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

export const trainingRegisterLink = `https://wa.me/2348034426923?text=${encodeURIComponent(
  training.registrationMessage
)}`;
