import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { serif, wrap } from '@/lib/layout'
import { contact } from '@/data'

const mail = (subject: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

export function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="text-ash flex items-center gap-3 text-[13px] tracking-[.18em] uppercase">
      <span className="text-gold">{n}</span>
      <span className="bg-coal-line h-px w-10" />
      {children}
    </p>
  )
}

export function Header({
  links,
  cta,
}: {
  links: readonly (readonly [href: string, label: string])[]
  cta: { href: string; label: string }
}) {
  return (
    <header className="bg-coal/80 sticky top-0 z-50 border-b border-white/5 backdrop-blur-md">
      <div className={cn(wrap, 'flex items-center gap-8 py-4')}>
        <a href="/" className={cn(serif, 'mr-auto text-2xl no-underline')}>
          Fidel Castrol<span className="text-gold">.</span>
        </a>
        <nav aria-label="Main" className="text-ash hidden gap-7 text-sm md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-bone no-underline transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <a
          href={cta.href}
          className="border-gold/60 text-gold hover:bg-gold hover:text-coal rounded-full border px-4 py-2 text-sm font-medium no-underline transition-colors"
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
            Let’s <em className="text-gold">talk.</em>
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
                <span className="group-hover:text-gold mt-1 block truncate text-lg transition-colors">
                  {v}
                </span>
              </span>
              <ArrowUpRight className="text-ash group-hover:text-gold shrink-0 transition-all group-hover:rotate-45" />
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
          <a href={footerLink.href} className="hover:text-gold no-underline">
            {footerLink.label}
          </a>
          <a href="/Fidel-Castrol-Resume.pdf" download className="hover:text-gold no-underline">
            Resume (PDF)
          </a>
        </div>
      </footer>
    </section>
  )
}
