import { useState, useEffect } from "react"

function Timer({ duration, onComplete, paused }) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [preparing, setPreparing] = useState(true)
  const [prepCountdown, setPrepCountdown] = useState(10)

  useEffect(() => {
    setTimeLeft(duration)
    setPreparing(true)
    setPrepCountdown(10)
  }, [duration])

  useEffect(() => {
    if (!preparing) return
    if (prepCountdown === 0) {
      setPreparing(false)
      return
    }
    const interval = setInterval(() => {
      setPrepCountdown(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [preparing, prepCountdown])

  useEffect(() => {
    if (preparing || paused) return
    if (timeLeft === 0) {
      onComplete()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft, paused, preparing])

  const progress = timeLeft / duration
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="140" height="140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#3e3e43" strokeWidth="6" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke={preparing ? "#555" : "#c8a882"} strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={preparing ? 0 : offset}
          strokeLinecap="round" transform="rotate(-90 70 70)" />
        {preparing ? (
          <>
            <text x="70" y="62" textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: "22px", fontWeight: "500", fill: "#c8a882", fontFamily: "sans-serif" }}>
              {prepCountdown}
            </text>
            <text x="70" y="86" textAnchor="middle"
              style={{ fontSize: "9px", fill: "#666", letterSpacing: "0.15em", fontFamily: "sans-serif" }}>
              GET READY
            </text>
          </>
        ) : (
          <>
            <text x="70" y="62" textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: "34px", fontWeight: "500", fill: "#f0ede8", fontFamily: "sans-serif" }}>
              {timeLeft}
            </text>
            <text x="70" y="88" textAnchor="middle"
              style={{ fontSize: "9px", fill: "#666", letterSpacing: "0.15em", fontFamily: "sans-serif" }}>
              SECS
            </text>
          </>
        )}
      </svg>
      {preparing && (
        <div style={{ fontSize: "11px", color: "#888", marginTop: "6px", letterSpacing: "0.08em" }}>Listen to the instructions...</div>
      )}
    </div>
  )
}

export default Timer