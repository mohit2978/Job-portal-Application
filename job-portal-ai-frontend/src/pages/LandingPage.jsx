import Navbar      from "@/components/Navbar"
import Hero        from "@/components/Hero"
import HowItWorks  from "@/components/HowItWorks"
import Features    from "@/components/Features"
import Stats       from "@/components/Stats"
import CTA         from "@/components/CTA"
import Footer      from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
