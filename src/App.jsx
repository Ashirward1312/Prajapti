import HeroSection from './Pages/Hero/Hero'
import Header from './Pages/Header/Header'
import Services from './Pages/Services/Services'
import About from './Pages/About/About'
import Why from './Pages/Why/Why'
import Faq from './Pages/Faq/Faq'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Services />
      <Why />
      <About />
      <Faq />
    </div>
  )
}

export default App