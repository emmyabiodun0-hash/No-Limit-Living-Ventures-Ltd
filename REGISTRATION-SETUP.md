# Training registration — what to copy and how to test

Copy these files into your existing project, keeping the same folders.
Nothing is deleted. Your `public/` media (videos, flyer, logo, photo) is not touched.

## NEW files (add)
- src/router.jsx
- src/components/Registration.jsx
- src/components/Registration.css
- src/components/FileUpload.jsx
- src/components/registrationLogic.js
- public/_redirects      (Netlify: makes /training/register work after deploy)
- vercel.json            (Vercel: same purpose; ignore if you don't use Vercel)

## CHANGED files (replace)
- src/siteData.js   -> adds the `registration` block (Formspree endpoint, fee,
                       batches, phones, DEMO bank details, upload limits)
- src/App.jsx       -> shows the registration page at /training/register
- src/components/Training.jsx -> the gold button now says REGISTER FOR TRAINING
                       and opens /training/register
- src/index.css     -> a small style for the "register via WhatsApp" link

## Earlier fixes (already sent before; replace only if you haven't yet)
- index.html, src/components/{About,Hero,Navbar,CompanyVideo,VideoPlayer}.jsx

## Where to change things
- Formspree endpoint, fee, batch times, phone numbers, upload size limits:
  src/siteData.js -> `registration`
- REAL bank details: src/siteData.js -> `registration.bank`
  (set `isDemo: false` to hide the red DEMO warning)

## Test it
1. npm run dev  ->  open the landing page, scroll to Training,
   press REGISTER FOR TRAINING (opens /training/register).
2. Try pressing Continue with empty fields to see the validation.
3. Upload a PDF as passport (rejected), then a JPG (preview appears).
4. Choose "Payment Made" to see the payment fields; "Not Paid Yet" hides them.
5. Review page -> SUBMIT REGISTRATION.
6. Check your Formspree dashboard -> the form's Submissions tab. Passport and
   receipt appear as downloadable files on each submission.

File uploads need a Formspree plan that includes them (Free plans do not).
If uploads are refused, the page shows an error and does NOT claim success.
