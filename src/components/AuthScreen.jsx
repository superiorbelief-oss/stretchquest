import { useState } from "react"
import { supabase } from "../supabase"

function AuthScreen({ mode, onComplete, onSwitch }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const isSignup = mode === "signup"

  async function handleSubmit() {
    console.log("submitting", email, password)
    if (isSignup && !name) { setError("Please enter your name"); return }
    if (!email || !password) { setError("Please fill in all fields"); return }
    setLoading(true)
    setError("")

    try {
      if (isSignup) {
        console.log("attempting signup...")
        const { data, error } = await supabase.auth.signUp({ email, password })
        console.log("signup result:", data, error)
        if (error) throw error
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          name,
          email,
          streak: 0,
          total_xp: 0,
          shields: 0,
        })
        if (profileError) throw profileError
        onComplete({ name, email })
      } else {
        console.log("attempting login...")
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        console.log("login result:", data, error)
        if (error) throw error
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
        onComplete({ name: profile?.name || "", email, profile })
      }
    } catch (err) {
      console.log("error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

      {error && (
        <div style={{ background: "#2a1515", border: "1px solid #5a3030", borderRadius: "4px", padding: "12px", marginBottom: "16px", fontSize: "12px", color: "#ff8080" }}>
          {error}
        </div>
      )}

      <button onClick={handleSubmit} disabled={loading} style={{ background: loading ? "#555" : "#c8a882", color: "#1a1a1a", border: "none", borderRadius: "4px", padding: "16px", fontSize: "13px", fontWeight: "500", cursor: loading ? "default" : "pointer", width: "100%", letterSpacing: "0.1em", marginBottom: "16px" }}>
        {loading ? "PLEASE WAIT..." : isSignup ? "CREATE ACCOUNT" : "LOG IN"}
      </button>

      <button onClick={() => onSwitch(isSignup ? "login" : "signup")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "11px", letterSpacing: "0.08em" }}>
        {isSignup ? "ALREADY HAVE AN ACCOUNT? LOG IN" : "NO ACCOUNT? SIGN UP"}
      </button>
    </div>
  )
}

export default AuthScreen