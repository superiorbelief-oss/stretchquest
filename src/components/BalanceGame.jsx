import { useEffect, useRef, useState } from "react"

function BalanceGame({ onScoreUpdate }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState("requesting")
  const [beamAngle, setBeamAngle] = useState(0)
  const [score, setScore] = useState(0)
  const [fallen, setFallen] = useState(false)
  const scoreRef = useRef(0)
  const animRef = useRef(null)
  const landmarkerRef = useRef(null)

  useEffect(() => {
    setupCamera()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  async function setupCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStatus("camera_ready")
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setStatus("loading_model")
        await setupPose()
      }
    } catch (e) {
      setStatus("error")
    }
  }

  async function setupPose() {
    try {
      const { PoseLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision")
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      )
      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numPoses: 1
      })
      landmarkerRef.current = landmarker
      setStatus("ready")
      detect()
    } catch (e) {
      setStatus("error")
    }
  }

  function detect() {
    if (!videoRef.current || !landmarkerRef.current) return
    const video = videoRef.current
    if (video.readyState >= 2) {
      const results = landmarkerRef.current.detectForVideo(video, performance.now())
      if (results.landmarks && results.landmarks.length > 0) {
        const lm = results.landmarks[0]
        const tilt = (lm[11].y - lm[12].y) * 100
        const angle = Math.max(-30, Math.min(30, tilt * 3))
        setBeamAngle(angle)
        if (Math.abs(angle) > 25) {
          setFallen(true)
          setTimeout(() => setFallen(false), 1500)
        } else {
          scoreRef.current += 1
          if (scoreRef.current % 30 === 0) {
            setScore(s => {
              const n = s + 1
              onScoreUpdate(n)
              return n
            })
          }
        }
      }
    }
    animRef.current = requestAnimationFrame(detect)
  }

  return (
    <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "16px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ fontSize: "11px", color: "#555", letterSpacing: "0.05em" }}>BALANCE GAME</div>
        <div style={{ fontSize: "12px", color: "#ff6b2b" }}>Score: {score}</div>
      </div>

      {status === "requesting" && <p style={{ fontSize: "12px", color: "#555", textAlign: "center", padding: "12px" }}>Requesting camera...</p>}
      {status === "camera_ready" && <p style={{ fontSize: "12px", color: "#555", textAlign: "center", padding: "12px" }}>Camera ready...</p>}
      {status === "loading_model" && <p style={{ fontSize: "12px", color: "#ff6b2b", textAlign: "center", padding: "12px" }}>Loading AI... 10-15 seconds</p>}
      {status === "error" && <p style={{ fontSize: "12px", color: "#ff4444", textAlign: "center", padding: "12px" }}>Something went wrong — try refreshing</p>}

      <video ref={videoRef} style={{ width: "100%", borderRadius: "10px", maxHeight: "160px", objectFit: "cover", transform: "scaleX(-1)", display: status === "ready" ? "block" : "none" }} muted playsInline />

      {status === "ready" && (
        <div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
            <svg width="200" height="80" viewBox="0 0 200 80">
              <g transform={"translate(100,60) rotate(" + beamAngle + ")"}>
                <rect x="-80" y="-8" width="160" height="12" rx="4" fill={fallen ? "#ff4444" : Math.abs(beamAngle) > 15 ? "#EF9F27" : "#ff6b2b"} />
                <circle cx="-60" cy="-14" r="8" fill="#ff6b2b" opacity="0.6" />
                <circle cx="0" cy="-14" r="8" fill="#ff6b2b" opacity="0.6" />
                <circle cx="60" cy="-14" r="8" fill="#ff6b2b" opacity="0.6" />
              </g>
              <polygon points="100,68 88,80 112,80" fill="#333" />
            </svg>
          </div>
          <p style={{ fontSize: "11px", color: "#555", textAlign: "center", marginTop: "8px" }}>
            {fallen ? "Fell! Stay still!" : Math.abs(beamAngle) > 15 ? "Careful - tilting!" : "Great balance!"}
          </p>
        </div>
      )}
    </div>
  )
}

export default BalanceGame
