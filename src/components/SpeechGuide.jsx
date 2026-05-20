import { useEffect } from "react"

function SpeechGuide({ text, enabled }) {
  useEffect(() => {
    if (!enabled || !text) return
    if (!("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

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

    return () => window.speechSynthesis.cancel()
  }, [text, enabled])

  return null
}

export default SpeechGuide
