import { lazy, Suspense, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import { cn } from '@/lib/cn'
import { contact, flow, hubspotNav, learnSteps, shots, tracks } from '@/data'

const ShotLightbox = lazy(() => import('@/components/ShotLightbox'))

const wrap = 'mx-auto max-w-[1120px] px-4 sm:px-8'
const photo = shots.find((s) => s.kind === 'photo')!
const gallery = shots.filter((s) => s.kind !== 'photo')

const mail = `mailto:${contact.email}?subject=${encodeURIComponent('Learning HubSpot')}`

/** Left label column + right content column, divided by a rule. */
function Block({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string
  label: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className={cn(wrap, 'scroll-mt-20 py-16 md:py-24')}>
      <div className="border-ink grid grid-cols-1 gap-x-12 gap-y-8 border-t-[1.5px] pt-6 md:grid-cols-[220px_1fr]">
        <p className="text-muted text-sm">{label}</p>
        <div>
          <h2 className="font-display max-w-[20ch] text-[clamp(30px,3.6vw,46px)] leading-[1.02] font-extrabold [font-stretch:85%]">
            {title}
          </h2>
          {intro && <div className="text-ink-2 mt-5 max-w-[60ch] space-y-4">{intro}</div>}
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className={cn(wrap, 'grid grid-cols-1 gap-12 pt-14 pb-10 md:grid-cols-[1.35fr_1fr] md:pt-24')}>
      <div className="flex flex-col">
        <p className="text-muted text-sm">HubSpot · what I’m learning, and how you can learn it too</p>
        <h1 className="font-display mt-6 text-[clamp(44px,6.6vw,88px)] leading-[.95] font-extrabold tracking-[-.03em] [font-stretch:80%]">
          I’m learning HubSpot properly.{' '}
          <span className="bg-sun box-decoration-clone px-1.5">Learn it with me.</span>
        </h1>
        <p className="text-ink-2 mt-8 max-w-[52ch] text-lg">
          I’ve spent years coaching students on structure and consistency. Now I’m putting myself through the
          same thing with HubSpot — CRM, pipelines, inbound and reporting. If you’re starting out too, I’d
          like to hear from you.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-sun btn-lg" href={contact.hubspotWhatsapp} target="_blank" rel="noopener">
            Message me on WhatsApp
          </a>
          <a className="btn btn-ghost btn-lg" href="#automation">
            See what I’ve built
          </a>
        </div>
        <dl className="border-line mt-auto grid grid-cols-3 gap-4 border-t pt-6 text-sm max-md:mt-12">
          {[
            ['Based in', contact.location],
            ['Sessions in', 'English, Swahili'],
            ['Background', 'Student success coach'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure>
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.w}
          height={photo.h}
          className="aspect-[4/5] w-full rounded-[4px] object-cover"
        />
        <figcaption className="text-muted mt-3 text-sm">
          HubSpot — the platform everything below is built in.
        </figcaption>
      </figure>
    </section>
  )
}

function Tracks() {
  return (
    <Block
      id="tracks"
      label="01 — Training"
      title="What I’m training in right now."
      intro={
        <p>
          I’m not certified yet, and I won’t pretend otherwise. These are the three areas I’m working through
          in structured upskilling, with an honest note on where I am in each.
        </p>
      }
    >
      <ol>
        {tracks.map((t, i) => (
          <li
            key={t.title}
            className="border-line grid grid-cols-1 gap-x-8 gap-y-4 border-t py-8 first:border-t-0 first:pt-0 lg:grid-cols-[1fr_1.3fr]"
          >
            <div>
              <span className="text-muted font-display text-sm font-bold">0{i + 1}</span>
              <h3 className="mt-1 text-[22px] leading-tight font-bold">{t.title}</h3>
              <p className="border-ink mt-3 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium">
                {t.status}
              </p>
            </div>
            <dl className="space-y-5">
              {t.points.map((p) => (
                <div key={p.label}>
                  <dt className="font-semibold">{p.label}</dt>
                  <dd className="text-ink-2 mt-1 text-[15.5px]">{p.text}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </Block>
  )
}

function Built() {
  const [index, setIndex] = useState(-1)

  return (
    <Block
      id="automation"
      label="02 — Practice"
      title="An inbound lead funnel I built."
      intro={
        <p>
          Practice project for a digital marketing agency. A landing page captures the lead, a workflow sends
          a welcome email straight away, waits two business days, then follows up with a nurture email.
        </p>
      }
    >
      <ol className="border-line bg-line mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border sm:grid-cols-2 lg:grid-cols-4">
        {flow.map((f, i) => (
          <li key={f.title} className={cn('p-5', f.wait ? 'bg-paper-2' : 'bg-paper')}>
            <p className="text-muted text-xs">
              {i + 1}. {f.tag}
            </p>
            <h3 className="mt-2 font-bold">{f.title}</h3>
            <p className="text-ink-2 mt-1.5 text-[14.5px]">{f.text}</p>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10">
        {gallery.map((s) => (
          <figure key={s.src} className={s.kind === 'wide' ? 'col-span-2' : 'col-span-1'}>
            <button
              onClick={() => setIndex(shots.indexOf(s))}
              aria-label={`Enlarge: ${s.title}`}
              className={cn(
                'border-line block w-full cursor-zoom-in overflow-hidden rounded-[4px] border bg-white',
                s.kind === 'phone' && 'max-h-[520px]',
              )}
            >
              <img
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                loading="lazy"
                decoding="async"
                className="w-full object-cover object-top"
              />
            </button>
            <figcaption className="text-ink-2 mt-3 text-sm">
              <span className="text-ink font-semibold">{s.title}.</span> {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {index >= 0 && (
        <Suspense fallback={null}>
          <ShotLightbox index={index} onClose={() => setIndex(-1)} />
        </Suspense>
      )}
    </Block>
  )
}

function Learn() {
  return (
    <div className="bg-paper-2">
      <Block
        id="learn"
        label="03 — Learn with me"
        title="If you want to learn HubSpot too."
        intro={
          <>
            <p>
              Most people who try to learn a tool like HubSpot alone stall after the first week. At Mbita High
              School I guided 100+ students through exactly that problem: a clear plan, small steps, regular
              check-ins. I’m using the same method on myself, and it works better with company.
            </p>
            <p>It’s a good fit if you are:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>a student or recent graduate looking at CRM, sales or marketing support roles</li>
              <li>a small business owner who wants contacts and follow-ups in one place</li>
              <li>switching careers and want something concrete to show</li>
            </ul>
          </>
        }
      >
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {learnSteps.map((s, i) => (
            <li key={s.title} className="border-ink border-t-[1.5px] pt-4">
              <p className="font-display text-[40px] leading-none font-extrabold [font-stretch:80%]">
                {i + 1}
              </p>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="text-ink-2 mt-1.5 text-[15.5px]">{s.text}</p>
            </li>
          ))}
        </ol>
      </Block>
    </div>
  )
}

function Contact() {
  const rows: [string, string, string, boolean?][] = [
    ['WhatsApp', contact.phoneDisplay, contact.hubspotWhatsapp, true],
    ['Email', contact.email, mail],
    ['Phone', contact.phoneDisplay, `tel:${contact.phone}`],
  ]
  return (
    <section id="contact" className="bg-night text-paper scroll-mt-20">
      <div className={cn(wrap, 'py-20 md:py-28')}>
        <p className="text-sm text-[#8d8b84]">04 — Contact</p>
        <h2 className="font-display mt-4 max-w-[16ch] text-[clamp(38px,5.4vw,72px)] leading-[.98] font-extrabold [font-stretch:82%]">
          Want to learn HubSpot? Send me a message.
        </h2>
        <p className="mt-5 max-w-[52ch] text-[#A9A79F]">Tell me what you want to use HubSpot for.</p>
        <ul className="border-night-line mt-12 border-t">
          {rows.map(([k, v, href, external]) => (
            <li key={k} className="border-night-line border-b">
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener' })}
                className="group flex items-center gap-6 py-6 no-underline"
              >
                <span className="w-24 shrink-0 text-sm text-[#8d8b84]">{k}</span>
                <span className="font-display group-hover:text-sun min-w-0 flex-1 truncate text-[clamp(20px,3vw,34px)] font-bold [font-stretch:90%] transition-colors">
                  {v}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="group-hover:text-sun shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <footer
        className={cn(
          wrap,
          'flex flex-wrap justify-between gap-3 border-t border-[#2a2a27] py-6 text-sm text-[#8d8b84]',
        )}
      >
        <p>© {new Date().getFullYear()} Fidel Castrol</p>
        <div className="flex gap-6">
          <a href="/" className="hover:text-sun no-underline">
            Main portfolio
          </a>
          <a href="/Fidel-Castrol-Resume.pdf" download className="hover:text-sun no-underline">
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
      />
      <main>
        <Hero />
        <Tracks />
        <Built />
        <Learn />
        <Contact />
      </main>
    </>
  )
}
