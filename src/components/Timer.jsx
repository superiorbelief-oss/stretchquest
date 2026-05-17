import { useState, useEffect } from "react"

function Timer({ duration, onComplete, paused }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (paused) return
    if (timeLeft === 0) {
      onComplete()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft, paused])

  const progress = timeLeft / duration
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="140" height="140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="8" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#ff6b2b" strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 70 70)" />
        <text x="70" y="70" textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: "32px", fontWeight: "500", fill: "#ffffff" }}>
          {timeLeft}
        </text>
      </svg>
      <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>seconds</p>
    </div>
  )
}

export default Timer
