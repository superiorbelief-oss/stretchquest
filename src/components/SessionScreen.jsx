import { useState } from "react"
import Timer from "./Timer"
import MiniGame from "./MiniGame"
import VoiceControl from "./VoiceControl"
import BalanceGame from "./BalanceGame"

function SessionScreen({ routine, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSideIndex, setCurrentSideIndex] = useState(0)
  const [resting, setResting] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [sessionScore, setSessionScore] = useState(0)
  const [paused, setPaused] = useState(false)
  const [gameMode, setGameMode] = useState("tap")

  const currentStretch = routine.stretches[currentIndex]
  const currentSide = currentStretch.sides[currentSideIndex]
  const isLastSide = currentSideIndex + 1 >= currentStretch.sides.length
  const isLastStretch = currentIndex + 1 >= routine.stretches.length

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
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{currentStretch.muscle}</span>
          <span>{completedSteps + 1} of {totalSteps} sides</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: (completedSteps / totalSteps) * 100 + "%" }} />
        </div>
      </div>
      {paused ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <p className="text-2xl font-medium text-gray-700">Paused</p>
          <button onClick={() => setPaused(false)} className="bg-purple-600 text-white px-10 py-3 rounded-2xl font-medium">Resume</button>
          <p className="text-xs text-gray-400">or say resume</p>
        </div>
      ) : resting ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-2xl font-medium text-gray-700">Rest...</p>
          <p className="text-gray-400 mt-2">Next: {routine.stretches[currentIndex + 1]?.name}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center flex-1 w-full max-w-sm gap-4">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">{currentStretch.name}</h2>
            <span className="text-sm text-white bg-purple-500 px-4 py-1 rounded-full">{currentSide}</span>
          </div>
          <Timer key={currentIndex + "-" + currentSideIndex} duration={currentStretch.duration} onComplete={handleTimerComplete} paused={paused} />
          <div className="bg-white rounded-2xl p-4 w-full shadow-sm border border-gray-100">
            <p className="text-gray-600 text-center leading-relaxed text-sm">{currentStretch.instruction}</p>
            <p className="text-purple-400 text-xs text-center mt-2 italic">{currentStretch.science}</p>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={() => setGameMode("tap")} className={"flex-1 py-2 rounded-xl text-sm font-medium " + (gameMode === "tap" ? "bg-purple-600 text-white" : "bg-white text-gray-500 border border-gray-200")}>Tap game</button>
            <button onClick={() => setGameMode("balance")} className={"flex-1 py-2 rounded-xl text-sm font-medium " + (gameMode === "balance" ? "bg-purple-600 text-white" : "bg-white text-gray-500 border border-gray-200")}>Balance game</button>
          </div>
          {gameMode === "tap" ? (
            <MiniGame key={"game-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          ) : (
            <BalanceGame key={"balance-" + currentIndex + "-" + currentSideIndex} onScoreUpdate={setGameScore} />
          )}
          <div className="bg-purple-50 rounded-2xl p-3 w-full text-center">
            <p className="text-xs text-purple-400">Say next, pause, resume or done</p>
          </div>
        </div>
      )}
      <VoiceControl onCommand={handleVoiceCommand} />
    </div>
  )
}

export default SessionScreen
