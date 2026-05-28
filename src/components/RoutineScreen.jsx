function RoutineScreen({ routines, onSelect, lastRoutine, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#28282D", padding: "24px 20px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em", marginBottom: "6px" }}>SELECT</div>
          <div style={{ fontSize: "26px", fontWeight: "500", color: "#f0ede8", letterSpacing: "0.02em" }}>Your routine</div>
        </div>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid #3e3e43", borderRadius: "4px", padding: "6px 12px", fontSize: "9px", color: "#555", cursor: "pointer", letterSpacing: "0.1em" }}>
          LOG OUT
        </button>
      </div>

      {lastRoutine && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>LAST TIME</div>
          <button
            onClick={() => onSelect(lastRoutine)}
            style={{ background: "#2a2318", border: "1px solid #c8a882", borderRadius: "4px", padding: "16px", textAlign: "left", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>{lastRoutine.emoji}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#c8a882", marginBottom: "2px" }}>Continue {lastRoutine.name}</div>
                <div style={{ fontSize: "10px", color: "#888" }}>Jump straight back in</div>
              </div>
            </div>
            <div style={{ fontSize: "9px", color: "#c8a882", letterSpacing: "0.1em" }}>GO →</div>
          </button>
        </div>
      )}

      <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>
        {lastRoutine ? "OR CHOOSE ANOTHER" : "ALL ROUTINES"}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {Object.values(routines).map((routine, i) => (
          <button
            key={routine.id}
            onClick={() => onSelect(routine)}
            style={{ background: "#343438", border: "1px solid #3e3e43", borderLeft: i === 0 ? "3px solid #c8a882" : "1px solid #3e3e43", borderRadius: "4px", padding: "16px", textAlign: "left", cursor: "pointer", width: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
             <div style={{ width: "40px", height: "40px", background: "#2e2e33", border: "1px solid #3e3e43", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
  <div style={{ width: "16px", height: "16px", border: "1px solid #c8a882", borderRadius: "2px", transform: "rotate(45deg)" }}></div>
</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#f0ede8", marginBottom: "2px" }}>{routine.name}</div>
                <div style={{ fontSize: "11px", color: "#888" }}>{routine.description}</div>
              </div>
              <div style={{ color: "#555", fontSize: "18px" }}>›</div>
            </div>
            <div style={{ display: "flex", gap: "6px", marginLeft: "52px" }}>
              <span style={{ fontSize: "10px", color: "#c8a882", background: "#2a2318", padding: "2px 10px", borderRadius: "2px", letterSpacing: "0.05em" }}>{routine.stretches.length} STRETCHES</span>
              <span style={{ fontSize: "10px", color: "#c8a882", background: "#2a2318", padding: "2px 10px", borderRadius: "2px", letterSpacing: "0.05em" }}>{routine.duration}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoutineScreen