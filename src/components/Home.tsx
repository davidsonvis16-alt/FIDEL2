import { MotionConfig, motion } from 'motion/react'
import { ArrowUpRight, Check, Clock, GraduationCap, SendHorizontal, Users } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Avatar, Bubble, Contact, Header, Label, Typing } from '@/components/ui'
import { cn } from '@/lib/cn'
import { serif, useTitle, wrap } from '@/lib/layout'
import { ease } from '@/lib/motion'
import { contact, experience, languages, services, shots, skills, stats } from '@/data'

const links = [
  ['#about', 'About'],
  ['#services', 'Services'],
  ['/hubspot', 'HubSpot'],
  ['#contact', 'Contact'],
] as const

const workflow = shots.find((s) => s.src.includes('workflow'))!

const icons = { GraduationCap, Clock, Check, Users }

const demo = [
  { out: false, text: 'Hi, I’m Fidel 👋' },
  { out: false, text: 'I coach students on study habits, time management and staying motivated.' },
  { out: true, text: 'I want better grades but I keep falling behind.' },
  { out: false, text: 'That’s exactly what I help with. Let’s build a plan that works for you.' },
]

/** A short scripted chat; the composer bar opens the real WhatsApp chat. */
function ChatDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease, delay: 0.2 }}
      className="border-coal-line bg-coal-2 mx-auto w-full max-w-[440px] overflow-hidden rounded-2xl border shadow-2xl shadow-black/50"
    >
      <div className="bg-panel flex items-center gap-3 px-4 py-3">
        <Avatar />
        <div className="leading-tight">
          <p className="font-semibold">Fidel Castrol</p>
          <p className="text-ash text-xs">Student success coach</p>
        </div>
      </div>
      <div className="chat-wall min-h-[360px] space-y-2 px-4 py-6">
        {demo.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.9 + i * 0.8 }}
          >
            <Bubble out={m.out} time={`9:4${i}`}>
              {m.text}
            </Bubble>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + demo.length * 0.8 }}
        >
          <Typing />
        </motion.div>
      </div>
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener"
        className="bg-panel group flex items-center gap-3 px-4 py-3 no-underline"
      >
        <span className="bg-coal-line/60 text-ash group-hover:text-bone flex-1 rounded-full px-4 py-2.5 text-sm transition-colors">
          Type a message to Fidel…
        </span>
        <span className="bg-green text-coal-2 grid h-10 w-10 place-items-center rounded-full">
          <SendHorizontal size={18} />
        </span>
      </a>
    </motion.div>
  )
}

function Hero() {
  const lines = [
    <>Better students.</>,
    <>
      <em className="text-green">Brighter futures.</em>
    </>,
  ]

  return (
    <section
      className={cn(
        wrap,
        'grid grid-cols-1 items-center gap-14 pt-16 pb-24 md:grid-cols-[1.5fr_1fr] md:pt-24 md:pb-32',
      )}
    >
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-ash text-[13px] tracking-[.18em] uppercase"
        >
          Student success coach · {contact.location}
        </motion.p>
        <h1 className={cn(serif, 'mt-8 text-[clamp(52px,7.4vw,112px)] leading-[.92]')}>
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
          className="text-ash mt-10 max-w-[52ch] text-lg"
        >
          I’m Fidel Castrol. I help students build better habits, smarter study strategies and the confidence
          to reach their goals, in school and in life. Coaching in English and Swahili.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener"
            className="bg-green text-coal group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold no-underline transition-transform hover:-translate-y-0.5"
          >
            Book a coaching session
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="/hubspot"
            className="border-coal-line hover:border-bone inline-flex items-center justify-center rounded-full border px-7 py-4 no-underline transition-colors"
          >
            Learn HubSpot with me
          </a>
        </motion.div>
      </div>

      <ChatDemo />
    </section>
  )
}

