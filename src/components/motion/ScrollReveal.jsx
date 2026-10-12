import { motion, useReducedMotion } from 'motion/react'
import { reveal, stagger as staggerVariants } from '../../lib/motion'

// Reveals its content once as it enters the viewport.
// variant: 'fade' | 'up' | 'slide' | 'scale' | 'text'.
// With `stagger`, direct children that are <ScrollReveal.Item> animate in sequence.
export default function ScrollReveal({
  as = 'div',
  variant = 'up',
  stagger,
  delay = 0,
  amount = 0.3,
  className,
  children,
  ...props
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const base = stagger ? staggerVariants(stagger, delay) : reveal[variant]
  // Reduced motion keeps only the opacity fade, without movement.
  const variants = reduce && !stagger ? reveal.fade : base

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={stagger ? undefined : { delay }}
      {...props}
    >
      {children}
    </Tag>
  )
}

function Item({ as = 'div', variant = 'up', className, children, ...props }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag className={className} variants={reduce ? reveal.fade : reveal[variant]} {...props}>
      {children}
    </Tag>
  )
}

ScrollReveal.Item = Item
