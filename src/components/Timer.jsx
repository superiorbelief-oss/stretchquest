import { useState, useEffect } from "react"

function Timer({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

 useEffect(() => {
    if (timeLeft === 0) {
      console.log("timer hit zero, calling onComplete")
      onComplete()
      return
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])
  
  const progress = timeLeft / duration
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140">
        <circle
          cx="70" cy="70" r={radius}
          fill="none" stroke="#e9d5ff" strokeWidth="10"
        />
        <circle
          cx="70" cy="70" r={radius}
          fill="none" stroke="#7c3aed" strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <text
          x="70" y="70"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-3xl"
          style={{ fontSize: "32px", fontWeight: "500", fill: "#1f2937" }}
        >
          {timeLeft}
        </text>
      </svg>
      <p className="text-gray-400 text-sm mt-1">seconds</p>
    </div>
  )
}

export default Timer