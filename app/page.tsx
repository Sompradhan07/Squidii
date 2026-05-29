import LenisProvider from '@/components/providers/LenisProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import HowItWorks from '@/components/sections/HowItWorks'
import Features from '@/components/sections/Features'
import SurveyIntro from '@/components/sections/SurveyIntro'
import Survey from '@/components/Survey'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <LenisProvider>
      {/* Subtle film grain — very light for premium feel */}
      <div className="grain-overlay" aria-hidden />

      {/* Fixed navbar */}
      <Navbar />

      <main>
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — The Problem */}
        <Problem />

        {/* 03 — The Solution */}
        <Solution />

        {/* 04 — How It Works */}
        <HowItWorks />

        {/* 05 — Features */}
        <Features />

        {/* 06 — Survey Intro CTA */}
        <SurveyIntro />

        {/* 07 — 11-Question Survey */}
        <Survey />
      </main>

      {/* Footer */}
      <Footer />
    </LenisProvider>
  )
}
