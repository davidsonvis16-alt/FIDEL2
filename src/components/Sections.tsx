import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { GraduationCap, Clock, Check, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { services, ticker, stats, experience, skills, languages } from '@/data'

const icons = { GraduationCap, Clock, Check, Users }

export function Ticker() {
  const items = [...ticker, ...ticker]
  return (
    <div
      aria-hidden="true"
      className="bg-ink text-paper relative z-[4] -mx-2.5 -mt-1.5 -rotate-[1.2deg] overflow-hidden py-[18px]"
    >
      <div className="animate-tick font-display flex w-max gap-[34px] text-[26px] font-extrabold whitespace-nowrap uppercase [font-stretch:80%]">
        {items.map((t, i) => (
          <span key={i} className="flex gap-[34px]">
            {t}
            <i className="text-sun not-italic">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHead({
  kicker,
  title,
  children,
  dark,
}: {
  kicker: string
  title: ReactNode
  children?: ReactNode
  dark?: boolean
}) {
  return (
    <Reveal className="mb-14 max-w-[640px]">
      <p className={cn('kicker', dark && 'text-paper')}>{kicker}</p>
      <h2 className="h2">{title}</h2>
      {children && (
        <p className={cn('max-w-[520px] text-lg', dark ? 'text-[#A9A79F]' : 'text-muted')}>{children}</p>
      )}
    </Reveal>
  )
}

const wrap = 'mx-auto max-w-[1280px] px-4 py-20 sm:px-[4vw] md:py-[clamp(80px,10vw,140px)] xl:px-14'

export function Services() {
  return (
    <section id="services" className={wrap}>
      <SectionHead
        kicker="My services"
        title={
          <>
            Personalized support
            <br />
            for real progress.
          </>
        }
      >
        Every student is different. I build practical, one-on-one plans and run group sessions designed around
        each student’s needs and goals.
      </SectionHead>
      <ol className="border-ink grid grid-cols-1 border-t-[1.5px] sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon]
          return (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.09}
              className="group border-line hover:bg-sun relative border-b px-6 pt-8 pb-10 transition-colors duration-300 lg:border-r lg:border-b-0 lg:last:border-r-0 sm:[&:nth-child(odd)]:border-r"
            >
              <span className="font-display text-muted group-hover:text-ink text-[15px] font-extrabold [font-stretch:70%]">
                0{i + 1}
              </span>
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                className="border-ink bg-sun group-hover:bg-paper my-6 grid h-[46px] w-[46px] place-items-center rounded-xl border-[1.5px] transition-colors"
              >
                <Icon size={22} strokeWidth={1.8} />
              </motion.span>
              <h3 className="mb-2.5 text-xl leading-tight font-bold">{s.title}</h3>
              <p className="text-ink-2 text-[15.5px]">{s.text}</p>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <strong ref={ref}>
      {val}
      {suffix}
    </strong>
  )
}

export function Numbers() {
  return (
    <section className="px-4 sm:px-[4vw] xl:px-14">
      <Reveal className="border-ink bg-sun relative mx-auto grid max-w-[1280px] grid-cols-1 gap-9 rounded-[28px] border-[1.5px] px-6 pt-16 pb-14 shadow-[6px_6px_0_var(--color-ink)] sm:px-[5vw] md:grid-cols-3 xl:px-[72px]">
        <motion.p
          aria-hidden="true"
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          whileInView={{ rotate: 4, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.4 }}
          className="border-ink bg-paper font-hand absolute -top-7 right-4 rounded-md border-[1.5px] px-3.5 pt-1 pb-2 text-2xl leading-none md:right-10 md:text-[28px]"
        >
          Mbita High School,
          <br />
          2022 – 2025
        </motion.p>
        {stats.map((s) => (
          <div
            key={s.label}
            className="[&_strong]:font-display [&_strong]:block [&_strong]:text-[clamp(64px,8vw,116px)] [&_strong]:leading-[.9] [&_strong]:font-black [&_strong]:tracking-[-.04em] [&_strong]:[font-stretch:72%]"
          >
            {s.text ? <strong>{s.text}</strong> : <CountUp to={s.value!} suffix={s.suffix!} />}
            <span className="border-ink mt-3.5 block max-w-[240px] border-t-[1.5px] pt-3 text-[15.5px] font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

export function About() {
  return (
    <section
      id="about"
      className={cn(
        wrap,
        'grid grid-cols-1 items-start gap-[clamp(40px,7vw,110px)] md:grid-cols-[1fr_1.15fr]',
      )}
    >
      <Reveal>
        <p className="kicker">About me</p>
        <h2 className="h2">
          I’ve been in
          <br />
          your shoes.
        </h2>
        <p className="text-ink-2 max-w-[460px]">
          I understand the pressure, the doubts and the challenges. I’m a dedicated, passionate coach with a
          track record of helping students reach their academic and personal goals — building strategies that
          improve how they learn and make them more resilient.
        </p>
        <p className="border-sun font-hand mt-7 inline-block -rotate-[4deg] border-b-[3px] px-1.5 text-[52px] leading-none">
          Fidel Castrol
        </p>
      </Reveal>

      <div className="border-ink relative border-l-[1.5px] pl-[30px]">
        {experience.map((e, i) => (
          <Reveal as="article" key={e.title} delay={i * 0.1} className="relative pb-11 last:pb-0">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 + i * 0.1 }}
              className="border-ink bg-sun absolute top-1 -left-[39px] h-4 w-4 rounded-full border-[1.5px]"
            />
            <p className="text-muted mb-1.5 text-[13px] tracking-[.12em] uppercase">{e.date}</p>
            <h3 className="text-[26px] leading-tight font-bold [font-stretch:90%]">{e.title}</h3>
            <p className="mt-1 mb-3.5 font-medium">{e.where}</p>
            <ul>
              {e.points.map((p) => (
                <li
                  key={p}
                  className="text-ink-2 before:bg-ink relative mb-2 pl-[22px] text-[15.5px] before:absolute before:top-[.72em] before:left-0 before:h-0.5 before:w-2.5"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="blockquote"
        className="border-ink bg-paper-2 relative col-span-full mt-8 rounded-[18px] border-[1.5px] px-6 py-12 sm:px-[5vw] xl:px-20"
      >
        <span
          aria-hidden="true"
          className="font-display text-sun absolute -top-12 left-7 text-[140px] leading-none font-black [-webkit-text-stroke:1.5px_var(--color-ink)]"
        >
          “
        </span>
        <p className="font-hand max-w-[900px] text-[clamp(32px,4vw,52px)] leading-[1.1]">
          “Success isn’t about being the best in the world, it’s about being better than you were yesterday.”
        </p>
        <cite className="mt-4 block text-sm tracking-[.12em] uppercase not-italic">— Fidel Castrol</cite>
      </Reveal>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className={cn(wrap, 'pt-5 md:pt-5')}>
      <SectionHead kicker="Skills" title="What I bring." />
      <div className="grid grid-cols-1 items-start gap-[clamp(30px,6vw,90px)] md:grid-cols-[1.6fr_1fr]">
        <ul>
          {skills.map((s, i) => (
            <Reveal
              as="li"
              key={s}
              delay={i * 0.08}
              whileHover={{ x: 16 }}
              className="border-ink font-display flex items-baseline gap-5 border-b-[1.5px] py-5 text-[clamp(30px,4.4vw,58px)] leading-none font-extrabold tracking-[-.025em] [font-stretch:80%] first:border-t-[1.5px] hover:bg-[linear-gradient(transparent_55%,var(--color-sun)_55%)]"
            >
              <span className="text-muted min-w-7 text-[15px] font-bold tracking-normal [font-stretch:100%]">
                0{i + 1}
              </span>
              {s}
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.2} className="bg-ink text-paper rounded-[18px] p-8">
          <p className="kicker text-paper">Languages</p>
          <ul className="mt-5">
            {languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between border-t border-[#3a3a37] py-4">
                <strong className="font-display text-[28px] font-extrabold [font-stretch:85%]">
                  {l.name}
                </strong>
                <span className="text-sun text-sm">{l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
