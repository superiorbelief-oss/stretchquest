import { useState } from "react"

function AuthScreen({ mode, onComplete, onSwitch }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const isSignup = mode === "signup"

  function handleSubmit() {
    if (isSignup && !name) return
    if (!email || !password) return
    onComplete({ name, email })
  }

  const inputStyle = { width: "100%", background: "#343438", border: "1px solid #3e3e43", borderRadius: "4px", padding: "14px", fontSize: "14px", color: "#f0ede8", outline: "none" }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1f", display: "flex", flexDirection: "column", padding: "48px 24px" }}>
      <button onClick={() => onSwitch("welcome")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "11px", letterSpacing: "0.1em", textAlign: "left", marginBottom: "32px" }}>
        BACK
      </button>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.2em", marginBottom: "8px" }}>{isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}</div>
        <div style={{ fontSize: "26px", fontWeight: "500", color: "#f0ede8" }}>{isSignup ? "Sign up" : "Log in"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
        {isSignup && (
          <div>
            <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>FULL NAME</div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inputStyle} />
          </div>
        )}
        <div>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>EMAIL</div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em", marginBottom: "8px" }}>PASSWORD</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        </div>
      </div>
      <button onClick={handleSubmit} style={{ background: "#c8a882", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", width: "100%", letterSpacing: "0.1em", marginBottom: "16px" }}>
        {isSignup ? "CREATE ACCOUNT" : "LOG IN"}
      </button>
      <button onClick={() => onSwitch(isSignup ? "login" : "signup")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "11px", letterSpacing: "0.08em" }}>
        {isSignup ? "ALREADY HAVE AN ACCOUNT? LOG IN" : "NO ACCOUNT? SIGN UP"}
      </button>
    </div>
  )
}

export default AuthScreen