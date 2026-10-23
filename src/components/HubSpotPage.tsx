import { lazy, Suspense, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight, Clock, Mail } from 'lucide-react'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { ease } from '@/lib/motion'
import { contact, flow, hubspotNav, learnSteps, shots, tracks, type Track } from '@/data'

const ShotLightbox = lazy(() => import('@/components/ShotLightbox'))

const wrap = 'mx-auto max-w-[1180px] px-4 sm:px-8'
const photo = shots.find((s) => s.kind === 'photo')!
const gallery = shots.filter((s) => s.kind !== 'photo')
const mail = `mailto:${contact.email}?subject=${encodeURIComponent('Learning HubSpot')}`

const stages = ['Curious', 'Learner', 'Practitioner', 'Specialist']
const stageNow = 1

const trackBg: Record<Track['color'], string> = {
  blush: 'bg-blush',
  mint: 'bg-mint',
  lilac: 'bg-lilac',
}

const h2 =
  'font-display text-[clamp(38px,5.6vw,76px)] leading-[.95] font-black tracking-[-.03em] [font-stretch:80%]'

/** Fidel's own HubSpot-style contact record. */
function RecordCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.9, ease, delay: 0.3 }}
      className="border-ink bg-cream w-full max-w-[440px] rounded-2xl border-2 p-6 shadow-[10px_10px_0_var(--color-ink)] md:justify-self-end"
    >
      <p className="text-ink/60 text-xs font-semibold tracking-[.16em] uppercase">Contact record</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="bg-forest font-display text-mint grid h-16 w-16 shrink-0 place-items-center rounded-full text-2xl font-black">
          FC
        </span>
        <div>
          <p className="font-display text-2xl leading-tight font-extrabold">Fidel Castrol</p>
          <p className="text-ink-2 text-sm">Student success coach, now learning HubSpot</p>
        </div>
      </div>

      <div className="border-ink/15 mt-6 border-t pt-5">
        <p className="text-ink/60 text-xs font-semibold">Lifecycle stage</p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {stages.map((s, i) => (
            <div key={s}>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.12 }}
                className={cn('block h-2 origin-left rounded-full', i <= stageNow ? 'bg-tang' : 'bg-ink/10')}
              />
              <span className={cn('mt-1.5 block text-[11px]', i === stageNow ? 'font-bold' : 'text-ink/50')}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <dl className="mt-5 space-y-3 text-[15px]">
        {[
          [
            'Lead status',
            <span className="bg-mint rounded-full px-2.5 py-0.5 text-sm font-semibold">
              Open to study partners
            </span>,
          ],
          ['Based in', contact.location],
          ['Languages', 'English, Swahili'],
          [
            'Contact owner',
            <a href="#contact" className="text-tang font-bold underline-offset-4 hover:underline">
              Could be you →
            </a>,
          ],
        ].map(([k, v]) => (
          <div
            key={k as string}
            className="border-ink/10 flex items-center justify-between gap-4 border-b pb-3 last:border-0"
          >
            <dt className="text-ink/60">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="bg-tang relative overflow-hidden">
      <div
        className={cn(
          wrap,
          'grid grid-cols-1 items-center gap-14 pt-12 pb-20 md:grid-cols-[1.25fr_1fr] md:pt-20 md:pb-28',
        )}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink text-cream inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium"
          >
            <span className="bg-mint h-2 w-2 animate-pulse rounded-full" /> Taking on study partners
          </motion.p>
          <h1 className="font-display mt-7 text-[clamp(60px,9.6vw,140px)] leading-[.86] font-black tracking-[-.04em] [font-stretch:76%]">
            {['Learn', 'HubSpot', 'with Fidel.'].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[.05em]">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, ease, delay: 0.05 + i * 0.1 }}
                  className={cn('block', i === 2 && 'text-cream')}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="mt-8 max-w-[46ch] text-lg font-medium"
          >
            I’ve spent years coaching students to stay consistent. Now I’m training in HubSpot (CRM,
            pipelines, inbound, reporting), and the fastest way to learn it is together. Starting from zero?
            Good. So did I.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.65 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              className="btn btn-lg border-ink bg-ink text-cream hover:bg-forest hover:border-forest"
              href={contact.hubspotWhatsapp}
              target="_blank"
              rel="noopener"
            >
              Learn HubSpot with me{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="btn btn-ghost btn-lg" href="#tracks">
              See my pipeline <ArrowDown size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
        <RecordCard />
      </div>
    </section>
  )
}

function Pipeline() {
  return (
    <section id="tracks" className="bg-cream scroll-mt-20 py-20 md:py-28">
      <div className={wrap}>
        <Reveal className="grid grid-cols-1 items-end gap-6 md:grid-cols-[1.2fr_1fr]">
          <h2 className={h2}>
            My skills, as a <span className="text-tang">deal pipeline.</span>
          </h2>
          <p className="text-ink-2 text-lg">
            Pipelines are one of the things I’m training in, so here’s my own progress in one. I’m not
            certified yet. This board shows where I honestly am.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tracks.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1} className="bg-ink/[.04] flex flex-col rounded-2xl p-3">
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <p className="text-sm font-bold">{t.status}</p>
                <span className="bg-ink/10 rounded-full px-2 text-xs font-semibold">1</span>
              </div>
              <motion.article
                whileHover={{ y: -4, rotate: -0.6 }}
                className="border-ink flex-1 rounded-xl border-[1.5px] bg-white p-5 shadow-[4px_4px_0_var(--color-ink)]"
              >
                <span className={cn('block h-1.5 w-12 rounded-full', trackBg[t.color])} />
                <h3 className="mt-4 text-xl leading-tight font-bold">{t.title}</h3>
                <dl className="mt-5 space-y-4">
                  {t.points.map((p) => (
                    <div key={p.label}>
                      <dt
                        className={cn('inline-block rounded px-1.5 text-sm font-semibold', trackBg[t.color])}
                      >
                        {p.label}
                      </dt>
                      <dd className="text-ink-2 mt-1.5 text-[14.5px] leading-relaxed">{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="flex flex-col rounded-2xl p-3">
            <div className="flex items-center justify-between px-2 pt-1 pb-3">
              <p className="text-sm font-bold">Goal</p>
              <span className="bg-ink/10 rounded-full px-2 text-xs font-semibold">0</span>
            </div>
            <div className="border-ink/30 grid flex-1 place-items-center rounded-xl border-2 border-dashed p-6 text-center">
              <div>
                <p className="font-display text-2xl font-extrabold [font-stretch:85%]">Certified</p>
                <p className="text-ink-2 mt-2 text-sm">
                  Where this pipeline is headed. Want to get there together?
                </p>
                <a href="#contact" className="text-tang mt-4 inline-block text-sm font-bold">
                  Join me →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Built() {
  const [index, setIndex] = useState(-1)

  return (
    <section
      id="automation"
      className="bg-forest text-cream scroll-mt-20 rounded-t-[32px] py-20 md:rounded-t-[48px] md:py-28"
    >
      <div className={wrap}>
        <Reveal className="max-w-[720px]">
          <p className="text-mint text-sm font-semibold">Practice project · Marketing Hub</p>
          <h2 className={cn(h2, 'mt-4')}>Built, not just studied.</h2>
          <p className="text-cream/75 mt-6 text-lg">
            An inbound lead funnel for a digital marketing agency. A landing page captures the lead, a
            workflow welcomes them straight away, waits two business days, then follows up with a nurture
            email.
          </p>
        </Reveal>

        {/* drawn like a HubSpot workflow: nodes joined by a connector */}
        <ol className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
          {flow.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.15 }}
              className={cn(
                'relative rounded-2xl p-5',
                f.wait ? 'border-mint/50 border-2 border-dashed' : 'bg-mint text-ink',
              )}
            >
              <p
                className={cn(
                  'flex items-center gap-2 text-xs font-bold tracking-[.12em] uppercase',
                  f.wait ? 'text-mint' : 'text-forest',
                )}
              >
                {f.wait ? <Clock size={14} /> : i === 0 ? <ArrowRight size={14} /> : <Mail size={14} />}
                {f.tag}
              </p>
              <h3 className="mt-3 text-xl font-bold">{f.title}</h3>
              <p className={cn('mt-1.5 text-[14.5px]', f.wait ? 'text-cream/70' : 'text-ink-2')}>{f.text}</p>
              {i < flow.length - 1 && (
                <span
                  aria-hidden="true"
                  className="bg-mint/50 absolute -bottom-8 left-8 h-8 w-0.5 lg:top-1/2 lg:-right-6 lg:bottom-auto lg:left-auto lg:h-0.5 lg:w-6"
                />
              )}
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {gallery.map((s, i) => (
            <Reveal
              as="figure"
              key={s.src}
              delay={(i % 2) * 0.1}
              className={s.kind === 'wide' ? 'col-span-2' : 'col-span-1 md:col-span-2 lg:col-span-1'}
            >
              <button
                onClick={() => setIndex(shots.indexOf(s))}
                aria-label={`Enlarge: ${s.title}`}
                className={cn(
                  'group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white',
                  s.kind === 'phone' && 'max-h-[460px]',
                )}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
              <figcaption className="text-cream/70 mt-3 text-sm">
                <span className="text-mint font-semibold">{s.title}.</span> {s.caption}
              </figcaption>
            </Reveal>
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

function Learn() {
  return (
    <section id="learn" className="bg-mint scroll-mt-20 py-20 md:py-28">
      <div className={cn(wrap, 'grid grid-cols-1 items-center gap-14 md:grid-cols-[1.2fr_1fr]')}>
        <Reveal>
          <h2 className={h2}>
            Learning alone is where people <span className="text-forest italic">quit.</span>
          </h2>
          <p className="text-ink-2 mt-6 max-w-[52ch] text-lg">
            At Mbita High School I guided 100+ students through that exact problem with a clear plan, small
            steps and regular check-ins. I’m using the same method to learn HubSpot, and it works better with
            company.
          </p>
          <p className="mt-8 text-sm font-bold">This is for you if you’re…</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              'a student eyeing CRM or marketing roles',
              'a small business owner',
              'switching careers',
              'curious about HubSpot',
            ].map((w) => (
              <li
                key={w}
                className="border-ink bg-cream rounded-full border-[1.5px] px-3.5 py-1.5 text-sm font-medium"
              >
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15} as="figure" className="relative">
          <span
            aria-hidden="true"
            className="bg-tang absolute inset-0 translate-x-3 translate-y-3 rounded-[28px]"
          />
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            loading="lazy"
            className="border-ink relative aspect-[4/5] w-full rounded-[28px] border-2 object-cover"
          />
        </Reveal>
      </div>

      <ol className={cn(wrap, 'mt-16 grid grid-cols-1 gap-4 md:grid-cols-3')}>
        {learnSteps.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 0.1}
            className="border-ink bg-cream rounded-2xl border-[1.5px] p-6 shadow-[4px_4px_0_var(--color-ink)]"
          >
            <span className="font-display text-tang text-6xl leading-none font-black [font-stretch:75%]">
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
            <p className="text-ink-2 mt-1.5">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-ink text-cream scroll-mt-20">
      <div
        className={cn(wrap, 'grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-[1.1fr_1fr] md:py-28')}
      >
        <Reveal>
          <h2 className={h2}>
            Add yourself to <span className="text-tang">the pipeline.</span>
          </h2>
          <p className="text-cream/70 mt-6 max-w-[44ch] text-lg">
            Tell me what you want HubSpot for. One message is enough to get started.
          </p>
          <ul className="mt-10 space-y-3">
            {[
              ['Email', contact.email, mail],
              ['Phone', contact.phoneDisplay, `tel:${contact.phone}`],
            ].map(([k, v, href]) => (
              <li key={k}>
                <a href={href} className="group flex items-baseline gap-4 no-underline">
                  <span className="text-cream/50 w-14 text-sm">{k}</span>
                  <span className="group-hover:text-tang border-cream/30 border-b text-lg font-semibold transition-colors">
                    {v}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* a deal card with the visitor as the contact */}
        <Reveal delay={0.15}>
          <motion.div
            whileHover={{ rotate: 0 }}
            className="bg-tang text-ink rotate-2 rounded-2xl border-2 border-black p-6 shadow-[10px_10px_0_var(--color-mint)] sm:p-8"
          >
            <p className="text-xs font-bold tracking-[.16em] uppercase">New deal</p>
            <p className="font-display mt-3 text-[clamp(28px,3.4vw,40px)] leading-none font-black [font-stretch:80%]">
              You × Fidel
            </p>
            <dl className="mt-6 space-y-2.5 text-[15px]">
              {[
                ['Deal', 'Learning HubSpot'],
                ['Stage', 'First message'],
                ['Close date', 'Whenever you’re ready'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-black/15 pb-2.5 last:border-0"
                >
                  <dt className="text-ink/70">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a
              href={contact.hubspotWhatsapp}
              target="_blank"
              rel="noopener"
              className="btn btn-lg bg-ink text-cream hover:bg-forest mt-7 w-full border-black"
            >
              Start on WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </motion.div>
        </Reveal>
      </div>

      <footer
        className={cn(
          wrap,
          'text-cream/50 flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-sm',
        )}
      >
        <p>© {new Date().getFullYear()} Fidel Castrol</p>
        <div className="flex gap-6">
          <a href="/" className="hover:text-tang no-underline">
            Main portfolio
          </a>
          <a href="/Fidel-Castrol-Resume.pdf" download className="hover:text-tang no-underline">
            Resume (PDF)
          </a>
        </div>
      </footer>
    </section>
  )
}

export default function HubSpotPage() {
  return (
    <>
      <Nav
        links={hubspotNav}
        subtitle="Learning HubSpot"
        cta={{ label: 'Learn with me', href: contact.hubspotWhatsapp }}
        className="bg-cream/90"
        ctaClassName="bg-tang text-ink"
      />
      <main>
        <Hero />
        <Pipeline />
        <Built />
        <Learn />
        <Contact />
      </main>
    </>
  )
}
