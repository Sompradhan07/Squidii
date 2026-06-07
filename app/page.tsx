import LenisProvider from '@/components/providers/LenisProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/sections/Problem'
import Solution from '@/components/sections/Solution'
import WhoItsFor from '@/components/sections/WhoItsFor'
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

        {/* 03 — What Nura Does */}
        <Solution />

        {/* 04 — Who It's For */}
        <WhoItsFor />

        {/* 05 — Shape Nura (Survey Intro CTA) */}
        <SurveyIntro />

        {/* 06 — 11-Question Survey */}
        <Survey />
      </main>

      {/* Footer */}
      <Footer />
    </LenisProvider>
  )
}
