function RoutineScreen({ routines, onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", padding: "24px 20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.05em", marginBottom: "4px" }}>SELECT</div>
        <h1 style={{ fontSize: "28px", fontWeight: "500", color: "#ffffff", marginBottom: "4px" }}>Stretcher</h1>
        <p style={{ fontSize: "14px", color: "#555" }}>Avoid injury with Stretcher</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {Object.values(routines).map(routine => (
          <button
            key={routine.id}
            onClick={() => onSelect(routine)}
            style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "16px", textAlign: "left", cursor: "pointer", width: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <div style={{ width: "40px", height: "40px", background: "#1a1a1a", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                {routine.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#ffffff" }}>{routine.name}</div>
                <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{routine.description}</div>
              </div>
              <div style={{ color: "#333", fontSize: "18px" }}>›</div>
            </div>
            <div style={{ display: "flex", gap: "6px", marginLeft: "52px" }}>
              <span style={{ fontSize: "10px", color: "#ff6b2b", background: "#1f1208", padding: "2px 10px", borderRadius: "20px" }}>{routine.stretches.length} stretches</span>
              <span style={{ fontSize: "10px", color: "#ff6b2b", background: "#1f1208", padding: "2px 10px", borderRadius: "20px" }}>{routine.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoutineScreen
