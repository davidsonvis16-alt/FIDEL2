import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import { Ticker, Services, Numbers, About, Skills } from '@/components/Sections'
import Automation from '@/components/Automation'
import Contact from '@/components/Contact'

export default function App() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ReactLenis root options={{ lerp: reduce ? 1 : 0.1, anchors: { offset: -72 } }}>
      <MotionConfig reducedMotion="user">
        <motion.div style={{ scaleX }} className="bg-sun fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />
        <Nav />
        <main>
          <Hero />
          <Ticker />
          <Services />
          <Numbers />
          <About />
          <Skills />
          <Automation />
          <Contact />
        </main>
      </MotionConfig>
    </ReactLenis>
  )
}
