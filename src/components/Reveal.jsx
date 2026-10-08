import { motion } from 'framer-motion'

export const ease = [0.2, 0.7, 0.2, 1]

/** Fades + lifts children into view once. Pass `as` for a different tag (li, article…). */
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
