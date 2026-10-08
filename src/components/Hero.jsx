import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ease } from './Reveal'

const lines = [
  { text: 'Better', cls: '' },
  { text: 'Students.', cls: 'pl-[.25em] sm:pl-[.5em]' },
  { text: 'Brighter', cls: 'stroke-text font-extrabold [font-stretch:62%]' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [photoOk, setPhotoOk] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80])
  const brushY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])

  const lineAnim = (i) => ({
    initial: { y: '105%' },
    animate: { y: 0 },
    transition: { duration: 0.9, ease, delay: 0.1 + i * 0.12 },
  })

  return (
    <section
      ref={ref}
      className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-5 px-4 pt-6 sm:px-[4vw] md:grid-cols-[1.25fr_.9fr] md:pt-10 md:min-h-[calc(100vh-76px)] xl:pl-[220px] xl:pr-14"
    >
      {/* left handwritten note — wide screens only */}
      <motion.p
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -14 }}
        animate={{ opacity: 1, rotate: -8 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-10 top-[44%] hidden font-hand text-[26px] leading-none xl:block"
      >
        Academic growth.<br />Personal growth.<br />Real results.
        <svg viewBox="0 0 80 50" className="ml-8 mt-2 block w-[70px] fill-none stroke-ink" strokeWidth="2" strokeLinecap="round">
          <motion.path d="M6 6 C 10 30, 30 42, 66 40" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 0.8 }} />
          <motion.path d="M56 32 L67 40 L56 47" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.3, duration: 0.3 }} />
        </svg>
      </motion.p>

      <div className="relative z-10 pb-8 pt-6 md:pb-[70px] md:pt-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-5 text-[13px] uppercase tracking-[.14em] text-ink-2"
        >
          Homa Bay, Kenya · Coaching in English &amp; Swahili
        </motion.p>

        <h1 className="font-display font-black leading-[.86] tracking-[-.035em] [font-stretch:78%] text-[clamp(64px,10.4vw,168px)]">
          {lines.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[.04em]">
              <motion.span {...lineAnim(i)} className={`block ${l.cls}`}>{l.text}</motion.span>
            </span>
          ))}
          <span className="block pb-[.04em]">
            <span className="relative inline-block overflow-visible pl-[.15em]">
              <span className="block overflow-hidden"><motion.span {...lineAnim(3)} className="block">Futures.</motion.span></span>
              <svg viewBox="0 0 600 170" preserveAspectRatio="none" aria-hidden="true" className="absolute -left-[6%] -top-[12%] -z-10 h-[128%] w-[112%] overflow-visible fill-none stroke-sun" strokeWidth="7" strokeLinecap="round">
                <motion.path
                  d="M70 40 C 200 6, 470 4, 560 46 C 625 80, 560 150, 330 158 C 140 165, 18 138, 22 96 C 26 60, 130 28, 300 22"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.9, duration: 1.4, ease: [0.6, 0.1, 0.2, 1] }}
                />
              </svg>
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease }}
          className="my-8 max-w-[470px] text-lg text-ink-2"
        >
          I’m Fidel Castrol, a Student Success Coach. I help students build better habits, smarter study strategies and the confidence to reach their goals — in school and in life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8, ease }}
          className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap"
        >
          <a className="btn btn-sun btn-lg" href="#contact">Book a Coaching Session <span className="arrow" aria-hidden="true">→</span></a>
          <a className="btn btn-ghost btn-lg" href="#about">Learn More</a>
        </motion.div>
      </div>

      {/* portrait */}
      <motion.figure
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease }}
        className="relative mx-auto flex w-full max-w-[440px] items-end justify-center self-stretch md:max-w-none md:min-h-[520px]"
      >
        <motion.div
          style={{ y: brushY }}
          aria-hidden="true"
          className="absolute -right-[10%] bottom-0 h-[78%] w-[95%] -rotate-3 bg-sun [clip-path:polygon(28%_4%,100%_0,100%_100%,0_100%,6%_70%,18%_40%)]"
        />
        <motion.div style={{ y: portraitY }} className="relative z-[1] w-full max-w-[520px]">
          {photoOk ? (
            <img
              src="/images/fidel.jpg"
              alt="Portrait of Fidel Castrol"
              width="900" height="1100"
              onError={() => setPhotoOk(false)}
              className="aspect-[9/11] max-h-[82vh] w-full rounded-t-[260px] bg-paper-2 object-cover object-top grayscale contrast-[1.08]"
            />
          ) : (
            <div aria-hidden="true" className="grid aspect-[9/11] w-full place-items-center rounded-t-[260px] bg-ink font-display text-[150px] font-black tracking-[-.04em] text-sun [font-stretch:70%]">
              FC
            </div>
          )}
        </motion.div>

        <motion.svg
          viewBox="0 0 70 46" aria-hidden="true"
          initial={{ opacity: 0, y: -20, rotate: -30 }} animate={{ opacity: 1, y: 0, rotate: -12 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 180, damping: 10 }}
          className="absolute left-[46%] top-[6%] z-[3] w-[76px] fill-none stroke-sun drop-shadow-[1px_1px_0_var(--color-ink)]"
          strokeWidth="3.5" strokeLinejoin="round"
        >
          <path d="M5 40 L9 10 L24 26 L35 4 L46 26 L61 10 L65 40 Z" />
        </motion.svg>

        <motion.p
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }} animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 12 }}
          whileHover={{ rotate: -4, scale: 1.05 }}
          className="absolute right-0 top-[4%] z-[3] rounded-md border-[1.5px] border-ink bg-paper px-3.5 pb-2.5 pt-1.5 font-hand text-[26px] leading-none shadow-[3px_3px_0_var(--color-ink)] md:top-[12%] md:text-4xl"
        >
          Your goals<br />matter.
        </motion.p>
      </motion.figure>

      <a href="#services" className="absolute bottom-6 left-14 z-[3] hidden flex-col items-center gap-2 text-[11px] uppercase tracking-[.2em] no-underline xl:flex" aria-label="Scroll to services">
        <span className="relative h-7 w-[18px] rounded-[10px] border-[1.5px] border-ink">
          <span className="animate-wheel absolute left-1/2 top-[5px] -ml-px h-1.5 w-0.5 rounded bg-ink" />
        </span>
        Scroll
      </a>
    </section>
  )
}
