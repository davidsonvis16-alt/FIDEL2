import { motion, type HTMLMotionProps } from 'motion/react'
import { ease } from '@/lib/motion'
import type { ReactNode } from 'react'

type Tag = 'div' | 'li' | 'article' | 'figure' | 'blockquote' | 'ul'

type RevealProps = {
  as?: Tag
  delay?: number
  y?: number
  className?: string
  children?: ReactNode
} & Omit<HTMLMotionProps<'div'>, 'children'>

/** Fades + lifts children into view once. */
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
