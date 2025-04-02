import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </main>
  )
}
