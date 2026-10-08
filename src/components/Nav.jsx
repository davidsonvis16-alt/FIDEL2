import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, contact } from '../data'

export function Bolt({ className = '' }) {
  return (
    <svg viewBox="0 0 40 28" aria-hidden="true" className={className}>
      <path d="M3 18 L22 4 L18 13 L37 9 L14 25 L19 15 Z" className="fill-sun stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 flex items-center gap-6 border-b px-4 py-4 backdrop-blur-md transition-colors sm:px-[4vw] xl:px-14 bg-paper/90 ${scrolled ? 'border-line' : 'border-transparent'}`}
    >
      <a href="#top" className="mr-auto flex items-center gap-2.5 no-underline" aria-label="Fidel Castrol, home">
        <Bolt className="w-[34px]" />
        <span className="flex flex-col leading-tight">
          <strong className="font-display text-[21px] font-extrabold tracking-tight [font-stretch:95%]">Fidel Castrol</strong>
          <small className="text-[10.5px] uppercase tracking-[.2em] text-ink-2">Student Success Coach</small>
        </span>
      </a>

      <nav className="hidden gap-8 md:flex" aria-label="Main">
        {nav.map((l) => (
          <a key={l.href} href={l.href} className="group relative py-1 text-[14.5px] font-medium no-underline">
            {l.label}
            <span className={`absolute inset-x-0 -bottom-0.5 h-[3px] origin-left bg-sun transition-transform duration-300 group-hover:scale-x-100 ${active === l.href ? 'scale-x-100' : 'scale-x-0'}`} />
          </a>
        ))}
      </nav>

      <a className="btn btn-sun hidden md:inline-flex" href={contact.whatsapp} target="_blank" rel="noopener">
        Book a Session <span className="arrow" aria-hidden="true">→</span>
      </a>

      <button
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <motion.span animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }} className="block h-0.5 w-6 bg-ink" />
        <motion.span animate={open ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }} className="block h-0.5 w-6 bg-ink" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-x-0 top-[73px] flex h-[calc(100dvh-73px)] flex-col bg-paper px-4 pt-4 md:hidden"
            aria-label="Mobile"
          >
            {nav.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-baseline justify-between border-b border-line py-3 font-display text-4xl font-extrabold no-underline [font-stretch:80%]"
              >
                {l.label}
                <span className="text-sm font-semibold text-muted">0{i + 1}</span>
              </motion.a>
            ))}
            <a className="btn btn-sun btn-lg mt-8" href={contact.whatsapp} target="_blank" rel="noopener">
              Book a Session <span className="arrow" aria-hidden="true">→</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
