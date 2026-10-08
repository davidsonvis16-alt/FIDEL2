import { lazy, Suspense, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Maximize2 } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { flow, shots, type Shot } from '@/data'

const span: Record<Shot['kind'], string> = {
  wide: 'col-span-6 md:col-span-3',
  phone: 'col-span-3 md:col-span-2',
  photo: 'col-span-6 md:col-span-2',
}

const ShotLightbox = lazy(() => import('@/components/ShotLightbox'))

function ShotCard({ s, i, onOpen }: { s: Shot; i: number; onOpen: () => void }) {
  return (
    <Reveal as="figure" delay={(i % 3) * 0.1} className={span[s.kind]}>
      <button
        onClick={onOpen}
        aria-label={`Enlarge: ${s.title}`}
        className={cn(
          'group relative block w-full cursor-zoom-in overflow-hidden',
          s.kind === 'phone'
            ? 'max-h-[560px] rounded-[22px] border-[6px] border-[#2a2a27] bg-white md:rounded-[28px] md:border-8'
            : 'border-night-line rounded-[14px] border',
        )}
      >
        <img
          src={s.src}
          alt={s.alt}
          width={s.w}
          height={s.h}
          loading="lazy"
          decoding="async"
          className={cn(
            'w-full transition-transform duration-500 group-hover:scale-[1.03]',
            s.kind === 'phone' ? 'rounded-[16px] object-cover object-top' : 'rounded-[13px]',
            s.kind === 'photo' && 'aspect-video object-cover saturate-90 md:aspect-[3/4]',
          )}
        />
        <span className="bg-sun text-ink absolute right-3 bottom-3 flex translate-y-1.5 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <Maximize2 size={12} /> Enlarge
        </span>
      </button>
      <figcaption className="mt-3 text-sm text-[#A9A79F]">
        <b className="font-semibold text-white">{s.title}</b> — {s.caption}
      </figcaption>
    </Reveal>
  )
}

export default function Automation() {
  const [index, setIndex] = useState(-1)

  return (
    <section id="automation" className="bg-night text-paper mt-10 rounded-t-[28px] md:rounded-t-[40px]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-[4vw] md:py-[clamp(80px,10vw,140px)] xl:px-14">
        <Reveal className="mb-14 max-w-[640px]">
          <p className="kicker text-paper">HubSpot · Inbound lead funnel</p>
          <h2 className="h2">
            Sample automation
            <br />I recently built.
          </h2>
          <p className="max-w-[520px] text-lg text-[#A9A79F]">
            An inbound lead funnel for a digital marketing agency, built in HubSpot: a landing page captures
            the lead, a workflow welcomes them right away, waits two business days, then follows up with a
            nurture email.
          </p>
        </Reveal>

        <ol
          aria-label="How the automation works"
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]"
        >
          {flow.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.18 }}
              className={cn(
                'border-night-line relative rounded-[18px] border p-6',
                f.wait ? 'border-dashed bg-transparent' : 'bg-night-2',
              )}
            >
              <span
                className={cn(
                  'inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[.14em] uppercase',
                  f.wait ? 'border-sun text-sun border' : 'bg-sun text-ink',
                )}
              >
                {f.tag}
              </span>
              <h3 className="mt-3.5 mb-2 text-[22px] font-bold text-white">{f.title}</h3>
              <p className="text-[14.5px] text-[#B5B3AA]">{f.text}</p>
              {i < flow.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.3 + i * 0.18 }}
                  className={cn(
                    'bg-sun text-ink absolute -bottom-[19px] left-[calc(50%-13px)] z-10 grid h-[26px] w-[26px] rotate-90 place-items-center rounded-full',
                    'sm:top-[calc(50%-13px)] sm:-right-[17px] sm:bottom-auto sm:left-auto sm:rotate-0',
                    i === 1 && 'sm:hidden lg:grid',
                  )}
                >
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.span>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="grid grid-cols-6 items-start gap-4 md:gap-[22px]">
          {shots.map((s, i) => (
            <ShotCard key={s.src} s={s} i={i} onOpen={() => setIndex(i)} />
          ))}
        </div>
      </div>

      {index >= 0 && (
        <Suspense fallback={null}>
          <ShotLightbox index={index} onClose={() => setIndex(-1)} />
        </Suspense>
      )}
    </section>
  )
}
