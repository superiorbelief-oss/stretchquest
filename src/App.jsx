import { useState, useEffect } from "react"
import WelcomeScreen from "./components/WelcomeScreen"
import AuthScreen from "./components/AuthScreen"
import OnboardingScreen from "./components/OnboardingScreen"
import RoutineScreen from "./components/RoutineScreen"
import DifficultyScreen from "./components/DifficultyScreen"
import SessionScreen from "./components/SessionScreen"
import CompletionScreen from "./components/CompletionScreen"
import { supabase } from "./supabase"
import routines from "./data/stretches"
import { saveData, calculateStreak, getLevelInfo } from "./storage"

const defaultData = {
  streak: 0,
  lastSessionDate: null,
  totalXP: 0,
  shields: 0,
}

function App() {
  const [screen, setScreen] = useState("loading")
  const [authMode, setAuthMode] = useState("signup")
  const [userName, setUserName] = useState("")
  const [lastRoutine, setLastRoutine] = useState(null)
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const [difficulty, setDifficulty] = useState("beginner")
  const [finalScore, setFinalScore] = useState(0)
  const [userData, setUserData] = useState(defaultData)
  const [user, setUser] = useState(null)

  const levelInfo = getLevelInfo(userData.totalXP)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        loadUserProfile(session.user.id)
      } else {
        setScreen("welcome")
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
        setScreen("welcome")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadUserProfile(userId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (profile) {
      setUserName(profile.name || "")
      setUserData({
        streak: profile.streak || 0,
        lastSessionDate: profile.last_session_date || null,
        totalXP: profile.total_xp || 0,
        shields: profile.shields || 0,
      })
      if (profile.last_routine) {
        setLastRoutine(routines[profile.last_routine] || null)
      }
      if (profile.difficulty) {
        setDifficulty(profile.difficulty)
      }
      setScreen("routines")
    } else {
      setScreen("routines")
    }
  }

  async function handleAuth(data) {
    setUserName(data.name || "")
    if (data.profile) {
      setUserData({
        streak: data.profile.streak || 0,
        lastSessionDate: data.profile.last_session_date || null,
        totalXP: data.profile.total_xp || 0,
        shields: data.profile.shields || 0,
      })
      setScreen("routines")
    } else {
      setScreen("onboarding")
    }
  }

  function handleOnboarding(answers) {
    setScreen("routines")
  }

  function handleSelectRoutine(routine) {
    setSelectedRoutine(routine)
    setScreen("difficulty")
  }

  function handleSelectDifficulty(level) {
    setDifficulty(level)
    setScreen("session")
  }

  async function handleComplete(score) {
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

    if (user) {
      await supabase.from("profiles").update({
        streak: updatedData.streak,
        total_xp: updatedData.totalXP,
        shields: updatedData.shields,
        last_session_date: updatedData.lastSessionDate,
        last_routine: selectedRoutine?.id || null,
        difficulty: difficulty,
      }).eq("id", user.id)
    }

    setScreen("complete")
  }

  function handleSwitch(mode) {
    if (mode === "welcome") {
      setScreen("welcome")
    } else {
      setAuthMode(mode)
      setScreen("auth")
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setScreen("welcome")
  }

  if (screen === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#1a1a1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.3em" }}>STRETCHER</div>
      </div>
    )
  }

  if (screen === "welcome") return <WelcomeScreen onGetStarted={() => { setAuthMode("signup"); setScreen("auth") }} onLogin={() => { setAuthMode("login"); setScreen("auth") }} />
  if (screen === "auth") return <AuthScreen mode={authMode} onComplete={handleAuth} onSwitch={handleSwitch} />
  if (screen === "onboarding") return <OnboardingScreen userName={userName} onComplete={handleOnboarding} />
  if (screen === "routines") return <RoutineScreen routines={routines} onSelect={handleSelectRoutine} lastRoutine={lastRoutine} onLogout={handleLogout} />
  if (screen === "difficulty") return <DifficultyScreen routine={selectedRoutine} onSelect={handleSelectDifficulty} />
  if (screen === "session") return <SessionScreen routine={selectedRoutine} difficulty={difficulty} onComplete={handleComplete} />
  if (screen === "complete") return <CompletionScreen gameScore={finalScore} newStreak={userData.streak} shields={userData.shields} levelInfo={levelInfo} onHome={() => setScreen("routines")} />
}

export default App