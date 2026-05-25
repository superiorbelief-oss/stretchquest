function HomeScreen({ onStart, streak, shields, totalXP, levelInfo, alreadyDoneToday }) {
  const safeLevelInfo = levelInfo || { name: "Stiff", progress: 0, max: 500 }

  return (
    <div style={{ minHeight: "100vh", background: "var(--base)", padding: "24px 20px 100px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div>
          <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.2em", marginBottom: "4px" }}>WELCOME BACK</div>
          <div style={{ fontSize: "22px", fontWeight: "500", color: "var(--text)", letterSpacing: "0.05em" }}>STRETCHER</div>
        </div>
        <div style={{ width: "32px", height: "32px", border: "1px solid var(--border)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px" }}>
          <div style={{ width: "12px", height: "1px", background: "var(--muted)" }}></div>
          <div style={{ width: "12px", height: "1px", background: "var(--muted)" }}></div>
          <div style={{ width: "8px", height: "1px", background: "var(--muted)" }}></div>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", borderRadius: "4px", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "9px", color: "var(--dim)", letterSpacing: "0.15em" }}>CURRENT STREAK</div>
          <div style={{ fontSize: "9px", color: "var(--accent)", background: "var(--accent-bg)", padding: "2px 8px", borderRadius: "2px", letterSpacing: "0.08em" }}>{safeLevelInfo.name.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: "32px", fontWeight: "500", color: "var(--text)", marginBottom: "2px" }}>
          {streak || 0} <span style={{ fontSize: "14px", color: "var(--dim)", letterSpacing: "0.1em" }}>DAYS</span>
        </div>
        {shields > 0 && (
          <div style={{ fontSize: "10px", color: "#6ab4ff", marginBottom: "8px" }}>❄️ {shields} freeze shield{shields > 1 ? "s" : ""}</div>
        )}
        <div style={{ height: "2px", background: "var(--border)", borderRadius: "1px", marginTop: "10px" }}>
          <div style={{ width: (safeLevelInfo.progress * 100) + "%", height: "2px", background: "var(--accent)", borderRadius: "1px", transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <div style={{ fontSize: "9px", color: "var(--dim)" }}>{totalXP || 0} XP</div>
          <div style={{ fontSize: "9px", color: "var(--dim)" }}>{safeLevelInfo.max} XP</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "14px" }}>
          <div style={{ fontSize: "24px", fontWeight: "500", color: "var(--accent)" }}>7</div>
          <div style={{ fontSize: "9px", color: "var(--dim)", marginTop: "4px", letterSpacing: "0.1em" }}>STRETCHES</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px", padding: "14px" }}>
          <div style={{ fontSize: "24px", fontWeight: "500", color: "var(--accent)" }}>5</div>
          <div style={{ fontSize: "9px", color: "var(--dim)", marginTop: "4px", letterSpacing: "0.1em" }}>MINUTES</div>
        </div>
      </div>

      {alreadyDoneToday ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: "#5a9e6a", fontWeight: "500", marginBottom: "6px", letterSpacing: "0.05em" }}>SESSION COMPLETE FOR TODAY</div>
          <div style={{ fontSize: "11px", color: "var(--dim)", marginBottom: "12px" }}>Come back tomorrow to keep your streak</div>
          <button onClick={onStart} style={{ fontSize: "11px", color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", letterSpacing: "0.05em" }}>Do another session anyway</button>
        </div>
      ) : (
        <button onClick={onStart} style={{ background: "var(--accent)", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", width: "100%", letterSpacing: "0.1em" }}>
          START SESSION
        </button>
      )}
    </div>
  )
}

export default HomeScreen
