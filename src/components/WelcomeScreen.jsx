function WelcomeScreen({ onGetStarted, onLogin }) {
  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "60px 24px 48px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "400px" }}>
        <div style={{ width: "64px", height: "64px", border: "2px solid #c8a882", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", transform: "rotate(45deg)" }}>
          <div style={{ width: "24px", height: "24px", border: "2px solid #c8a882", borderRadius: "2px", transform: "rotate(-45deg)" }} />
        </div>
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.3em", marginBottom: "12px" }}>STRETCHER</div>
        <div style={{ fontSize: "32px", fontWeight: "500", color: "#f0ede8", textAlign: "center", lineHeight: "1.2", marginBottom: "8px" }}>Avoid injury.</div>
        <div style={{ fontSize: "32px", fontWeight: "500", color: "#c8a882", textAlign: "center", lineHeight: "1.2", marginBottom: "24px" }}>Stretch daily.</div>
        <div style={{ fontSize: "12px", color: "#888", textAlign: "center", lineHeight: "1.8", maxWidth: "280px" }}>Science-backed routines for runners, athletes and desk workers.</div>
      </div>
      <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button onClick={onGetStarted} style={{ background: "#c8a882", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", width: "100%", letterSpacing: "0.1em" }}>
          GET STARTED
        </button>
        <div style={{ height: "1px", background: "#2e2e2e", margin: "4px 0" }} />
        <button onClick={onLogin} style={{ background: "transparent", color: "#888", border: "none", padding: "8px", fontSize: "11px", cursor: "pointer", letterSpacing: "0.1em" }}>
          ALREADY A MEMBER? LOG IN
        </button>
      </div>
    </div>
  )
}

export default WelcomeScreen