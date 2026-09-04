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
