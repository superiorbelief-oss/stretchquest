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
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#3e3e43" strokeWidth="6" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#c8a882" strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 70 70)" />
        <text x="70" y="66" textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: "34px", fontWeight: "500", fill: "#f0ede8", fontFamily: "sans-serif" }}>
          {timeLeft}
        </text>
        <text x="70" y="88" textAnchor="middle"
          style={{ fontSize: "9px", fill: "#666", letterSpacing: "0.15em", fontFamily: "sans-serif" }}>
          SECS
        </text>
      </svg>
    </div>
  )
}

export default Timer
