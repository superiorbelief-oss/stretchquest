import { useEffect, useRef, useState } from "react"

function VoiceControl({ onCommand }) {
  const [listening, setListening] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)
  const onCommandRef = useRef(onCommand)

  useEffect(() => { onCommandRef.current = onCommand }, [onCommand])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) { setSupported(false); return }
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-US"
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
      setLastCommand(transcript)
      if (transcript.includes("next")) onCommandRef.current("next")
      else if (transcript.includes("pause")) onCommandRef.current("pause")
      else if (transcript.includes("resume")) onCommandRef.current("resume")
      else if (transcript.includes("done")) onCommandRef.current("done")
      else if (transcript.includes("start")) onCommandRef.current("start")
    }
    recognition.onend = () => { if (recognition.shouldRestart) recognition.start() }
    recognitionRef.current = recognition
  }, [])

  useEffect(() => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.shouldRestart = true
      try { recognitionRef.current.start() } catch(e) {}
    } else {
      recognitionRef.current.shouldRestart = false
      try { recognitionRef.current.abort() } catch(e) {}
    }
  }, [listening])

  if (!supported) return null

  return (
    <div style={{ position: "fixed", bottom: "80px", right: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <button onClick={() => setListening(l => !l)} style={{ width: "48px", height: "48px", borderRadius: "4px", border: "1px solid " + (listening ? "var(--accent)" : "var(--border)"), background: listening ? "var(--accent-bg)" : "var(--card)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="1" width="6" height="9" rx="3" stroke={listening ? "#c8a882" : "#666"} strokeWidth="1.2"/>
          <path d="M2 8c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke={listening ? "#c8a882" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="8" y1="14" x2="8" y2="16" stroke={listening ? "#c8a882" : "#666"} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      {listening && (
        <div style={{ fontSize: "8px", color: "var(--accent)", letterSpacing: "0.1em" }}>LIVE</div>
      )}
    </div>
  )
}

export default VoiceControl
