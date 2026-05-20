import { useState } from "react"
import Timer from "./Timer"
import MiniGame from "./MiniGame"
import VoiceControl from "./VoiceControl"
import BalanceGame from "./BalanceGame"
import StretchAnimation from "./StretchAnimation"
import SpeechGuide from "./SpeechGuide"

function SessionScreen({ routine, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSideIndex, setCurrentSideIndex] = useState(0)
  const [resting, setResting] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)
  const [paused, setPaused] = useState(false)
  const [gameMode, setGameMode] = useState("tap")
  const [speechEnabled, setSpeechEnabled] = useState(true)

  const currentStretch = routine.stretches[currentIndex]
  const currentSide = currentStretch.sides[currentSideIndex]
  const isLastSide = currentSideIndex + 1 >= currentStretch.sides.length
  const isLastStretch = currentIndex + 1 >= routine.stretches.length

  const speechText = resting
    ? null
    : currentStretch.name + ". " + currentSide + ". " + currentStretch.instruction + ". Hold for " + currentStretch.duration + " seconds."

  function handleTimerComplete() {
    const newSessionScore = sessionScore + gameScore
    setSessionScore(newSessionScore)
    setGameScore(0)
    if (!isLastSide) {
      setCurrentSideIndex(i => i + 1)
    } else if (isLastStretch) {
      onComplete(newSessionScore)
    } else {
      setResting(true)
      setTimeout(() => {
        setCurrentIndex(i => i + 1)
        setCurrentSideIndex(0)
        setResting(false)
      }, 3000)
    }
  }

  function handleVoiceCommand(command) {
    if (command === "next") handleTimerComplete()
    if (command === "pause") setPaused(true)
    if (command === "resume") setPaused(false)
    if (command === "done") onComplete(sessionScore + gameScore)
  }

  const totalSteps = routine.stretches.reduce((acc, s) => acc + s.sides.length, 0)
  const completedSteps = routine.stretches.slice(0, currentIndex).reduce((acc, s) => acc + s.sides.length, 0) + currentSideIndex

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#555", letterSpacing: "0.05em", marginBottom: "8px" }}>
          <span>{currentStretch.muscle.toUpperCase()}</span>
          <span>{completedSteps + 1} OF {totalSteps} SIDES</span>
        </div>
        <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px" }}>
          <div style={{ width: (completedSteps / totalSteps) * 100 + "%", height: "3px", background: "#ff6b2b", borderRadius: "2px", transition: "width 0.3s" }} />
        </div>
      </div>

      {paused ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ fontSize: "24px", fontWeight: "500", color: "#ffffff" }}>Paused</div>
          <button onClick={() => setPaused(false)} style={{ background: "#ff6b2b", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 40px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>Resume</button>
          <div style={{ fontSize: "12px", color: "#555" }}>or say resume</div>
        </div>
      ) : resting ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "500", color: "#ffffff" }}>Rest</div>
          <div style={{ fontSize: "13px", color: "#555" }}>Next: {routine.stretches[currentIndex + 1]?.name}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px", gap: "14px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", fontWeight: "500", color: "#ffffff", marginBottom: "8px" }}>{currentStretch.name}</div>
            <span style={{ fontSize: "11px", color: "#ff6b2b", background: "#1f1208", padding: "4px 14px", borderRadius: "20px" }}>{currentSide}</span>
          </div>

          <Timer key={currentIndex + "-" + currentSideIndex} duration={currentStretch.duration} onComplete={handleTimerComplete} paused={paused} />

          {currentStretch.animation && (
            <StretchAnimation animationPath={currentStretch.animation} />
          )}

          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "14px", padding: "14px", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#888", textAlign: "center", lineHeight: "1.6" }}>{currentStretch.instruction}</div>
            <div style={{ fontSize: "11px", color: "#ff6b2b", textAlign: "center", marginTop: "8px", fontStyle: "italic", opacity: 0.8 }}>{currentStretch.science}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setGameMode("tap")} style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid " + (gameMode === "tap" ? "#ff6b2b" : "#222"), background: gameMode === "tap" ? "#1f1208" : "#141414", color: gameMode === "tap" ? "#ff6b2b" : "#555", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>Tap game</button>
              <button onClick={() => setGameMode("balance")} style={{ padding: "8px 14px", borderRadius: "10px", border: "1px solid " + (gameMode === "balance" ? "#ff6b2b" : "#222"), background: gameMode === "balance" ? "#1f1208" : "#141414", color: gameMode === "balance" ? "#ff6b2b" : "#555", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>Balance game</button>
            </div>
            <button onClick={() => setSpeechEnabled(s => !s)} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid " + (speechEnabled ? "#ff6b2b" : "#222"), background: speechEnabled ? "#1f1208" : "#141414", color: speechEnabled ? "#ff6b2b" : "#555", fontSize: "12px", cursor: "pointer" }}>
              {speechEnabled ? "Voice on" : "Voice off"}
            </button>
          </div>

          {gameMode === "tap" ? (
            <MiniGame key={"game-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          ) : (
            <BalanceGame key={"balance-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          )}

          <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "12px", padding: "10px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#555" }}>Say next, pause, resume or done</div>
          </div>
        </div>
      )}

      <SpeechGuide text={speechText} enabled={speechEnabled} />
      <VoiceControl onCommand={handleVoiceCommand} />
    </div>
  )
}

export default SessionScreen