import StreakBar from "./StreakBar"

function HomeScreen({ onStart, streak, shields, totalXP, levelInfo, alreadyDoneToday }) {
  const safeLevelInfo = levelInfo || { name: "Stiff", progress: 0, max: 500 }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.05em", marginBottom: "4px" }}>WELCOME BACK</div>
        <div style={{ fontSize: "28px", fontWeight: "500", color: "#ffffff", marginBottom: "2px" }}>Stretcher</div>
        <div style={{ fontSize: "13px", color: "#555" }}>Avoid injury with Stretcher</div>
      </div>

      <div style={{ width: "100%", maxWidth: "400px" }}>
        <StreakBar streak={streak || 0} shields={shields || 0} totalXP={totalXP || 0} levelInfo={safeLevelInfo} />
      </div>

      <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "16px", width: "100%", maxWidth: "400px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "500", color: "#ff6b2b" }}>7</div>
            <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>stretches</div>
          </div>
          <div style={{ width: "1px", background: "#222" }} />
          <div>
            <div style={{ fontSize: "22px", fontWeight: "500", color: "#ff6b2b" }}>5</div>
            <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>minutes</div>
          </div>
          <div style={{ width: "1px", background: "#222" }} />
          <div>
            <div style={{ fontSize: "22px", fontWeight: "500", color: "#ff6b2b" }}>Full</div>
            <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>body</div>
          </div>
        </div>
      </div>

      {alreadyDoneToday ? (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "400px" }}>
          <div style={{ fontSize: "13px", color: "#1a9e75", fontWeight: "500", marginBottom: "8px" }}>Session complete for today!</div>
          <div style={{ fontSize: "12px", color: "#555", marginBottom: "12px" }}>Come back tomorrow to keep your streak</div>
          <button onClick={onStart} style={{ fontSize: "12px", color: "#555", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Do another session anyway</button>
        </div>
      ) : (
        <button
          onClick={onStart}
          style={{ background: "#ff6b2b", color: "#ffffff", border: "none", borderRadius: "14px", padding: "16px", fontSize: "15px", fontWeight: "500", cursor: "pointer", width: "100%", maxWidth: "400px" }}
        >
          Start session
        </button>
      )}
    </div>
  )
}

export default HomeScreen
