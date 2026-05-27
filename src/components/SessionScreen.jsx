import { useState } from "react"
import Timer from "./Timer"
import VoiceControl from "./VoiceControl"
import BalanceGame from "./BalanceGame"
import StabilityGame from "./StabilityGame"
import StretchAnimation from "./StretchAnimation"
import SpeechGuide from "./SpeechGuide"
import StretchIllustration from "./StretchIllustration"

function SessionScreen({ routine, onComplete, difficulty }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSideIndex, setCurrentSideIndex] = useState(0)
  const [currentRep, setCurrentRep] = useState(1)
  const [resting, setResting] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)
  const [paused, setPaused] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [positionConfirmed, setPositionConfirmed] = useState(false)

  const currentStretch = routine.stretches[currentIndex]
  const currentSide = currentStretch.sides[currentSideIndex]
  const totalReps = currentStretch.reps || 1
  const isLastRep = currentRep >= totalReps
  const isLastSide = currentSideIndex + 1 >= currentStretch.sides.length
  const isLastStretch = currentIndex + 1 >= routine.stretches.length

  const speechText = resting ? null : currentStretch.name + ". " + currentSide + ". Rep " + currentRep + " of " + totalReps + ". " + currentStretch.instruction + ". Hold for " + currentStretch.duration + " seconds."

  function handleTimerComplete() {
    setPositionConfirmed(false)
    const newSessionScore = sessionScore + gameScore
    setSessionScore(newSessionScore)
    setGameScore(0)
    if (!isLastRep) {
      setCurrentRep(r => r + 1)
      return
    }
    if (!isLastSide) {
      setCurrentSideIndex(i => i + 1)
      setCurrentRep(1)
      return
    }
    if (!isLastStretch) {
      setResting(true)
      setTimeout(() => {
        setCurrentIndex(i => i + 1)
        setCurrentSideIndex(0)
        setCurrentRep(1)
        setResting(false)
      }, 3000)
      return
    }
    onComplete(newSessionScore)
  }

  function handleVoiceCommand(command) {
    if (command === "next") handleTimerComplete()
    if (command === "pause") setPaused(true)
    if (command === "resume") setPaused(false)
    if (command === "done") onComplete(sessionScore + gameScore)
  }

  const totalSteps = routine.stretches.reduce((acc, s) => acc + (s.sides.length * (s.reps || 1)), 0)
  const completedSteps = routine.stretches.slice(0, currentIndex).reduce((acc, s) => acc + (s.sides.length * (s.reps || 1)), 0) + (currentSideIndex * totalReps) + (currentRep - 1)

  return (
    <div style={{ minHeight: "100vh", background: "#28282D", padding: "24px 20px 100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>
          <span>{currentStretch.muscle.toUpperCase()}</span>
          <span>REP {currentRep} OF {totalReps}</span>
        </div>
        <div style={{ height: "2px", background: "#3e3e43", borderRadius: "1px" }}>
          <div style={{ width: (completedSteps / totalSteps) * 100 + "%", height: "2px", background: "#c8a882", borderRadius: "1px", transition: "width 0.3s" }} />
        </div>
      </div>
      {paused ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em" }}>PAUSED</div>
          <button onClick={() => setPaused(false)} style={{ background: "#c8a882", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "14px 40px", fontSize: "12px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.1em" }}>RESUME</button>
          <div style={{ fontSize: "10px", color: "#555", letterSpacing: "0.05em" }}>or say resume</div>
        </div>
      ) : resting ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em" }}>REST</div>
          <div style={{ fontSize: "22px", fontWeight: "500", color: "#f0ede8" }}>Next up</div>
          <div style={{ fontSize: "14px", color: "#c8a882" }}>{routine.stretches[currentIndex + 1]?.name}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "400px", gap: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "500", color: "#f0ede8", marginBottom: "8px", letterSpacing: "0.03em" }}>{currentStretch.name}</div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              <span style={{ fontSize: "9px", color: "#c8a882", background: "#2a2318", padding: "4px 14px", borderRadius: "2px", letterSpacing: "0.1em" }}>{currentSide.toUpperCase()}</span>
              <span style={{ fontSize: "9px", color: "#555", background: "#343438", padding: "4px 14px", borderRadius: "2px", letterSpacing: "0.1em" }}>REP {currentRep}/{totalReps}</span>
            </div>
          </div>
          <StretchIllustration stretchId={currentStretch.id} />
          {currentStretch.id === 1 ? (
            <StabilityGame
              key={"stability-" + currentIndex + "-" + currentSideIndex + "-" + currentRep}
              onScoreUpdate={setGameScore}
              difficulty={difficulty}
              onPositionConfirmed={() => setPositionConfirmed(true)}
            />
          ) : (
            <BalanceGame
              key={"balance-" + currentIndex + "-" + currentSideIndex + "-" + currentRep}
              onScoreUpdate={setGameScore}
            />
          )}
          <Timer
            key={currentIndex + "-" + currentSideIndex + "-" + currentRep}
            duration={currentStretch.duration}
            onComplete={handleTimerComplete}
            paused={paused || (currentStretch.id === 1 && !positionConfirmed)}
          />
          <div style={{ background: "#343438", border: "1px solid #3e3e43", borderRadius: "4px", padding: "14px", width: "100%" }}>
            <div style={{ fontSize: "12px", color: "#888", textAlign: "center", lineHeight: "1.7" }}>{currentStretch.instruction}</div>
            <div style={{ fontSize: "10px", color: "#c8a882", textAlign: "center", marginTop: "8px", fontStyle: "italic", opacity: 0.8 }}>{currentStretch.science}</div>
          </div>
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <button onClick={() => setSpeechEnabled(s => !s)} style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid " + (speechEnabled ? "#c8a882" : "#3e3e43"), background: speechEnabled ? "#2a2318" : "#343438", color: speechEnabled ? "#c8a882" : "#555", fontSize: "10px", cursor: "pointer", letterSpacing: "0.08em" }}>
              {speechEnabled ? "VOX ON" : "VOX OFF"}
            </button>
          </div>
          <div style={{ background: "#343438", border: "1px solid #3e3e43", borderRadius: "4px", padding: "10px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.1em" }}>SAY: NEXT · PAUSE · RESUME · DONE</div>
          </div>
        </div>
      )}
      <SpeechGuide text={speechText} enabled={speechEnabled} />
      <VoiceControl onCommand={handleVoiceCommand} />
    </div>
  )
}

export default SessionScreen
