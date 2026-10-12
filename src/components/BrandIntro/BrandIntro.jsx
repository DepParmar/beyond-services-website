import { useEffect, useLayoutEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import Logo from '../Logo'
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion'
import './BrandIntro.css'

const VIDEO_SRC = '/intro/bs_intro_final_converted.mp4'
// The film is 4.5s: grid lines draw in, then the BS mark turns sharp at ~2.86s.
// We skip the near-empty first 0.8s and play at 2x, so the mark resolves ~0.9s in.
const VIDEO_START = 0.8
const VIDEO_RATE = 2
const LOGO_CUE = 2.62 // film time at which the real logo takes over from the film's mark
const START_TIMEOUT = 1600 // ms to wait for playback before falling back to the logo alone
const HOLD = 400 // ms the sharp logo holds before the hand-off
const SAFETY_TIMEOUT = 6000

/**
 * Full-screen brand reveal. Calls `onExitStart({ flying })` when the hand-off
 * begins, and `onComplete()` once the logo has landed on `targetRef` (the header logo).
 */
export default function BrandIntro({ targetRef, onExitStart, onComplete }) {
  const reduce = useReducedMotion()
  const groundRef = useRef(null)
  const videoRef = useRef(null)
  const logoRef = useRef(null)
  const haloRef = useRef(null)
  // Keep the latest callbacks without restarting the sequence.
  const callbacks = useRef({ onExitStart, onComplete })
  useLayoutEffect(() => {
    callbacks.current = { onExitStart, onComplete }
  })

  useEffect(() => {
    const ground = groundRef.current
    const video = videoRef.current
    const logo = logoRef.current
    const halo = haloRef.current
    const timers = []
    let frame = 0
    let settle = null
    let revealed = false
    let exiting = false
    let done = false

    const finish = () => {
      if (done) return
      done = true
      callbacks.current.onComplete()
    }

    const exit = () => {
      if (exiting) return
      exiting = true
      cancelAnimationFrame(frame)
      settle?.stop()
      revealed = true
      // The final logo is always fully opaque and sharp before it moves.
      logo.style.opacity = '1'
      logo.style.filter = 'none'
      logo.style.transform = 'none'

      const target = targetRef.current?.getBoundingClientRect()
      const from = logo.getBoundingClientRect()
      const canFly = !reduce && target && target.width > 0

      callbacks.current.onExitStart({ flying: canFly })
      animate([ground, video, halo], { opacity: 0 }, { duration: reduce ? 0.4 : 0.8, ease: EASE_IN_OUT })

      if (canFly) {
        const dx = target.left + target.width / 2 - (from.left + from.width / 2)
        const dy = target.top + target.height / 2 - (from.top + from.height / 2)
        animate(logo, { x: dx, y: dy, scale: target.width / from.width }, { duration: 0.9, ease: EASE_IN_OUT }).then(finish)
      } else {
        animate(logo, { opacity: 0 }, { duration: 0.4 }).then(finish)
      }
    }

    const revealLogo = () => {
      if (revealed) return
      revealed = true
      cancelAnimationFrame(frame)
      settle = reduce
        ? animate(logo, { opacity: [0, 1] }, { duration: 0.35 })
        : animate(
            logo,
            { opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'], scale: [0.95, 1] },
            { duration: 0.7, ease: EASE_OUT },
          )
      animate(halo, { opacity: 1 }, { duration: reduce ? 0.35 : 0.5 })
      if (!reduce) animate(video, { opacity: 0.5 }, { duration: 0.7 })
      settle.then(() => {
        // Motion commits its last keyframe (blur(0px)) after resolving; clear the
        // filter a frame later so the held logo has no filter at all.
        requestAnimationFrame(() => {
          if (!exiting) logo.style.filter = 'none'
        })
        timers.push(setTimeout(exit, reduce ? 700 : HOLD))
      })
    }

    // Logo-only path: reduced motion, autoplay refused, or the film failed to load.
    const fallback = () => {
      video.style.display = 'none'
      revealLogo()
    }

    const watchCue = () => {
      if (video.currentTime >= LOGO_CUE) revealLogo()
      else frame = requestAnimationFrame(watchCue)
    }

    let startTimer = 0
    const onPlaying = () => {
      clearTimeout(startTimer)
      if (revealed) return
      animate(video, { opacity: 1 }, { duration: 0.3 })
      frame = requestAnimationFrame(watchCue)
    }

    if (reduce) {
      fallback()
    } else {
      startTimer = setTimeout(() => !revealed && fallback(), START_TIMEOUT)
      timers.push(startTimer)
      video.addEventListener('playing', onPlaying, { once: true })
      video.addEventListener('error', fallback, { once: true })
      video.currentTime = VIDEO_START
      video.defaultPlaybackRate = VIDEO_RATE
      video.playbackRate = VIDEO_RATE
      video.play().catch(fallback)
    }

    // Any key or tap skips straight to the hand-off.
    const skip = () => exit()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    timers.push(setTimeout(exit, SAFETY_TIMEOUT))

    return () => {
      cancelAnimationFrame(frame)
      settle?.stop()
      timers.forEach(clearTimeout)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', fallback)
      video.pause() // a re-run (StrictMode) then gets a fresh 'playing' event
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [reduce, targetRef])

  return (
    <div className="brand-intro" aria-hidden="true">
      <div ref={groundRef} className="brand-intro__ground" />
      <video
        ref={videoRef}
        className="brand-intro__video"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
      />
      <div className="brand-intro__stage">
        <div ref={haloRef} className="brand-intro__halo" />
        <Logo ref={logoRef} className="brand-intro__logo" alt="" />
      </div>
    </div>
  )
}
