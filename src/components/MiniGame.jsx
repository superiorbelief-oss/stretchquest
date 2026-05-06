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
    <div className="bg-white rounded-2xl p-5 w-full shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-500">🎮 Tap when green!</p>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Score:</span>
          <span className="text-sm font-medium text-purple-600">{score}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleTap}
          className="w-20 h-20 rounded-full transition-all duration-150 active:scale-95"
          style={{
            background: isGreen ? "#1D9E75" : "#e9d5ff",
            boxShadow: isGreen ? "0 0 20px rgba(29,158,117,0.4)" : "none"
          }}
        />

        <div className="h-6 mt-3">
          {feedback === "nice" && (
            <p className="text-green-500 text-sm font-medium">Nice! +1</p>
          )}
          {feedback === "miss" && (
            <p className="text-red-400 text-sm font-medium">Too early!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MiniGame