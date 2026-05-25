import { useState } from "react"

const steps = [
  {
    id: "goal",
    question: "What's your main goal?",
    subtitle: "We'll tailor your routines around this",
    options: [
      { id: "injury", label: "Injury prevention", icon: "🛡️" },
      { id: "flexibility", label: "Improve flexibility", icon: "🤸" },
      { id: "recovery", label: "Faster recovery", icon: "⚡" },
      { id: "general", label: "General fitness", icon: "💪" },
    ]
  },
  {
    id: "level",
    question: "What's your fitness level?",
    subtitle: "Be honest — we'll adjust the intensity",
    options: [
      { id: "beginner", label: "Beginner", icon: "🌱" },
      { id: "intermediate", label: "Intermediate", icon: "🔥" },
      { id: "advanced", label: "Advanced", icon: "⚡" },
      { id: "athlete", label: "Athlete", icon: "🏆" },
    ]
  },
  {
    id: "time",
    question: "When do you usually stretch?",
    subtitle: "We'll send reminders at the right time",
    options: [
      { id: "morning", label: "Morning", icon: "🌅" },
      { id: "postworkout", label: "Post workout", icon: "🏋️" },
      { id: "evening", label: "Evening", icon: "🌙" },
      { id: "throughout", label: "Throughout the day", icon: "☀️" },
    ]
  }
]

function OnboardingScreen({ userName, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  function handleNext() {
    if (!selected) return
    const newAnswers = { ...answers, [step.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)
    if (isLast) {
      onComplete(newAnswers)
    } else {
      setCurrentStep(i => i + 1)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1f", padding: "48px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: "2px", background: i <= currentStep ? "#c8a882" : "#3e3e43", borderRadius: "1px", transition: "background 0.3s" }} />
          ))}
        </div>
        {currentStep === 0 && userName && (
          <div style={{ fontSize: "12px", color: "#c8a882", letterSpacing: "0.05em", marginBottom: "8px" }}>WELCOME, {userName.toUpperCase()}</div>
        )}
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em", marginBottom: "8px" }}>STEP {currentStep + 1} OF {steps.length}</div>
        <div style={{ fontSize: "22px", fontWeight: "500", color: "#f0ede8", marginBottom: "6px" }}>{step.question}</div>
        <div style={{ fontSize: "12px", color: "#888" }}>{step.subtitle}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {step.options.map(option => (
          <button key={option.id} onClick={() => setSelected(option.id)} style={{ background: selected === option.id ? "#2a2318" : "#343438", border: "1px solid " + (selected === option.id ? "#c8a882" : "#3e3e43"), borderLeft: "3px solid " + (selected === option.id ? "#c8a882" : "#3e3e43"), borderRadius: "4px", padding: "16px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.15s" }}>
            <span style={{ fontSize: "20px" }}>{option.icon}</span>
            <span style={{ fontSize: "14px", color: selected === option.id ? "#c8a882" : "#f0ede8", fontWeight: selected === option.id ? "500" : "400" }}>{option.label}</span>
            {selected === option.id && <span style={{ marginLeft: "auto", color: "#c8a882" }}>✓</span>}
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={!selected} style={{ background: selected ? "#c8a882" : "#343438", color: selected ? "#1a1a1a" : "#555", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: selected ? "pointer" : "default", width: "100%", letterSpacing: "0.1em", marginTop: "24px", transition: "all 0.2s" }}>
        {isLast ? "START STRETCHING" : "NEXT"}
      </button>
    </div>
  )
}

export default OnboardingScreen