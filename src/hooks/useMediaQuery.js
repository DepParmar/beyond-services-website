import { useSyncExternalStore } from 'react'

/** Live boolean for a CSS media query, e.g. useMediaQuery('(min-width: 768px)'). */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

// Desktop-class pointer and width: where parallax and scroll-linked depth are worth their cost.
export const RICH_MOTION_QUERY = '(min-width: 768px) and (hover: hover)'
