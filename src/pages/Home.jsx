import { useCallback, useEffect, useRef, useState } from 'react'
import BrandIntro from '../components/BrandIntro/BrandIntro'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Footer from '../components/layout/Footer'
import IvoryPanel from '../components/layout/IvoryPanel'
import ExpertiseSection from '../sections/Expertise/ExpertiseSection'
import AboutSection from '../sections/About/AboutSection'
import BusinessApproachSection from '../sections/BusinessApproach/BusinessApproachSection'
import WhatWeOfferSection from '../sections/WhatWeOffer/WhatWeOfferSection'
import ServicesSection from '../sections/Services/ServicesSection'
import IndustriesSection from '../sections/Industries/IndustriesSection'
import ProjectsSection from '../sections/Projects/ProjectsSection'
import ClientsSection from '../sections/Clients/ClientsSection'
import OverviewVideoSection from '../sections/OverviewVideo/OverviewVideoSection'
import TeamSection from '../sections/Team/TeamSection'
import QualitySection from '../sections/Quality/QualitySection'
import ReviewsSection from '../sections/Reviews/ReviewsSection'
import CareersFaqSection from '../sections/Careers/CareersFaqSection'
import LetsTalk from '../sections/Contact/LetsTalk'
import QuoteForm from '../sections/Contact/QuoteForm'
import LocationContact from '../sections/Contact/LocationContact'
import ScrollReveal from '../components/motion/ScrollReveal'

const INTRO_KEY = 'bs-intro-seen'

function HomeSection({ children }) {
  return (
    <ScrollReveal className="home-section-reveal" variant="up" amount={0.12}>
      {children}
    </ScrollReveal>
  )
}

// The intro plays once per browser session; add ?intro to the URL to see it again.
function shouldPlayIntro() {
  try {
    if (new URLSearchParams(window.location.search).has('intro')) return true
    return sessionStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}

/**
 * The home experience, in the approved order.
 *
 * The page is composed as four chapters rather than thirteen separate bands:
 * ink (expertise) → soft white (about, approach) → ink and graphite (offer,
 * services, industries, projects, clients, video) → soft white (team, reviews,
 * careers) → ink (the closing CTA, quote, contact and footer). The light
 * chapters open through IvoryPanel so each switch reads as one move.
 */
export default function Home() {
  const [playIntro] = useState(shouldPlayIntro)
  // 'intro' → logo reveal; 'handoff' → header and hero take over; 'done' → intro removed.
  const [phase, setPhase] = useState(playIntro ? 'intro' : 'done')
  const [logoFlying, setLogoFlying] = useState(false)
  const headerLogoRef = useRef(null)

  useEffect(() => {
    if (phase !== 'intro') return
    const root = document.documentElement
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    root.setAttribute('data-scroll-lock', '')
    return () => root.removeAttribute('data-scroll-lock')
  }, [phase])

  const handleExitStart = useCallback(({ flying }) => {
    setLogoFlying(flying)
    setPhase('handoff')
  }, [])

  const handleComplete = useCallback(() => {
    setLogoFlying(false)
    setPhase('done')
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage unavailable: the intro simply plays again next time */
    }
  }, [])

  const revealed = phase !== 'intro'

  return (
    <>
      {phase !== 'done' && (
        <BrandIntro targetRef={headerLogoRef} onExitStart={handleExitStart} onComplete={handleComplete} />
      )}
      <Header revealed={revealed} logoRef={headerLogoRef} logoHidden={phase === 'intro' || logoFlying} />

      <main id="main" tabIndex={-1}>
        <Hero started={revealed} />

        {/* 1 */}
        {/* <ExpertiseSection /> */}

        {/* 2–3: the light chapter */}
        <IvoryPanel>
          <HomeSection>
            <AboutSection />
          </HomeSection>
          <HomeSection>
            <BusinessApproachSection />
          </HomeSection>
        </IvoryPanel>

        {/* 4–9 */}
        <HomeSection><WhatWeOfferSection /></HomeSection>
        <HomeSection><ServicesSection /></HomeSection>
        <HomeSection><IndustriesSection /></HomeSection>
        <HomeSection><ProjectsSection /></HomeSection>
        <HomeSection><ClientsSection /></HomeSection>
        <HomeSection><OverviewVideoSection /></HomeSection>

        {/* 10–12: the second light chapter */}
        <IvoryPanel>
          <HomeSection><TeamSection /></HomeSection>
          <HomeSection><QualitySection /></HomeSection>
          <HomeSection><ReviewsSection /></HomeSection>
          <HomeSection><CareersFaqSection /></HomeSection>
        </IvoryPanel>

        {/* 13 */}
        <HomeSection><LetsTalk /></HomeSection>
        <HomeSection><QuoteForm /></HomeSection>
        <HomeSection><LocationContact /></HomeSection>
      </main>

      <Footer />
    </>
  )
}
