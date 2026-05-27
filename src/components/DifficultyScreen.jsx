function DifficultyScreen({ routine, onSelect }) {
  const levels = [
    {
      id: "beginner",
      label: "Beginner",
      description: "Timer pauses if you lose position. Wide detection zone. No penalties.",
      detail: "Perfect if you're new to stretching or returning after injury."
    },
    {
      id: "intermediate",
      label: "Intermediate",
      description: "Timer pauses briefly then continues. Medium detection zone. Small XP penalty for losing position.",
      detail: "For regular stretchers who want a light challenge."
    },
    {
      id: "advanced",
      label: "Advanced",
      description: "Timer keeps running. Tight detection zone. XP multiplier for perfect holds.",
      detail: "For experienced stretchers comfortable with each position."
    },
    {
      id: "athlete",
      label: "Athlete",
      description: "Timer keeps running. Strictest detection. Bonus XP only for perfect holds throughout.",
      detail: "For serious athletes who know these stretches well."
    },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#28282D", padding: "24px 20px 100px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em", marginBottom: "6px" }}>
          {routine.emoji} {routine.name.toUpperCase()}
        </div>
        <div style={{ fontSize: "26px", fontWeight: "500", color: "#f0ede8", marginBottom: "6px" }}>
          Choose your level
        </div>
        <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.6" }}>
          This applies to every stretch in today's session. You can change it next time.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {levels.map((level, i) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            style={{
              background: "#343438",
              border: "1px solid #3e3e43",
              borderLeft: i === 0 ? "3px solid #c8a882" : "1px solid #3e3e43",
              borderRadius: "4px",
              padding: "16px",
              textAlign: "left",
              cursor: "pointer",
              width: "100%"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: "500", color: "#f0ede8" }}>{level.label}</div>
              <div style={{ color: "#555", fontSize: "16px" }}>›</div>
            </div>
            <div style={{ fontSize: "11px", color: "#888", lineHeight: "1.6", marginBottom: "4px" }}>{level.description}</div>
            <div style={{ fontSize: "10px", color: "#555", fontStyle: "italic" }}>{level.detail}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultyScreen