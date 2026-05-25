function CompletionScreen({ onHome, gameScore, newStreak, shields, levelInfo }) {
  const safeScore = gameScore || 0
  const baseXP = 150
  const bonusXP = safeScore * 10
  const totalXP = baseXP + bonusXP
  const earnedShield = newStreak % 7 === 0 && newStreak > 0

  return (
    <div style={{ minHeight: "100vh", background: "var(--base)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ width: "48px", height: "48px", border: "2px solid var(--accent)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "22px" }}>✓</div>
        <div style={{ fontSize: "22px", fontWeight: "500", color: "var(--text)", letterSpacing: "0.05em", marginBottom: "4px" }}>SESSION COMPLETE</div>
        <div style={{ fontSize: "12px", color: "var(--dim)", letterSpacing: "0.08em" }}>FULL BODY STRETCHED</div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", borderRadius: "4px", padding: "20px", width: "100%", maxWidth: "400px", marginBottom: "10px", textAlign: "center" }}>
        <div style={{ fontSize: "38px", fontWeight: "500", color: "var(--accent)", marginBottom: "2px" }}>+{totalXP}</div>
        <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.15em" }}>XP EARNED</div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "14px", width: "100%", maxWidth: "400px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
          <span style={{ color: "var(--muted)", letterSpacing: "0.05em" }}>BASE XP</span>
          <span style={{ color: "var(--text)" }}>+{baseXP}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
          <span style={{ color: "var(--muted)", letterSpacing: "0.05em" }}>GAME BONUS</span>
          <span style={{ color: "var(--accent)" }}>+{bonusXP}</span>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "14px", width: "100%", maxWidth: "400px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "16px" }}>🔥</span>
            <span style={{ fontSize: "13px", color: "var(--text)", letterSpacing: "0.03em" }}>{newStreak} day streak</span>
          </div>
          <span style={{ fontSize: "9px", color: "var(--accent)", letterSpacing: "0.1em" }}>{levelInfo?.name?.toUpperCase()}</span>
        </div>
        {earnedShield && (
          <div style={{ marginTop: "10px", background: "#0d1a2a", border: "1px solid #1a3a5c", borderRadius: "4px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#6ab4ff", letterSpacing: "0.05em" }}>❄️ FREEZE SHIELD EARNED</div>
            <div style={{ fontSize: "10px", color: "#4a7aaa", marginTop: "2px" }}>7 day streak reward</div>
          </div>
        )}
      </div>

      <button onClick={onHome} style={{ background: "var(--accent)", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", width: "100%", maxWidth: "400px", letterSpacing: "0.1em" }}>
        BACK TO HOME
      </button>
    </div>
  )
}

export default CompletionScreen
