import { useState, type ReactNode } from 'react'
import { CheckCheck, Crosshair } from 'lucide-react'
import { cn } from '@/lib/cn'
import { wrap } from '@/lib/layout'
import { contact } from '@/data'

const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

export function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="text-[12.5px]">
      <span className="font-semibold">{n} —</span> <span className="text-muted">{children}</span>
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
        'bg-ink text-paper grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold',
        className,
      )}
    >
      FC
    </span>
  )
}

/** A chat message. Incoming sits left on paper, outgoing right in blue with read ticks. */
export function Bubble({ out, time, children }: { out?: boolean; time?: string; children: ReactNode }) {
  return (
    <div className={cn('flex', out && 'justify-end')}>
      <div
        className={cn(
          'max-w-[85%] rounded-lg px-3 pt-1.5 pb-1 text-[15px] leading-snug',
          out ? 'bg-blue text-paper rounded-tr-none' : 'bg-paper border-line rounded-tl-none border',
        )}
      >
        {children}
        {time && (
          <span
            className={cn(
              'float-right mt-2 ml-3 flex items-center gap-1 text-[11px] leading-none',
              out ? 'text-paper/70' : 'text-muted',
            )}
          >
            {time}
            {out && <CheckCheck size={15} />}
          </span>
        )}
      </div>
    </div>
  )
}

/** Thin top bar: name and role on the left, links and location on the right. */
export function Header({
  role,
  links,
}: {
  role: string
  links: readonly (readonly [href: string, label: string])[]
}) {
  return (
    <header className="bg-paper/90 sticky top-0 z-50 backdrop-blur-md">
      <div className={cn(wrap, 'border-ink flex items-center gap-6 border-b py-3.5 text-[13px]')}>
        <a href="/" className="mr-auto no-underline">
          <span className="font-semibold">Fidel Castrol</span>
          <span className="text-muted hidden sm:inline"> — {role}</span>
        </a>
        <nav aria-label="Main" className="text-muted hidden gap-5 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-ink no-underline transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <span className="hidden items-center gap-1.5 lg:flex">
          <Crosshair size={14} className="text-red" aria-hidden="true" />
          <span className="font-semibold">Homa Bay,</span> <span className="text-muted">0.53°S</span>
        </span>
        <span className="text-muted">
          Index <span className="text-ink font-semibold">’19–’26</span>
        </span>
      </div>
    </header>
  )
}

/** Colophon footer with contact details, shared by both pages. */
export function Contact({
  whatsapp,
  subject,
  footerLink,
}: {
  whatsapp: string
  subject: string
  footerLink: { href: string; label: string }
}) {
  const link = 'border-ink/40 hover:border-blue hover:text-blue border-b no-underline transition-colors'
  return (
    <footer id="contact" className={cn(wrap, 'scroll-mt-20 pt-24 pb-16')}>
      <div className="border-ink grid grid-cols-1 gap-y-10 border-t pt-6 md:grid-cols-[140px_1fr]">
        <p className="text-muted hidden text-[11px] leading-relaxed md:block">
          Set in Inter.
          <br />
          Made in Homa Bay, Kenya.
          <br />
          <br />
          No. 01 / {new Date().getFullYear()}
        </p>
        <div className="md:border-line grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr_1fr_1fr] md:border-l md:pl-6">
          <div>
            <p className="text-2xl font-bold tracking-[-.03em]">
              Fidel Castrol<span className="text-blue">,</span> coach
            </p>
            <p className="text-muted mt-2 text-[13px]">
              Messages welcome. WhatsApp is the quickest way to reach me.
            </p>
          </div>
          <div className="text-[14px]">
            <p className="text-muted mb-3 text-[11px]">Contact</p>
            <ul className="space-y-1.5">
              <li>
                <a href={whatsapp} target="_blank" rel="noopener" className={link}>
                  WhatsApp — {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mail(subject)} className={link}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className={link}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="text-ink-2">{contact.location}</li>
            </ul>
          </div>
          <div className="text-[14px]">
            <p className="text-muted mb-3 text-[11px]">Elsewhere</p>
            <ul className="space-y-1.5">
              <li>
                <a href={footerLink.href} className={link}>
                  {footerLink.label}
                </a>
              </li>
              <li>
                <a href="/Fidel-Castrol-Resume.pdf" download className={link}>
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
