function CompletionScreen({ onHome, gameScore, newStreak, shields, levelInfo }) {
  const safeScore = gameScore || 0
  const baseXP = 150
  const bonusXP = safeScore * 10
  const totalXP = baseXP + bonusXP
  const earnedShield = newStreak % 7 === 0 && newStreak > 0

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>✓</div>
        <div style={{ fontSize: "24px", fontWeight: "500", color: "#ffffff", marginBottom: "4px" }}>Session complete</div>
        <div style={{ fontSize: "13px", color: "#555" }}>Full body stretched</div>
      </div>

      <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "20px", width: "100%", maxWidth: "400px", marginBottom: "10px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", fontWeight: "500", color: "#ff6b2b", marginBottom: "4px" }}>+{totalXP} XP</div>
        <div style={{ fontSize: "12px", color: "#555" }}>earned today</div>
      </div>

      <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "14px", padding: "14px", width: "100%", maxWidth: "400px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px" }}>
          <span style={{ color: "#555" }}>Base XP</span>
          <span style={{ color: "#ffffff" }}>+{baseXP}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <span style={{ color: "#555" }}>Game bonus ({safeScore} taps)</span>
          <span style={{ color: "#ff6b2b" }}>+{bonusXP}</span>
        </div>
      </div>

      <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "14px", padding: "14px", width: "100%", maxWidth: "400px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px" }}>🔥</span>
            <span style={{ fontSize: "13px", fontWeight: "500", color: "#ffffff" }}>{newStreak} day streak</span>
          </div>
          <span style={{ fontSize: "12px", color: "#ff6b2b" }}>{levelInfo?.name}</span>
        </div>
        {earnedShield && (
          <div style={{ marginTop: "10px", background: "#0d1a2a", border: "1px solid #1a3a5c", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#4a9eff", fontWeight: "500" }}>Freeze shield earned!</div>
            <div style={{ fontSize: "11px", color: "#3a7acc", marginTop: "2px" }}>7 day streak reward</div>
          </div>
        )}
      </div>

      <button
        onClick={onHome}
        style={{ background: "#ff6b2b", color: "#ffffff", border: "none", borderRadius: "14px", padding: "16px 48px", fontSize: "14px", fontWeight: "500", cursor: "pointer", width: "100%", maxWidth: "400px" }}
      >
        Back to home
      </button>
    </div>
  )
}

export default CompletionScreen
