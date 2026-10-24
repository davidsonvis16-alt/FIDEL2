import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { MotionConfig, animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, RotateCcw, SendHorizontal } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Avatar, Bubble, Contact, Header, Label } from '@/components/ui'
import { cn } from '@/lib/cn'
import { display, useTitle, wrap } from '@/lib/layout'
import { ease } from '@/lib/motion'
import { contact, flow, learnSteps, quiz, shots, stats, tracks, type Shot } from '@/data'

const ShotLightbox = lazy(() => import('@/components/ShotLightbox'))

const photo = shots.find((s) => s.kind === 'photo')!
const wa = (text: string) =>
  `https://wa.me/${contact.phone.replace('+', '')}?text=${encodeURIComponent(text)}`

// funnel steps in order, each paired with the screenshot that shows it
const byName = (name: string) => shots.find((s) => s.src.includes(name))!
const steps: { step: (typeof flow)[number]; shot: Shot }[] = [
  { step: flow[0], shot: byName('landing-page') },
  { step: flow[1], shot: byName('email-1') },
  { step: flow[2], shot: byName('workflow') },
  { step: flow[3], shot: byName('email-2') },
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  const lines = [
    <>Learn HubSpot</>,
    <>
      with someone <em className="text-blue">in</em>
    </>,
    <>
      <em className="text-blue">your corner.</em>
    </>,
  ]

  return (
    <section ref={ref} className="relative">
      <div className={cn(wrap, 'pt-16 pb-14 md:pt-24')}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-muted flex items-baseline gap-3 text-[13px] tracking-[.18em] uppercase"
        >
          <span className="relative flex h-2 w-2 shrink-0 -translate-y-px">
            <span className="bg-blue absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-blue relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Homa Bay, Kenya · In HubSpot training · Open to study partners
        </motion.p>

        <h1 className={cn(display, 'mt-8 text-[clamp(54px,10vw,152px)] leading-[.92]')}>
          {lines.map((l, i) => (
            <span key={i} className="block overflow-hidden pb-[.06em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto]"
        >
          <p className="text-muted max-w-[54ch] text-lg">
            I’m Fidel. I spent years coaching students to stay consistent, and now I’m training in HubSpot:
            CRM, pipelines, inbound and reporting. If you want to learn it too, you don’t have to do it alone.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#start"
              className="bg-blue text-paper group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold no-underline transition-transform hover:-translate-y-0.5"
            >
              Find your starting point
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#work"
              className="border-line hover:border-ink inline-flex items-center justify-center rounded-full border px-7 py-4 no-underline transition-colors"
            >
              See my work
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ clipPath: 'inset(12% 8% 0 8% round 24px)' }}
        animate={{ clipPath: 'inset(0% 0% 0 0% round 0px)' }}
        transition={{ duration: 1.4, ease, delay: 0.4 }}
        className="relative h-[52vh] max-h-[860px] overflow-hidden md:h-[78vh]"
      >
        <motion.img
          style={{ y: imgY, scale: imgScale }}
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          className="h-full w-full object-cover brightness-[.7]"
        />
        <div className="from-paper absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        <p className={cn(wrap, 'text-muted absolute inset-x-0 bottom-6 text-sm')}>
          HubSpot · the platform every project below is built in
        </p>
      </motion.div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className={cn(wrap, 'scroll-mt-20 py-24 md:py-36')}>
      <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr]">
        <Label n="01">What I’m training in</Label>
        <p className="text-muted text-lg">
          Not certified yet. I’d rather show you exactly where I am than oversell it. Three areas, worked
          through in a structured way.
        </p>
      </Reveal>

      <ol className="mt-16">
        {tracks.map((t, i) => (
          <Reveal
            as="li"
            key={t.title}
            delay={i * 0.08}
            className="group border-line grid grid-cols-1 gap-x-10 gap-y-6 border-t py-10 last:border-b md:grid-cols-[80px_1.1fr_1.4fr] md:py-14"
          >
            <span className={cn(display, 'text-muted group-hover:text-blue text-4xl transition-colors')}>
              0{i + 1}
            </span>
            <div>
              <h3 className={cn(display, 'text-[clamp(30px,3.4vw,46px)] leading-[1.02]')}>{t.title}</h3>
              <p className="text-blue mt-4 text-sm tracking-[.14em] uppercase">{t.status}</p>
              <span className="bg-line mt-3 block h-px w-full max-w-[220px] overflow-hidden">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: (i + 1) / 4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease, delay: 0.3 }}
                  className="bg-blue block h-full origin-left"
                />
              </span>
            </div>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {t.points.map((p) => (
                <div key={p.label}>
                  <dt className="font-semibold">{p.label}</dt>
                  <dd className="text-muted mt-2 text-[15px] leading-relaxed">{p.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function StepShot({
  s,
  i,
  onActive,
  onOpen,
}: {
  s: Shot
  i: number
  onActive: (i: number) => void
  onOpen: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(i)
  }, [inView, i, onActive])

  return (
    <button
      ref={ref}
      onClick={onOpen}
      aria-label={`Enlarge: ${s.title}`}
      className={cn(
        'border-line group block w-full cursor-zoom-in overflow-hidden rounded-2xl border bg-white',
        s.kind === 'phone' && 'mx-auto max-w-[380px]',
      )}
    >
      <img
        src={s.src}
        alt={s.alt}
        width={s.w}
        height={s.h}
        loading="lazy"
        decoding="async"
        className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </button>
  )
}

function Work() {
  const [active, setActive] = useState(0)
  const [index, setIndex] = useState(-1)

  return (
    <section id="work" className="bg-paper-2 scroll-mt-20 py-24 md:py-36">
      <div className={wrap}>
        <Reveal className="max-w-[820px]">
          <Label n="02">Practice project · Marketing Hub</Label>
          <h2 className={cn(display, 'mt-8 text-[clamp(42px,6vw,88px)] leading-[.98]')}>
            An inbound funnel that <em className="text-blue">runs itself.</em>
          </h2>
          <p className="text-muted mt-6 max-w-[56ch] text-lg">
            Built for a digital marketing agency. Someone fills in a form, and HubSpot takes it from there.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <ol className="hidden self-start md:sticky md:top-32 md:block">
            {steps.map(({ step }, i) => (
              <li
                key={step.title}
                className={cn(
                  'border-line border-l-2 py-5 pl-6 transition-all duration-500',
                  active === i ? 'border-blue opacity-100' : 'opacity-35',
                )}
              >
                <p className="text-blue text-xs tracking-[.16em] uppercase">{step.tag}</p>
                <h3 className={cn(display, 'mt-1.5 text-3xl')}>{step.title}</h3>
                <p className="text-muted mt-2 text-[15px]">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="space-y-20 md:space-y-32">
            {steps.map(({ step, shot }, i) => (
              <figure key={shot.src}>
                {/* on mobile the step text sits above each screenshot instead of in the sticky rail */}
                <figcaption className="mb-5 md:hidden">
                  <p className="text-blue text-xs tracking-[.16em] uppercase">{step.tag}</p>
                  <h3 className={cn(display, 'mt-1 text-3xl')}>{step.title}</h3>
                  <p className="text-muted mt-2 text-[15px]">{step.text}</p>
                </figcaption>
                <StepShot s={shot} i={i} onActive={setActive} onOpen={() => setIndex(shots.indexOf(shot))} />
                <p className="text-muted mt-4 text-sm">
                  <span className="text-ink">{shot.title}.</span> {shot.caption}
                </p>
              </figure>
            ))}
          </div>
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

function Score({ to }: { to: number }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const c = animate(0, to, { duration: 1.2, ease, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [to])
  return <>{v}</>
}

function Start() {
  const [answers, setAnswers] = useState<number[]>([])
  const step = answers.length
  const done = step === quiz.length

  const picked = answers.map((a, q) => quiz[q].options[a])
  const score = 50 + picked.reduce((n, o) => n + o.points, 0)
  const grade = score >= 85 ? 'Sales-ready' : score >= 78 ? 'Qualified' : 'Warm lead'
  const track = done ? tracks[picked[0].track!] : null
  const message = done
    ? `Hi Fidel, I'd like to learn HubSpot with you.\n${quiz.map((q, i) => `${q.key}: ${picked[i].label}`).join('\n')}`
    : ''

  return (
    <section id="start" className={cn(wrap, 'scroll-mt-20 py-24 md:py-36')}>
      <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
        <Reveal>
          <Label n="03">Start here</Label>
          <h2 className={cn(display, 'mt-8 text-[clamp(42px,5.6vw,80px)] leading-[.98]')}>
            Find your <em className="text-blue">starting point.</em>
          </h2>
          <p className="text-muted mt-6 max-w-[46ch] text-lg">
            Three quick questions. You’ll get a lead score (lead scoring is one of the things I’m learning)
            and the track I’d suggest we start with.
          </p>
          <ul className="border-line mt-12 space-y-5 border-t pt-8">
            {learnSteps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className={cn(display, 'text-blue text-2xl leading-none')}>{i + 1}</span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-muted mt-1 text-[15px]">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={0.1}
          className="border-line bg-paper-2 overflow-hidden rounded-2xl border shadow-2xl shadow-black/50"
        >
          <div className="bg-paper-2 flex items-center gap-3 px-4 py-3">
            <Avatar />
            <div className="leading-tight">
              <p className="font-semibold">Fidel Castrol</p>
              <p className="text-muted text-xs">
                {done ? 'Your result is in' : `Question ${step + 1} of ${quiz.length}`}
              </p>
            </div>
          </div>

          <div className="chat-wall min-h-[480px] space-y-2 px-4 py-6">
            <Bubble time="now">Three quick questions and I’ll suggest where we start 👇</Bubble>
            {answers.map((a, q) => (
              <Fragment key={q}>
                <Bubble>{quiz[q].question}</Bubble>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Bubble out time="now">
                    {quiz[q].options[a].label}
                  </Bubble>
                </motion.div>
              </Fragment>
            ))}

            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease, delay: 0.25 }}
              >
                <Bubble>{quiz[step].question}</Bubble>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quiz[step].options.map((o, i) => (
                    <button
                      key={o.label}
                      onClick={() => setAnswers([...answers, i])}
                      className="border-blue/50 text-blue hover:bg-blue hover:text-paper-2 bg-paper-2/80 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.25 }}
                className="space-y-2"
              >
                <Bubble>
                  <span className="text-muted block text-xs">Your lead score</span>
                  <span className="text-blue flex items-end gap-3">
                    <span className="text-6xl leading-none font-bold tracking-tight">
                      <Score to={score} />
                    </span>
                    <span className="mb-1 text-sm font-semibold">{grade}</span>
                  </span>
                </Bubble>
                <Bubble time="now">
                  I’d suggest we start with <b>{track!.title}</b>. Send me your answers and we’ll plan it.
                </Bubble>
                <a
                  href={wa(message)}
                  target="_blank"
                  rel="noopener"
                  className="bg-blue text-paper-2 mt-4 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold no-underline transition-opacity hover:opacity-90"
                >
                  Send my answers to Fidel <SendHorizontal size={18} />
                </a>
                <button
                  onClick={() => setAnswers([])}
                  className="text-muted hover:text-ink mx-auto mt-3 flex items-center gap-2 text-sm"
                >
                  <RotateCcw size={14} /> Start over
                </button>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="bg-paper-2">
      <div className={cn(wrap, 'py-24 md:py-36')}>
        <Reveal>
          <Label n="04">Why learn with a coach</Label>
        </Reveal>
        <Reveal as="blockquote" delay={0.1} className="mt-10 max-w-[1000px]">
          <p className={cn(display, 'text-[clamp(34px,4.6vw,68px)] leading-[1.05]')}>
            “Success isn’t about being the best in the world, it’s about being{' '}
            <em className="text-blue">better than you were yesterday.</em>”
          </p>
        </Reveal>
        <div className="border-line mt-20 grid grid-cols-1 gap-10 border-t pt-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className={cn(display, 'text-blue text-7xl leading-none')}>
                {s.text ?? `${s.value}${s.suffix}`}
              </p>
              <p className="text-muted mt-4 max-w-[30ch]">{s.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="text-muted mt-8 text-sm">
          From my years as Student Success Coach at Mbita High School.
        </p>
      </div>
    </section>
  )
}

const links = [
  ['#skills', 'Skills'],
  ['#work', 'Work'],
  ['#start', 'Start here'],
  ['/', 'Portfolio'],
] as const

export default function HubSpotPage() {
  useTitle('Learn HubSpot with Fidel Castrol')
  return (
    <MotionConfig reducedMotion="user">
      <Header role="learning HubSpot" links={links} />
      <main>
        <Hero />
        <Skills />
        <Work />
        <Start />
        <Why />
        <Contact
          whatsapp={contact.hubspotWhatsapp}
          subject="Learning HubSpot"
          footerLink={{ href: '/', label: 'Main portfolio' }}
        />
      </main>
    </MotionConfig>
  )
}
