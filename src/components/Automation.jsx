import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X, Maximize2 } from 'lucide-react'
import Reveal, { ease } from './Reveal'
import { flow, shots } from '../data'

const span = { wide: 'col-span-6 md:col-span-3', phone: 'col-span-3 md:col-span-2', photo: 'col-span-6 md:col-span-2' }

function Shot({ s, i, onOpen }) {
  const img = (
    <img
      src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy"
      className={`w-full transition-transform duration-500 group-hover:scale-[1.03] ${s.kind === 'phone' ? 'rounded-[18px] object-cover object-top' : 'rounded-[14px]'} ${s.kind === 'photo' ? 'aspect-video object-cover saturate-90 md:aspect-[3/4]' : ''}`}
    />
  )
  return (
    <Reveal as="figure" delay={(i % 3) * 0.1} className={span[s.kind]}>
      {s.noZoom ? (
        img
      ) : (
        <motion.button
          layoutId={`shot-${s.src}`}
          onClick={() => onOpen(s)}
          aria-label={`Enlarge: ${s.title}`}
          className={`group relative block w-full cursor-zoom-in overflow-hidden ${
            s.kind === 'phone'
              ? 'max-h-[560px] rounded-[22px] border-[6px] border-[#2a2a27] bg-white md:rounded-[28px] md:border-8'
              : 'rounded-[14px] border border-night-line'
          }`}
        >
          {img}
          <span className="absolute bottom-3 right-3 flex translate-y-1.5 items-center gap-1.5 rounded-full bg-sun px-2.5 py-1.5 text-xs font-semibold text-ink opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <Maximize2 size={12} /> Enlarge
          </span>
        </motion.button>
      )}
      <figcaption className="mt-3 text-sm text-[#A9A79F]">
        <b className="font-semibold text-white">{s.title}</b> — {s.caption}
      </figcaption>
    </Reveal>
  )
}

export default function Automation() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <section id="automation" className="mt-10 rounded-t-[28px] bg-night text-paper md:rounded-t-[40px]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-[4vw] md:py-[clamp(80px,10vw,140px)] xl:px-14">
        <Reveal className="mb-14 max-w-[640px]">
          <p className="kicker text-paper">HubSpot · Inbound lead funnel</p>
          <h2 className="h2">Sample automation<br />I recently built.</h2>
          <p className="max-w-[520px] text-lg text-[#A9A79F]">
            An inbound lead funnel for a digital marketing agency, built in HubSpot: a landing page captures the lead, a workflow welcomes them right away, waits two business days, then follows up with a nurture email.
          </p>
        </Reveal>

        {/* flow */}
        <ol aria-label="How the automation works" className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
          {flow.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.18 }}
              className={`relative rounded-[18px] border border-night-line p-6 ${f.wait ? 'border-dashed bg-transparent' : 'bg-night-2'}`}
            >
              <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.14em] ${f.wait ? 'border border-sun text-sun' : 'bg-sun text-ink'}`}>{f.tag}</span>
              <h3 className="mb-2 mt-3.5 text-[22px] font-bold text-white">{f.title}</h3>
              <p className="text-[14.5px] text-[#B5B3AA]">{f.text}</p>
              {i < flow.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.18 }}
                  className={`absolute z-10 grid h-[26px] w-[26px] place-items-center rounded-full bg-sun text-ink
                    left-1/2 -bottom-[19px] -translate-x-1/2 rotate-90
                    sm:left-auto sm:-right-[17px] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0
                    ${i === 1 ? 'sm:hidden lg:grid' : ''}`}
                >
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.span>
              )}
            </motion.li>
          ))}
        </ol>

        {/* screenshots */}
        <div className="grid grid-cols-6 items-start gap-4 md:gap-[22px]">
          {shots.map((s, i) => <Shot key={s.src} s={s} i={i} onOpen={setOpen} />)}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(10,10,9,.92)] p-6"
            role="dialog" aria-modal="true" aria-label={open.title}
          >
            <button autoFocus onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-4 grid h-[46px] w-[46px] place-items-center rounded-full bg-sun text-ink">
              <X size={22} />
            </button>
            <motion.img
              layoutId={`shot-${open.src}`}
              src={open.src} alt={open.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[min(1200px,100%)] rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
