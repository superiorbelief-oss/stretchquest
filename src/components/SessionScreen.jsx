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

  const speechText = resting ? null : currentStretch.name + ". " + currentSide + ". " + currentStretch.instruction + ". Hold for " + currentStretch.duration + " seconds."

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
    <div style={{ minHeight: "100vh", background: "var(--base)", padding: "24px 20px 100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "var(--dim)", letterSpacing: "0.15em", marginBottom: "8px" }}>
          <span>{currentStretch.muscle.toUpperCase()}</span>
          <span>{completedSteps + 1} / {totalSteps}</span>
        </div>
        <div style={{ height: "2px", background: "var(--border)", borderRadius: "1px" }}>
          <div style={{ width: (completedSteps / totalSteps) * 100 + "%", height: "2px", background: "var(--accent)", borderRadius: "1px", transition: "width 0.3s" }} />
        </div>
      </div>

      {paused ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.2em" }}>PAUSED</div>
          <button onClick={() => setPaused(false)} style={{ background: "var(--accent)", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "14px 40px", fontSize: "12px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.1em" }}>RESUME</button>
          <div style={{ fontSize: "10px", color: "var(--dim)", letterSpacing: "0.05em" }}>or say "resume"</div>
        </div>
      ) : resting ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.2em" }}>REST</div>
          <div style={{ fontSize: "22px", fontWeight: "500", color: "var(--text)" }}>Next up</div>
          <div style={{ fontSize: "14px", color: "var(--accent)" }}>{routine.stretches[currentIndex + 1]?.name}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px", gap: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "var(--text)", marginBottom: "8px", letterSpacing: "0.03em" }}>{currentStretch.name}</div>
            <span style={{ fontSize: "9px", color: "var(--accent)", background: "var(--accent-bg)", padding: "4px 14px", borderRadius: "2px", letterSpacing: "0.1em" }}>{currentSide.toUpperCase()}</span>
          </div>

          <Timer key={currentIndex + "-" + currentSideIndex} duration={currentStretch.duration} onComplete={handleTimerComplete} paused={paused} />

          {currentStretch.animation && (
            <StretchAnimation animationPath={currentStretch.animation} />
          )}

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--border)", borderRadius: "4px", padding: "14px", width: "100%" }}>
            <div style={{ fontSize: "11px", color: "var(--muted)", textAlign: "center", lineHeight: "1.7" }}>{currentStretch.instruction}</div>
            <div style={{ fontSize: "10px", color: "var(--accent)", textAlign: "center", marginTop: "8px", fontStyle: "italic", opacity: 0.8 }}>{currentStretch.science}</div>
          </div>

          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <button onClick={() => setGameMode("tap")} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid " + (gameMode === "tap" ? "var(--accent)" : "var(--border)"), background: gameMode === "tap" ? "var(--accent-bg)" : "var(--card)", color: gameMode === "tap" ? "var(--accent)" : "var(--dim)", fontSize: "10px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.08em" }}>TAP GAME</button>
            <button onClick={() => setGameMode("balance")} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid " + (gameMode === "balance" ? "var(--accent)" : "var(--border)"), background: gameMode === "balance" ? "var(--accent-bg)" : "var(--card)", color: gameMode === "balance" ? "var(--accent)" : "var(--dim)", fontSize: "10px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.08em" }}>BALANCE GAME</button>
            <button onClick={() => setSpeechEnabled(s => !s)} style={{ padding: "10px 12px", borderRadius: "4px", border: "1px solid " + (speechEnabled ? "var(--accent)" : "var(--border)"), background: speechEnabled ? "var(--accent-bg)" : "var(--card)", color: speechEnabled ? "var(--accent)" : "var(--dim)", fontSize: "10px", cursor: "pointer", letterSpacing: "0.08em" }}>
              {speechEnabled ? "VOX ON" : "VOX OFF"}
            </button>
          </div>

          {gameMode === "tap" ? (
            <MiniGame key={"game-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          ) : (
            <BalanceGame key={"balance-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          )}

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "10px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.1em" }}>SAY: NEXT · PAUSE · RESUME · DONE</div>
          </div>
        </div>
      )}

      <SpeechGuide text={speechText} enabled={speechEnabled} />
      <VoiceControl onCommand={handleVoiceCommand} />
    </div>
  )
}

export default SessionScreen