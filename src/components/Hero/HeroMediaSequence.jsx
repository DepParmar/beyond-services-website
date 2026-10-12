import { useEffect, useRef, useState } from 'react'
import ImageReveal from '../motion/ImageReveal'

const CROSSFADE_MS = 1400 // keep in sync with --dur-scene
const MAX_WAIT_MS = 2500 // longest we hold a scene waiting for the next film to buffer

/**
 * The three hero films as one continuous sequence.
 * Only the active scene and the one after it are given a source, so at most
 * two films download at once. The outgoing scene stays fully opaque underneath
 * while the next fades in on top, so there is never a dip to black between shots.
 */
export default function HeroMediaSequence({ scenes, index, started, playing, reduce, onAdvance, progressRefs }) {
  const videoRefs = useRef([])
  const resumeAt = useRef(scenes.map(() => 0))
  const [shownIndex, setShownIndex] = useState(index)
  const [previous, setPrevious] = useState(null)
  const [visited, setVisited] = useState(() => new Set([index]))

  // When the scene changes, record the outgoing one (it stays opaque underneath
  // during the dissolve). Adjusting state during render avoids an extra effect pass.
  if (index !== shownIndex) {
    setPrevious(shownIndex)
    setShownIndex(index)
    setVisited((set) => new Set([...set, index]))
  }

  // Films that have a source: every scene shown so far, plus the next one once
  // the hero has started (so the intro film is not competing for bandwidth).
  const next = (index + 1) % scenes.length
  const armed = new Set(visited)
  if (started) armed.add(next)
  const activeArmed = !reduce && armed.has(index)

  // Park the outgoing film once the dissolve is complete.
  useEffect(() => {
    if (previous === null) return
    const outgoing = previous
    // Rapid scene changes: anything that is neither active nor fading out stops now.
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && i !== outgoing && !video.paused) {
        resumeAt.current[i] = video.currentTime
        video.pause()
      }
    })
    const timer = setTimeout(() => {
      const video = videoRefs.current[outgoing]
      if (video) {
        resumeAt.current[outgoing] = video.currentTime
        video.pause()
      }
      setPrevious(null)
    }, CROSSFADE_MS)
    return () => clearTimeout(timer)
  }, [index, previous])

  // Cue the active film from its resume point (or the top) at its scene speed.
  useEffect(() => {
    if (reduce) return
    const scene = scenes[index]
    const video = videoRefs.current[index]
    if (!video) return
    const cue = () => {
      const start = scene.resume ? resumeAt.current[index] : 0
      // Wrap rather than land in the last seconds of a long take.
      const headroom = scene.duration * scene.playbackRate + 1
      video.currentTime = video.duration && start > video.duration - headroom ? 0 : start
      video.playbackRate = scene.playbackRate
    }
    if (video.readyState >= 1) cue()
    else video.addEventListener('loadedmetadata', cue, { once: true })
    return () => video.removeEventListener('loadedmetadata', cue)
  }, [index, reduce, scenes, activeArmed])

  // Play or pause the active film.
  useEffect(() => {
    const video = videoRefs.current[index]
    if (!video || !activeArmed) return
    if (playing) video.play().catch(() => {})
    else video.pause()
  }, [index, playing, activeArmed])

  // Scene clock. Counts only while the film is actually playing, so a stall
  // never cuts a scene short. Writes progress straight to the DOM, not React state.
  useEffect(() => {
    const fills = progressRefs.current
    const paint = (progress) =>
      fills.forEach((fill, i) => {
        if (fill) fill.style.transform = `scaleX(${i < index ? 1 : i === index ? progress : 0})`
      })

    if (reduce) {
      paint(1)
      return
    }

    const scene = scenes[index]
    const video = videoRefs.current[index]
    let elapsed = 0
    let waited = 0
    let last = performance.now()
    let frame = 0

    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      const running = playing && video && !video.paused && video.readyState >= 3
      if (running) elapsed += dt
      paint(Math.min(elapsed / scene.duration, 1))

      if (elapsed >= scene.duration) {
        const nextVideo = videoRefs.current[(index + 1) % scenes.length]
        const ready = nextVideo && nextVideo.readyState >= 2
        waited += playing ? dt * 1000 : 0
        if (ready || waited > MAX_WAIT_MS) {
          onAdvance()
          return
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [index, playing, reduce, scenes, onAdvance, progressRefs])

  return (
    <div className="hero-media">
      {scenes.map((scene, i) => {
        const state = i === index ? 'active' : i === previous ? 'previous' : 'idle'
        const isArmed = !reduce && armed.has(i)
        const video = (
          <video
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            className="hero-scene__video"
            src={isArmed ? scene.video : undefined}
            poster={scene.poster}
            muted
            loop
            playsInline
            preload={isArmed ? 'auto' : 'none'}
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            aria-hidden="true"
          />
        )
        return (
          <div
            key={scene.id}
            className={`hero-scene hero-scene--${scene.id}${scene.layout === 'split' ? ' hero-scene--split' : ''}`}
            data-state={state}
            style={scene.focus ? { '--focus': scene.focus } : undefined}
          >
            {scene.layout === 'split' ? (
              <ImageReveal className="hero-scene__frame" from="right" active={state !== 'idle'} duration={1.3}>
                {video}
              </ImageReveal>
            ) : (
              <div className="hero-scene__frame">{video}</div>
            )}
            <div className="hero-scene__scrim" />
          </div>
        )
      })}
    </div>
  )
}
