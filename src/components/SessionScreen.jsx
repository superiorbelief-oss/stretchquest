import { useState } from "react"
import Timer from "./Timer"
import MiniGame from "./MiniGame"

function SessionScreen({ stretches, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [resting, setResting] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)

  const currentStretch = stretches[currentIndex]

  function handleTimerComplete() {
    const newSessionScore = sessionScore + gameScore
    console.log("score being sent:", newSessionScore)
    setSessionScore(newSessionScore)
    setGameScore(0)
    if (currentIndex + 1 >= stretches.length) {
      onComplete(newSessionScore)
    } else {
      setResting(true)
      setTimeout(() => {
        setCurrentIndex(i => i + 1)
        setResting(false)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Stretch {currentIndex + 1} of {stretches.length}</span>
          <span>{currentStretch.muscle}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex) / stretches.length) * 100}%` }}
          />
        </div>
      </div>
      {resting ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-2xl font-medium text-gray-700">Rest...</p>
          <p className="text-gray-400 mt-2">Next up: {stretches[currentIndex + 1]?.name}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center flex-1 w-full max-w-sm gap-5">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-1">
              {currentStretch.name}
            </h2>
            {currentStretch.side && (
              <p className="text-purple-500 text-sm">{currentStretch.side}</p>
            )}
          </div>
          <Timer
            key={currentIndex}
            duration={currentStretch.duration}
            onComplete={handleTimerComplete}
          />
          <div className="bg-white rounded-2xl p-5 w-full shadow-sm border border-gray-100">
            <p className="text-gray-500 text-center leading-relaxed text-sm">
              {currentStretch.instruction}
            </p>
          </div>
          <MiniGame
            key={`game-${currentIndex}`}
            onScoreUpdate={setGameScore}
          />
        </div>
      )}
    </div>
  )
}

export default SessionScreen