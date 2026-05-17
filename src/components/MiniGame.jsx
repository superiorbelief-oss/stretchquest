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
    <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "16px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.05em" }}>TAP GAME</div>
        <div style={{ fontSize: "12px", color: "#ff6b2b" }}>Score: {score}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button
          onClick={handleTap}
          style={{ width: "64px", height: "64px", borderRadius: "50%", border: "1px solid " + (isGreen ? "#1a9e75" : "#333"), background: isGreen ? "#1a9e75" : "#1a1a1a", cursor: "pointer", transition: "all 0.15s" }}
        />
        <div style={{ height: "20px", marginTop: "8px", fontSize: "12px" }}>
          {feedback === "nice" && <span style={{ color: "#1a9e75" }}>Nice! +1</span>}
          {feedback === "miss" && <span style={{ color: "#ff4444" }}>Too early!</span>}
        </div>
        <div style={{ fontSize: "11px", color: "#555" }}>
          {isGreen ? "TAP NOW!" : "Wait for green..."}
        </div>
      </div>
    </div>
  )
}

export default MiniGame
