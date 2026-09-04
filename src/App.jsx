import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Cakes from './components/Cakes'
import Catering from './components/Catering'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Map from './components/Map'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Cakes />
        <Catering />
        <Gallery />
        <Booking />
        <Contact />
        <Map />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
