import { useEffect } from "react"

function SpeechGuide({ text, enabled }) {
  useEffect(() => {
    if (!("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

    if (!enabled || !text) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.name.includes("Samantha") ||
      v.name.includes("Karen") ||
      v.name.includes("Daniel") ||
      v.lang === "en-GB" ||
      v.lang === "en-US"
    )
    if (preferred) utterance.voice = preferred

    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 500)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [text, enabled])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.speechSynthesis.cancel()
      }
    }

    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("pagehide", handleBeforeUnload)

    return () => {
      window.speechSynthesis.cancel()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("pagehide", handleBeforeUnload)
    }
  }, [])

  return null
}

export default SpeechGuide