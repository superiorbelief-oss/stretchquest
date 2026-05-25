import { useState, useEffect } from "react"

function MiniGame({ onScoreUpdate }) {
  const [isGreen, setIsGreen] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    scheduleNext()
  }, [])

  function scheduleNext() {
    const delay = 1500 + Math.random() * 2500
    setTimeout(() => {
      setIsGreen(true)
      setTimeout(() => {
        setIsGreen(false)
        scheduleNext()
      }, 800)
    }, delay)
  }

  function handleTap() {
    if (isGreen) {
      const newScore = score + 1
      setScore(newScore)
      onScoreUpdate(newScore)
      setIsGreen(false)
      setFeedback("nice")
      setTimeout(() => setFeedback(null), 600)
    } else {
      setFeedback("miss")
      setTimeout(() => setFeedback(null), 600)
    }
  }

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "16px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.15em" }}>TAP GAME</div>
        <div style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "0.05em" }}>{score} PTS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button onClick={handleTap} style={{ width: "60px", height: "60px", borderRadius: "4px", border: "1px solid " + (isGreen ? "#5a9e6a" : "var(--border)"), background: isGreen ? "#1a3a22" : "var(--screen)", cursor: "pointer", transition: "all 0.1s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "2px", background: isGreen ? "#5a9e6a" : "var(--border)" }} />
        </button>
        <div style={{ height: "18px", marginTop: "8px", fontSize: "11px" }}>
          {feedback === "nice" && <span style={{ color: "#5a9e6a", letterSpacing: "0.05em" }}>+1</span>}
          {feedback === "miss" && <span style={{ color: "#9e5a5a", letterSpacing: "0.05em" }}>EARLY</span>}
        </div>
        <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.1em" }}>{isGreen ? "TAP NOW" : "WAIT..."}</div>
      </div>
    </div>
  )
}

export default MiniGame