function Numbers() {
  return (
    <section className="border-coal-line border-y">
      <div className={cn(wrap, 'grid grid-cols-1 sm:grid-cols-3')}>
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.1}
            className="border-coal-line border-b py-10 last:border-b-0 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0"
          >
            <p className={cn(serif, 'text-green text-[clamp(56px,6vw,88px)] leading-none')}>
              {s.text ?? `${s.value}${s.suffix}`}
            </p>
            <p className="text-ash mt-4 max-w-[30ch]">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className={cn(wrap, 'scroll-mt-20 py-24 md:py-36')}>
      <Reveal className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Label n="01">Services</Label>
          <h2 className={cn(serif, 'mt-8 text-[clamp(42px,5.6vw,80px)] leading-[.98]')}>
            Personal support for <em className="text-green">real progress.</em>
          </h2>
        </div>
        <p className="text-ash text-lg">
          Every student is different. I build practical one-on-one plans and run group sessions around each
          student’s needs and goals.
        </p>
      </Reveal>

      <ol className="bg-coal-2 border-coal-line mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[s.icon]
          return (
            <Reveal
              as="li"
              key={s.title}
              delay={(i % 2) * 0.1}
              className="hover:bg-panel border-coal-line flex gap-4 border-b p-5 transition-colors sm:p-6 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <span className="bg-bubble text-green grid h-12 w-12 shrink-0 place-items-center rounded-full">
                <Icon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <span className="text-green text-xs">0{i + 1}</span>
                </div>
                <p className="text-ash mt-1">{s.text}</p>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-coal-2 scroll-mt-20">
      <div className={cn(wrap, 'grid grid-cols-1 gap-16 py-24 md:grid-cols-[1fr_1.15fr] md:gap-24 md:py-36')}>
        <Reveal className="md:sticky md:top-32 md:self-start">
          <Label n="02">About</Label>
          <h2 className={cn(serif, 'mt-8 text-[clamp(42px,5.6vw,80px)] leading-[.98]')}>
            I’ve been in <em className="text-green">your shoes.</em>
          </h2>
          <p className="text-ash mt-6 max-w-[46ch] text-lg">
            I understand the pressure, the doubts and the challenges. I’m a dedicated coach with a track
            record of helping students reach their academic and personal goals, building strategies that
            improve how they learn and make them more resilient.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="text-ash text-sm">Strengths</p>
              <p className="mt-1">{skills.join(' · ')}</p>
            </div>
            <div>
              <p className="text-ash text-sm">Languages</p>
              <p className="mt-1">{languages.map((l) => l.name).join(', ')}</p>
            </div>
          </div>
        </Reveal>

        <ol>
          {experience.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.1}
              className="border-coal-line border-t py-10 first:border-t-0 first:pt-0"
            >
              <p className="text-green text-sm tracking-[.14em] uppercase">{e.date}</p>
              <h3 className={cn(serif, 'mt-3 text-[clamp(30px,3vw,42px)] leading-tight')}>{e.title}</h3>
              <p className="text-ash mt-1">{e.where}</p>
              <ul className="mt-6 space-y-3">
                {e.points.map((p) => (
                  <li key={p} className="text-bone/85 flex gap-4 text-[15.5px]">
                    <span className="bg-green mt-[.7em] h-px w-4 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className={cn(wrap, 'py-24 md:py-36')}>
      <Reveal as="blockquote" className="max-w-[1050px]">
        <p className={cn(serif, 'text-[clamp(34px,4.8vw,72px)] leading-[1.05]')}>
          “Success isn’t about being the best in the world, it’s about being{' '}
          <em className="text-green">better than you were yesterday.</em>”
        </p>
        <cite className="text-ash mt-8 block text-sm tracking-[.18em] uppercase not-italic">
          — Fidel Castrol
        </cite>
      </Reveal>
    </section>
  )
}

function HubSpotTeaser() {
  return (
    <section className={cn(wrap, 'pb-8')}>
      <Reveal>
        <a
          href="/hubspot"
          className="border-coal-line bg-coal-2 hover:border-green/50 group grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border p-6 no-underline transition-colors sm:p-10 md:grid-cols-[1fr_1.1fr] md:p-14"
        >
          <div>
            <Label n="03">Now learning</Label>
            <h2 className={cn(serif, 'mt-8 text-[clamp(40px,5vw,72px)] leading-[.98]')}>
              Learn HubSpot <em className="text-green">with me.</em>
            </h2>
            <p className="text-ash mt-6 max-w-[44ch] text-lg">
              I’m training in HubSpot: CRM, pipelines, inbound and reporting. See what I’ve built so far, and
              find your own starting point.
            </p>
            <span className="text-green mt-8 inline-flex items-center gap-2 font-semibold">
              Visit the HubSpot page
              <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white">
            <img
              src={workflow.src}
              alt={workflow.alt}
              width={workflow.w}
              height={workflow.h}
              loading="lazy"
              className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </a>
      </Reveal>
    </section>
  )
}

export default function Home() {
  useTitle('Fidel Castrol · Student Success Coach')
  return (
    <MotionConfig reducedMotion="user">
      <Header links={links} cta={{ href: '#contact', label: 'Let’s talk' }} status="Student success coach" />
      <main>
        <Hero />
        <Numbers />
        <Services />
        <About />
        <Quote />
        <HubSpotTeaser />
        <Contact
          whatsapp={contact.whatsapp}
          subject="Coaching session"
          footerLink={{ href: '/hubspot', label: 'Learn HubSpot' }}
        />
      </main>
    </MotionConfig>
  )
}
