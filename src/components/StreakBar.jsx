function StreakBar({ streak, shields, totalXP, levelInfo }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  const filledDays = Math.min(streak % 7, 7)

  return (
    <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "16px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px" }}>🔥</span>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "500", color: "#ffffff" }}>{streak} day streak</div>
            {shields > 0 && (
              <div style={{ fontSize: "11px", color: "#4a9eff" }}>❄️ {shields} freeze shield{shields > 1 ? "s" : ""}</div>
            )}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "12px", fontWeight: "500", color: "#ff6b2b" }}>{levelInfo.name}</div>
          <div style={{ fontSize: "11px", color: "#555" }}>{totalXP} XP</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        {days.map((day, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "500", background: i < filledDays ? "#ff6b2b" : "#1a1a1a", color: i < filledDays ? "#ffffff" : "#555", border: "1px solid " + (i < filledDays ? "#ff6b2b" : "#222") }}>
              {i < filledDays ? "✓" : day}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: "3px", background: "#1a1a1a", borderRadius: "2px" }}>
        <div style={{ width: (levelInfo.progress * 100) + "%", height: "3px", background: "#ff6b2b", borderRadius: "2px", transition: "width 0.3s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
        <span style={{ fontSize: "10px", color: "#555" }}>{totalXP} XP</span>
        <span style={{ fontSize: "10px", color: "#555" }}>{levelInfo.max} XP</span>
      </div>
    </div>
  )
}

export default StreakBar
