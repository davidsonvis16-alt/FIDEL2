import type { ReactNode } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { ArrowDown, ArrowRight, CornerDownRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Contact, Header } from '@/components/ui'
import { cn } from '@/lib/cn'
import { useTitle, wrap } from '@/lib/layout'
import { ease } from '@/lib/motion'
import { contact, shots, workIndex } from '@/data'

const links = [
  ['#index', 'Index'],
  ['#selected', 'Selected'],
  ['/hubspot', 'HubSpot'],
  ['#contact', 'Contact'],
] as const

const contents = [
  ['00', 'Cover', '#top'],
  ['01', 'Index', '#index'],
  ['02', 'Selected', '#selected'],
  ['03', 'Colophon', '#contact'],
]

const shot = (name: string) => shots.find((s) => s.src.includes(name))!
const ext = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})

/** Two-column page grid: narrow margin column on the left, content column behind a vertical rule. */
const grid = 'grid grid-cols-1 md:grid-cols-[140px_1fr]'
const col = 'md:border-ink/70 md:border-l md:pl-6'

function Hero() {
  return (
    <section id="top" className={cn(wrap, grid, 'pt-8')}>
      <aside className="hidden pr-6 text-[11px] leading-relaxed md:block">
        <ol className="space-y-1">
          {contents.map(([n, label, href], i) => (
            <li key={n}>
              <a
                href={href}
                className={cn('no-underline', i === 0 ? 'font-semibold' : 'text-muted hover:text-ink')}
              >
                {n} — {label}
              </a>
            </li>
          ))}
        </ol>
        <p className="text-muted mt-6">A record of coaching, mentoring and HubSpot work.</p>
      </aside>

      <div className={cn(col, 'pb-12')}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_230px]">
          <div>
            <p className="text-ink-2 flex flex-wrap gap-x-4 text-[12px]">
              <span className="text-ink font-semibold">Since 2019</span>
              <span>One-to-one &amp; groups</span>
              <span>Study · Habits · HubSpot</span>
            </p>
            <h1 className="mt-5 [font-feature-settings:'ss01'] leading-[.86]">
              {[
                ['Fidel', 'font-extrabold tracking-[-.065em]'],
                ['Castrol,', 'font-extrabold tracking-[-.065em]'],
                ['builds better', 'mt-3 font-light tracking-[-.055em]'],
                ['students.', 'font-light tracking-[-.055em]'],
              ].map(([t, cls], i) => (
                <span key={t} className="block overflow-hidden pb-[.08em]">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.05 + i * 0.09 }}
                    className={cn('block text-[clamp(60px,11vw,158px)]', cls)}
                  >
                    {t.endsWith(',') ? (
                      <>
                        {t.slice(0, -1)}
                        <span className="text-blue">,</span>
                      </>
                    ) : (
                      t
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:pt-16 lg:text-right"
          >
            <p className="text-[64px] leading-none font-bold tracking-[-.06em]">
              100+<span className="text-blue">.</span>
            </p>
            <p className="text-ink-2 mt-2 max-w-[220px] text-[12.5px] lg:ml-auto">
              students guided to their academic and personal goals.
            </p>
            <hr className="border-ink mt-5" />
            <ul className="text-muted mt-3 space-y-0.5 text-[11px]">
              <li>+30% student retention, Mbita High School</li>
              <li>Advanced Coaching Certification, Alison</li>
              <li>In HubSpot training, 2026</li>
            </ul>
          </motion.aside>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
          className="text-ink-2 mt-8 max-w-[48ch] text-[17px]"
        >
          I build <b className="text-ink">success plans</b> — study habits, routines and regular check-ins
          where the structure does the heavy lifting and every student is heard. In English and Swahili.
        </motion.p>

        <div className="border-line mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-4 text-[13px]">
          <span className="flex items-center gap-2">
            <span className="bg-blue h-2 w-2 rounded-full" />
            Open for coaching &amp; HubSpot study partners
          </span>
          <span className="text-muted">/</span>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener"
            className="border-ink hover:text-blue hover:border-blue border-b font-medium no-underline"
          >
            Write on WhatsApp
          </a>
          <span className="text-muted">/</span>
          <a
            href="/hubspot"
            className="border-ink hover:text-blue hover:border-blue border-b font-medium no-underline"
          >
            Learn HubSpot with me
          </a>
        </div>
      </div>
    </section>
  )
}

function Index() {
  return (
    <section id="index" className={cn(wrap, 'scroll-mt-16 pt-12')}>
      <div className={grid}>
        <p className="text-muted hidden self-end pb-2 text-[11px] md:block">01</p>
        <div className="border-ink flex items-end justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-[-.03em] md:pl-6">Index of work</h2>
          <p className="text-muted text-[11px]">{workIndex.length} entries</p>
        </div>
      </div>
      <ol>
        {workIndex.map((w, i) => (
          <li key={w.title} className={cn(grid, 'group')}>
            <span className="text-muted group-hover:bg-paper-2 hidden place-items-center text-[11px] transition-colors md:grid">
              {String.fromCharCode(65 + i)}
            </span>
            <a
              href={w.href}
              {...ext(w.href)}
              className={cn(
                col,
                'border-line grid grid-cols-[48px_1fr] items-center gap-x-4 gap-y-1 border-b py-3.5 no-underline sm:grid-cols-[56px_1fr_200px_120px]',
              )}
            >
              <span className="text-ink-2 text-[12px]">{w.year}</span>
              <span>
                <span className="group-hover:text-blue block text-[19px] font-medium tracking-[-.02em] transition-colors">
                  {w.title}
                </span>
                <span className="text-muted block text-[12px]">{w.sub}</span>
              </span>
              <span className="text-ink-2 col-start-2 text-[12px] sm:col-start-auto">
                {w.tags}
                {w.pill && (
                  <span className="border-ink/40 ml-2 inline-block rounded-full border px-2 text-[10px]">
                    {w.pill}
                  </span>
                )}
              </span>
              <span className="col-start-2 flex items-center gap-1.5 text-[12px] font-semibold sm:col-start-auto sm:justify-end">
                <CornerDownRight size={13} className="text-muted group-hover:text-blue" />
                {w.cta}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Tile({
  children,
  title,
  sub,
  n,
  className,
  href,
}: {
  children: ReactNode
  title: string
  sub: string
  n: string
  className?: string
  href?: string
}) {
  const body = <div className="h-full overflow-hidden">{children}</div>
  return (
    <Reveal as="figure" className={className}>
      {href ? (
        <a href={href} className="group block no-underline">
          {body}
        </a>
      ) : (
        body
      )}
      <figcaption className="mt-2.5 flex justify-between gap-4 text-[12px]">
        <span>
          <span className="font-semibold">{title}</span> <span className="text-muted">{sub}</span>
        </span>
        <span className="text-muted">{n}</span>
      </figcaption>
    </Reveal>
  )
}

function Selected() {
  const workflow = shot('workflow')
  const email = shot('email-1')
  const photo = shot('hubspot-inbound')
  const week = ['MON · plan', 'TUE · study', 'WED · revise', 'THU · study', 'FRI · check-in', 'SAT · rest']

  return (
    <section id="selected" className={cn(wrap, grid, 'scroll-mt-16 pt-16')}>
      <aside className="hidden pr-6 md:block">
        <p className="text-[34px] leading-none font-bold tracking-[-.04em]">02</p>
        <p className="text-muted mt-3 text-[11px] leading-relaxed">
          Selected work, from the classroom to HubSpot. Full details on request.
        </p>
      </aside>

      <div className={cn(col, 'grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2')}>
        <Tile className="sm:col-span-2" title="Student success plans" sub="Mbita High School" n="A / 01">
          <div className="bg-ink text-paper px-6 pt-6 pb-5 sm:px-10 sm:pt-8">
            <p className="text-[clamp(72px,12vw,150px)] leading-[.85] font-extrabold tracking-[-.06em]">
              30%
            </p>
            <p className="text-paper/50 mt-5 text-[11px] tracking-[.3em] uppercase">
              Retention · Plans · Check-ins — 2022–2025
            </p>
            <hr className="border-paper/15 my-7" />
            <p className="text-blue text-[clamp(40px,7vw,84px)] leading-none font-extrabold tracking-[-.05em] italic brightness-150">
              Better students.
            </p>
            <p className="text-paper/90 mt-7 max-w-[36ch] text-[clamp(17px,2vw,23px)] leading-snug font-light">
              Success isn’t about being the best in the world, it’s about being better than you were
              yesterday.
            </p>
            <p className="text-paper/40 mt-4 flex justify-between text-[11px] tracking-[.25em] uppercase">
              <span>Fidel Castrol</span>
              <span>p. 001</span>
            </p>
          </div>
        </Tile>

        <Tile title="Inbound funnel" sub="HubSpot workflow" n="B / 02" href="/hubspot">
          <div className="bg-blue grid aspect-[4/3] place-items-center p-6 sm:p-8">
            <img
              src={workflow.src}
              alt={workflow.alt}
              width={workflow.w}
              height={workflow.h}
              loading="lazy"
              className="w-full rounded-sm shadow-xl shadow-black/30 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Tile>

        <Tile title="Welcome email" sub="sent automatically" n="C / 03" href="/hubspot">
          <div className="bg-paper-2 border-line grid aspect-[4/3] place-items-center border p-6">
            <div className="border-ink h-full w-[52%] overflow-hidden border bg-white p-1.5">
              <img
                src={email.src}
                alt={email.alt}
                width={email.w}
                height={email.h}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Tile>

        <Tile title="Time management" sub="weekly routine" n="D / 04">
          <div className="bg-ink text-paper flex aspect-[4/3] flex-col p-6 sm:p-7">
            <p className="text-[clamp(28px,3.4vw,42px)] leading-[.95] font-extrabold tracking-[-.045em]">
              Time
              <br />
              <span className="text-red">Management</span>
            </p>
            <ul className="border-paper/15 text-paper/55 mt-auto grid grid-cols-3 border-t text-[10.5px] tracking-[.08em]">
              {week.map((d) => (
                <li key={d} className="border-paper/15 border-r border-b px-2 py-2.5 nth-[3n]:border-r-0">
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-blue mt-3 text-[15px] font-semibold brightness-150">Workshops for students</p>
          </div>
        </Tile>

        <Tile title="Peer mentoring" sub="circles" n="E / 05">
          <div className="flex aspect-[4/3] flex-col">
            <p className="bg-ink text-paper px-6 py-5 text-[clamp(20px,2.2vw,26px)] font-bold tracking-[-.03em] sm:px-7">
              Peer Mentoring
            </p>
            <div className="bg-blue text-paper flex flex-1 flex-col px-6 py-5 sm:px-7">
              {['Listen', 'Plan', 'Check in'].map((s, i) => (
                <p
                  key={s}
                  className="flex items-center justify-between py-1 text-[clamp(18px,2vw,24px)] font-medium tracking-[-.02em]"
                >
                  <span>
                    <span className="mr-3 tabular-nums">0{i + 1}</span>
                    {s}
                  </span>
                  {i < 2 ? (
                    <ArrowRight strokeWidth={1.3} size={32} />
                  ) : (
                    <ArrowDown strokeWidth={1.3} size={32} />
                  )}
                </p>
              ))}
              <p className="border-paper/40 text-paper/70 mt-auto border-t pt-3 text-[10.5px] tracking-[.25em] uppercase">
                Mentoring circles · 2022–2025
              </p>
            </div>
          </div>
        </Tile>

        <Tile
          className="sm:col-span-2"
          title="HubSpot"
          sub="where the funnel was built"
          n="F / 06"
          href="/hubspot"
        >
          <div className="relative aspect-[16/7] overflow-hidden">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <p className="bg-paper absolute bottom-0 left-0 flex items-center gap-3 px-5 py-4 text-[clamp(18px,2.4vw,30px)] font-bold tracking-[-.03em]">
              <span>
                Now learning HubSpot<span className="text-blue">.</span>
              </span>
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </p>
          </div>
        </Tile>
      </div>
    </section>
  )
}

export default function Home() {
  useTitle('Fidel Castrol — Student Success Coach')
  return (
    <MotionConfig reducedMotion="user">
      <Header role="student success coach & HubSpot learner" links={links} />
      <main>
        <Hero />
        <Index />
        <Selected />
      </main>
      <Contact
        whatsapp={contact.whatsapp}
        subject="Coaching session"
        footerLink={{ href: '/hubspot', label: 'Learn HubSpot with me' }}
      />
    </MotionConfig>
  )
}
