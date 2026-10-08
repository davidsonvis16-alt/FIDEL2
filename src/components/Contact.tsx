import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import { contact } from '@/data'

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="bg-night relative overflow-hidden border-t border-[#2a2a27] px-4 pt-10 pb-28 text-white sm:px-[4vw] xl:px-14"
      >
        <svg
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="stroke-sun absolute -bottom-2.5 -left-2.5 w-[200px] fill-none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M10 100 L60 20 L45 70 L105 15 L70 95 L95 60"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </svg>
        <div className="relative mx-auto max-w-[1280px] pt-20 text-center">
          <Reveal>
            <p className="font-hand text-sun inline-block -rotate-3 text-[34px] leading-none">
              Let’s create a plan that works for you.
            </p>
            <h2 className="font-display mt-5 mb-9 text-[clamp(44px,7vw,104px)] leading-[.95] font-extrabold [font-stretch:78%]">
              Ready to build your
              <br />
              success story?
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col justify-center gap-3.5 sm:flex-row">
            <a
              className="btn btn-lg border-sun bg-sun text-ink shadow-[3px_3px_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#fff]"
              href={contact.whatsapp}
              target="_blank"
              rel="noopener"
            >
              Book on WhatsApp{' '}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="btn btn-lg hover:text-ink border-white text-white hover:bg-white"
              href="/Fidel-Castrol-Resume.pdf"
              download
            >
              Download Resume
            </a>
          </Reveal>
          <Reveal
            as="ul"
            delay={0.25}
            className="mt-16 flex flex-wrap justify-center gap-x-14 gap-y-4 border-t border-[#2f2f2c] pt-8"
          >
            {(
              [
                ['Phone', <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>],
                ['Email', <a href={`mailto:${contact.email}`}>{contact.email}</a>],
                ['Based in', contact.location],
              ] as [string, ReactNode][]
            ).map(([k, v]) => (
              <li
                key={k}
                className="[&_a]:border-sun flex flex-col gap-1 text-[17px] [&_a]:border-b-[1.5px] [&_a]:no-underline"
              >
                <span className="text-[11px] tracking-[.18em] text-[#8d8b84] uppercase">{k}</span>
                {v}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <footer className="bg-night flex flex-wrap justify-between gap-2.5 border-t border-[#2a2a27] px-4 py-5 text-[13.5px] text-[#8d8b84] sm:px-[4vw] xl:px-14">
        <p>© {new Date().getFullYear()} Fidel Castrol · Student Success Coach</p>
        <a href="#top" className="hover:text-sun no-underline">
          Back to top ↑
        </a>
      </footer>
    </>
  )
}
