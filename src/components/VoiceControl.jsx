import { useEffect, useState } from "react"

function VoiceControl({ onCommand }) {
  const [listening, setListening] = useState(false)
  const [lastCommand, setLastCommand] = useState("")
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setSupported(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase()
      setLastCommand(transcript)

      if (transcript.includes("start")) onCommand("start")
      else if (transcript.includes("next")) onCommand("next")
      else if (transcript.includes("pause")) onCommand("pause")
      else if (transcript.includes("done")) onCommand("done")
      else if (transcript.includes("resume")) onCommand("resume")
    }

    recognition.onend = () => {
      if (listening) recognition.start()
    }

    if (listening) {
      recognition.start()
    }

    return () => recognition.abort()
  }, [listening])

  if (!supported) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-2">
      <button
        onClick={() => setListening(l => !l)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all"
        style={{ background: listening ? "#7c3aed" : "#e9d5ff" }}
      >
        <span className="text-2xl">{listening ? "🎙️" : "🔇"}</span>
      </button>
      {listening && lastCommand ? (
        <div className="bg-white rounded-xl px-3 py-1 shadow text-xs text-gray-500">
          heard: {lastCommand}
        </div>
      ) : null}
      {listening && (
        <div className="text-xs text-purple-500 font-medium">listening...</div>
      )}
    </div>
  )
}

export default VoiceControl