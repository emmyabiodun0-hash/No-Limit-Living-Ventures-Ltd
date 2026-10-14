import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import CompanyVideo from './components/CompanyVideo'
import Training from './components/Training'
import Services from './components/Services'
import Cakes from './components/Cakes'
import Catering from './components/Catering'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Map from './components/Map'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import Registration from './components/Registration'
import { usePathname } from './router'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CompanyVideo />
        <Training />
        <Services />
        <Cakes />
        <Catering />
        <Gallery />
        <Booking />
        <Contact />
        <Map />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const pathname = usePathname()

  return (
    <>
      {pathname === '/training/register' ? <Registration /> : <LandingPage />}
      <WhatsAppButton />
    </>
  )
}

export default App
