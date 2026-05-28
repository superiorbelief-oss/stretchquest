import { useEffect, useRef } from "react"

function SpeechGuide({ text, enabled }) {
  const voiceRef = useRef(null)

  useEffect(() => {
    function loadVoice() {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) return

      const preferred = [
        "Samantha",
        "Karen",
        "Moira",
        "Tessa",
        "Veena",
        "Fiona",
        "Daniel",
        "Arthur",
        "Serena",
      ]

      let chosen = null
      for (const name of preferred) {
        const match = voices.find(v => v.name.includes(name))
        if (match) { chosen = match; break }
      }

      if (!chosen) {
        chosen = voices.find(v => v.lang === "en-GB") ||
                 voices.find(v => v.lang === "en-US") ||
                 voices.find(v => v.lang.startsWith("en")) ||
                 voices[0]
      }

      voiceRef.current = chosen
    }

    loadVoice()
    window.speechSynthesis.onvoiceschanged = loadVoice
  }, [])

  useEffect(() => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    if (!enabled || !text) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.88
    utterance.pitch = 0.95
    utterance.volume = 1

    if (voiceRef.current) utterance.voice = voiceRef.current

    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 500)

    return () => window.speechSynthesis.cancel()
  }, [text, enabled])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) window.speechSynthesis.cancel()
    }
    const handleUnload = () => window.speechSynthesis.cancel()

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleUnload)
    window.addEventListener("pagehide", handleUnload)

    return () => {
      window.speechSynthesis.cancel()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleUnload)
      window.removeEventListener("pagehide", handleUnload)
    }
  }, [])

  return null
}

export default SpeechGuide