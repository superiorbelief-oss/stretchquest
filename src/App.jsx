import { useState } from "react"
import RoutineScreen from "./components/RoutineScreen"
import SessionScreen from "./components/SessionScreen"
import CompletionScreen from "./components/CompletionScreen"
import routines from "./data/stretches"
import { saveData, calculateStreak, getLevelInfo } from "./storage"

const defaultData = {
  streak: 0,
  lastSessionDate: null,
  totalXP: 0,
  shields: 0,
}

function App() {
  const [screen, setScreen] = useState("routines")
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const [finalScore, setFinalScore] = useState(0)
  const [userData, setUserData] = useState(defaultData)

  const levelInfo = getLevelInfo(userData.totalXP)

  function handleSelectRoutine(routine) {
    setSelectedRoutine(routine)
    setScreen("session")
  }

  function handleComplete(score) {
    const safeScore = score || 0
    const baseXP = 150
    const bonusXP = safeScore * 10
    const totalEarned = baseXP + bonusXP
    const updatedData = calculateStreak({
      ...userData,
      totalXP: userData.totalXP + totalEarned,
    })
    saveData(updatedData)
    setUserData(updatedData)
    setFinalScore(safeScore)
    setScreen("complete")
  }

  if (screen === "routines") {
    return (
      <RoutineScreen
        routines={routines}
        onSelect={handleSelectRoutine}
      />
    )
  }

  if (screen === "session") {
    return (
      <SessionScreen
        routine={selectedRoutine}
        onComplete={handleComplete}
      />
    )
  }

  if (screen === "complete") {
    return (
      <CompletionScreen
        gameScore={finalScore}
        newStreak={userData.streak}
        shields={userData.shields}
        levelInfo={levelInfo}
        onHome={() => setScreen("routines")}
      />
    )
  }
}

export default App