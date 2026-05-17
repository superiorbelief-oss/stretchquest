import { useEffect, useRef, useState } from "react"

function VoiceControl({ onCommand }) {
  const [listening, setListening] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)
  const onCommandRef = useRef(onCommand)

  useEffect(() => {
    onCommandRef.current = onCommand
  }, [onCommand])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
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
    recognition.onend = () => {
      if (recognition.shouldRestart) recognition.start()
    }
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
    <div style={{ position: "fixed", bottom: "24px", right: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <button
        onClick={() => setListening(l => !l)}
        style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid " + (listening ? "#ff6b2b" : "#333"), background: listening ? "#1f1208" : "#141414", cursor: "pointer", fontSize: "20px" }}
      >
        {listening ? "🎙️" : "🔇"}
      </button>
      {listening && lastCommand ? (
        <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "8px", padding: "3px 10px", fontSize: "11px", color: "#555" }}>
          {lastCommand}
        </div>
      ) : null}
      {listening && (
        <div style={{ fontSize: "10px", color: "#ff6b2b" }}>listening</div>
      )}
    </div>
  )
}

export default VoiceControl
