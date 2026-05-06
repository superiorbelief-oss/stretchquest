import { useState } from "react"
import HomeScreen from "./components/HomeScreen"
import SessionScreen from "./components/SessionScreen"
import CompletionScreen from "./components/CompletionScreen"
import stretches from "./data/stretches"
import { saveData, calculateStreak, getLevelInfo } from "./storage"

const defaultData = {
  streak: 0,
  lastSessionDate: null,
  totalXP: 0,
  shields: 0,
}

function App() {
  const [screen, setScreen] = useState("home")
  const [finalScore, setFinalScore] = useState(0)
  const [userData, setUserData] = useState(defaultData)

  const levelInfo = getLevelInfo(userData.totalXP)
  const today = new Date().toDateString()
  const alreadyDoneToday = userData.lastSessionDate === today

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

  if (screen === "home") {
    return (
      <HomeScreen
        onStart={() => setScreen("session")}
        streak={userData.streak}
        shields={userData.shields}
        totalXP={userData.totalXP}
        levelInfo={levelInfo}
        alreadyDoneToday={alreadyDoneToday}
      />
    )
  }

  if (screen === "session") {
    return (
      <SessionScreen
        stretches={stretches}
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
        onHome={() => setScreen("home")}
      />
    )
  }
}

export default App