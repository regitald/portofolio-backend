import { useRef, useEffect } from 'react'

const AUDIO_URL = '/assets/space_sound.wav'
const MAX_VOLUME = 0.4
const FADE_MS = 800

const clamp = (v) => Math.max(0, Math.min(1, v))

export function SpaceAudio({ enabled }) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeRef.current) cancelAnimationFrame(fadeRef.current)

    if (enabled) {
      const targetVolume = clamp(MAX_VOLUME)
      const startVolume = clamp(audio.volume || 0)
      const startTime = performance.now()

      const fadeIn = (now) => {
        const elapsed = now - startTime
        const p = Math.min(1, elapsed / FADE_MS)
        const eased = p * (2 - p)

        const nextVolume =
          startVolume + (targetVolume - startVolume) * eased

        audio.volume = clamp(nextVolume)

        if (p < 1) {
          fadeRef.current = requestAnimationFrame(fadeIn)
        }
      }

      const play = () => {
        audio.volume = 0
        audio.muted = false
        audio.play().catch(() => {})
        fadeRef.current = requestAnimationFrame(fadeIn)
      }

      if (audio.paused) play()
      else fadeRef.current = requestAnimationFrame(fadeIn)
    } else {
      const startVolume = clamp(audio.volume || 0)
      const startTime = performance.now()

      const fadeOut = (now) => {
        const elapsed = now - startTime
        const p = Math.min(1, elapsed / FADE_MS)
        const eased = 1 - p * (2 - p)

        audio.volume = clamp(startVolume * eased)

        if (p >= 1) {
          audio.pause()
          audio.currentTime = 0
        } else {
          fadeRef.current = requestAnimationFrame(fadeOut)
        }
      }

      fadeRef.current = requestAnimationFrame(fadeOut)
    }

    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current)
    }
  }, [enabled])

  return (
    <audio
      ref={audioRef}
      src={AUDIO_URL}
      loop
      muted
      preload="metadata"
      playsInline
      aria-hidden
    />
  )
}