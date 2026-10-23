import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/cn'
import { nav, contact } from '@/data'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" aria-hidden="true" className={className}>
      <path d="M10 14 V20.5 Q20 25.5 30 20.5 V14 L20 18 Z" className="fill-sun stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 3 L38 10 L20 17 L2 10 Z" className="fill-sun stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 10 L34 11.5 V19" className="fill-none stroke-ink" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="20.5" r="1.8" className="fill-ink" />
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
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  const lenis = useLenis()
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  return (
    <header
      id="top"
      className={cn(
        'bg-paper/90 sticky top-0 z-50 flex items-center gap-6 border-b px-4 py-4 backdrop-blur-md transition-colors sm:px-[4vw] xl:px-14',
        scrolled ? 'border-line' : 'border-transparent',
      )}
    >
      <a
        href="#top"
        className="mr-auto flex items-center gap-2.5 no-underline"
        aria-label="Fidel Castrol, home"
      >
        <Logo className="w-[38px]" />
        <span className="flex flex-col leading-tight">
          <strong className="font-display text-[21px] font-extrabold tracking-tight [font-stretch:95%]">
            Fidel Castrol
          </strong>
          <small className="text-ink-2 text-[10.5px] tracking-[.2em] uppercase">Student Success Coach</small>
        </span>
      </a>

      <nav className="hidden gap-8 md:flex" aria-label="Main">
        {nav.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group relative py-1 text-[14.5px] font-medium no-underline"
          >
            {l.label}
            <span
              className={cn(
                'bg-sun absolute inset-x-0 -bottom-0.5 h-[3px] origin-left transition-transform duration-300 group-hover:scale-x-100',
                active === l.href ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </a>
        ))}
      </nav>

      <a className="btn btn-sun hidden md:inline-flex" href={contact.whatsapp} target="_blank" rel="noopener">
        Book a Session{' '}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </a>

      <button
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <motion.span
          animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }}
          className="bg-ink block h-0.5 w-6"
        />
        <motion.span
          animate={open ? { y: -4, rotate: -45 } : { y: 0, rotate: 0 }}
          className="bg-ink block h-0.5 w-6"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="bg-paper fixed inset-x-0 top-[73px] flex h-[calc(100dvh-73px)] flex-col px-4 pt-4 md:hidden"
            aria-label="Mobile"
            data-lenis-prevent
          >
            {nav.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="border-line font-display flex items-baseline justify-between border-b py-3 text-4xl font-extrabold [font-stretch:80%] no-underline"
              >
                {l.label}
                <span className="text-muted text-sm font-semibold">0{i + 1}</span>
              </motion.a>
            ))}
            <a className="btn btn-sun btn-lg mt-8" href={contact.whatsapp} target="_blank" rel="noopener">
              Book a Session{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
