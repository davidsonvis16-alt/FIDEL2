import { useState, type ReactNode } from 'react'
import { ArrowUpRight, CheckCheck } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { serif, wrap } from '@/lib/layout'
import { contact } from '@/data'

const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

export function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="text-ash flex items-center gap-3 text-[13px] tracking-[.18em] uppercase">
      <span className="text-green">{n}</span>
      <span className="bg-coal-line h-px w-10" />
      {children}
    </p>
  )
}

export function Avatar({ className }: { className?: string }) {
  const [ok, setOk] = useState(true)
  return ok ? (
    <img
      src="/images/fidel.jpg"
      alt=""
      onError={() => setOk(false)}
      className={cn('h-10 w-10 shrink-0 rounded-full object-cover', className)}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        'bg-bubble text-green grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold',
        className,
      )}
    >
      FC
    </span>
  )
}

/** A chat message. Incoming sits left in grey, outgoing right in green with read ticks. */
export function Bubble({ out, time, children }: { out?: boolean; time?: string; children: ReactNode }) {
  return (
    <div className={cn('flex', out && 'justify-end')}>
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 pt-1.5 pb-1 text-[15px] leading-snug shadow-sm shadow-black/30',
          out ? 'bg-bubble rounded-tr-none' : 'bg-panel rounded-tl-none',
        )}
      >
        {children}
        {time && (
          <span className="text-bone/50 float-right mt-2 ml-3 flex items-center gap-1 text-[11px] leading-none">
            {time}
            {out && <CheckCheck size={15} className="text-tick" />}
          </span>
        )}
      </div>
    </div>
  )
}

export function Typing() {
  return (
    <div className="bg-panel inline-flex gap-1 rounded-lg rounded-tl-none px-3.5 py-3" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="bg-ash h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export function Header({
  links,
  cta,
  status,
}: {
  links: readonly (readonly [href: string, label: string])[]
  cta: { href: string; label: string }
  status: string
}) {
  return (
    <header className="bg-coal-2/90 sticky top-0 z-50 border-b border-white/5 backdrop-blur-md">
      <div className={cn(wrap, 'flex items-center gap-6 py-3')}>
        <a href="/" className="mr-auto flex items-center gap-3 no-underline">
          <Avatar />
          <span className="leading-tight">
            <span className="block font-semibold">Fidel Castrol</span>
            <span className="text-ash block text-xs">{status}</span>
          </span>
        </a>
        <nav aria-label="Main" className="hidden gap-2 md:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="border-coal-line text-ash hover:bg-panel hover:text-bone rounded-full border px-3.5 py-1.5 text-sm no-underline transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={cta.href}
          className="bg-green text-coal-2 rounded-full px-4 py-2 text-sm font-semibold no-underline transition-opacity hover:opacity-90"
        >
          {cta.label}
        </a>
      </div>
    </header>
  )
}

/** "Let's talk" block + footer, shared by both pages. */
export function Contact({
  whatsapp,
  subject,
  footerLink,
}: {
  whatsapp: string
  subject: string
  footerLink: { href: string; label: string }
}) {
  const rows: [string, string, string, boolean][] = [
    ['WhatsApp', contact.phoneDisplay, whatsapp, true],
    ['Email', contact.email, mail(subject), false],
    ['Phone', contact.phoneDisplay, `tel:${contact.phone}`, false],
  ]
  return (
    <section id="contact" className="scroll-mt-20">
      <div className={cn(wrap, 'py-28 md:py-40')}>
        <Reveal>
          <h2 className={cn(serif, 'text-[clamp(64px,13vw,210px)] leading-[.85]')}>
            Let’s <em className="text-green">talk.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="border-coal-line mt-16 grid grid-cols-1 border-t md:grid-cols-3">
          {rows.map(([k, v, href, ext]) => (
            <a
              key={k}
              href={href}
              {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
              className="border-coal-line group flex items-center justify-between gap-4 border-b py-7 no-underline md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <span className="min-w-0">
                <span className="text-ash block text-sm">{k}</span>
                <span className="group-hover:text-green mt-1 block truncate text-lg transition-colors">
                  {v}
                </span>
              </span>
              <ArrowUpRight className="text-ash group-hover:text-green shrink-0 transition-all group-hover:rotate-45" />
            </a>
          ))}
        </Reveal>
      </div>
      <footer
        className={cn(
          wrap,
          'text-ash flex flex-wrap justify-between gap-3 border-t border-white/5 py-6 text-sm',
        )}
      >
        <p>© {new Date().getFullYear()} Fidel Castrol</p>
        <div className="flex gap-6">
          <a href={footerLink.href} className="hover:text-green no-underline">
            {footerLink.label}
          </a>
          <a href="/Fidel-Castrol-Resume.pdf" download className="hover:text-green no-underline">
            Resume (PDF)
          </a>
        </div>
      </footer>
    </section>
  )
}
