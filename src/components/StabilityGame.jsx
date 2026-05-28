import { useEffect, useRef, useState } from "react"

function StabilityGame({ onScoreUpdate, difficulty, onPositionConfirmed }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState("loading")
  const [lineOffset, setLineOffset] = useState(0)
  const [stability, setStability] = useState(100)
  const [score, setScore] = useState(0)
  const [inPosition, setInPosition] = useState(false)
  const [positionMessage, setPositionMessage] = useState("When you're ready, move into position")
  const scoreRef = useRef(0)
  const animRef = useRef(null)
  const landmarkerRef = useRef(null)
  const smoothedOffset = useRef(0)
  const inPositionRef = useRef(false)

  const zoneWidth = difficulty === "beginner" ? 60 : difficulty === "intermediate" ? 45 : difficulty === "advanced" ? 30 : 20
  const threshold = difficulty === "beginner" ? 40 : difficulty === "intermediate" ? 30 : difficulty === "advanced" ? 20 : 12

  useEffect(() => {
    setupCamera()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  async function setupCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      await setupPose()
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

  function checkPosition(lm) {
    const leftShoulder = lm[11]
    const rightShoulder = lm[12]
    const leftKnee = lm[25]
    const rightKnee = lm[26]

    const shoulderHeight = (leftShoulder.y + rightShoulder.y) / 2
    const kneeHeightDiff = Math.abs(leftKnee.y - rightKnee.y)

    const isStanding = shoulderHeight < 0.5
    const hasKneeDiff = kneeHeightDiff > 0.05

    if (isStanding && hasKneeDiff) {
      if (!inPositionRef.current) {
        setPositionMessage("Perfect — hold that position")
        setTimeout(() => {
          inPositionRef.current = true
          setInPosition(true)
          if (onPositionConfirmed) onPositionConfirmed()
        }, 2000)
      }
    } else if (!inPositionRef.current) {
      if (shoulderHeight < 0.5) {
        setPositionMessage("Almost there — settle into the stretch")
      } else {
        setPositionMessage("When you're ready, move into position")
      }
    }
  }

  function detect() {
    if (!videoRef.current || !landmarkerRef.current) return
    const video = videoRef.current
    if (video.readyState >= 2) {
      const results = landmarkerRef.current.detectForVideo(video, performance.now())
      if (results.landmarks && results.landmarks.length > 0) {
        const lm = results.landmarks[0]

        if (!inPositionRef.current) {
          checkPosition(lm)
        }

        const leftShoulder = lm[11]
        const rightShoulder = lm[12]
        const centerX = (leftShoulder.x + rightShoulder.x) / 2
        const rawOffset = (centerX - 0.5) * 200

        smoothedOffset.current = smoothedOffset.current * 0.85 + rawOffset * 0.15
        const finalOffset = smoothedOffset.current
        setLineOffset(finalOffset)

        const absOffset = Math.abs(finalOffset)
        const stabilityVal = Math.max(0, Math.round(100 - absOffset * 1.2))
        setStability(stabilityVal)

        if (inPositionRef.current && absOffset < threshold) {
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

  const lineColor = Math.abs(lineOffset) < threshold ? "#c8a882" : Math.abs(lineOffset) < threshold * 2 ? "#E8A020" : "#E24B4A"

  return (
    <div style={{ background: "#1c1c1c", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "16px", width: "100%" }}>
      <video ref={videoRef} style={{ display: "none" }} muted playsInline />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ fontSize: "9px", color: "#555", letterSpacing: "0.15em" }}>STABILITY</div>
        <div style={{ fontSize: "11px", color: "#c8a882", letterSpacing: "0.05em" }}>{score} PTS</div>
      </div>

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "20px", fontSize: "11px", color: "#555", letterSpacing: "0.1em" }}>
          Loading camera...
        </div>
      )}

      {status === "error" && (
        <div style={{ textAlign: "center", padding: "20px", fontSize: "11px", color: "#9e5a5a" }}>
          Camera unavailable — check permissions
        </div>
      )}

      {status === "ready" && !inPosition && (
        <div style={{ textAlign: "center", padding: "20px 10px" }}>
        <div style={{ width: "32px", height: "32px", border: "1px solid #c8a882", borderRadius: "2px", margin: "0 auto 12px", transform: "rotate(45deg)" }}></div>
          <div style={{ fontSize: "13px", color: "#c8a882", lineHeight: "1.7", fontStyle: "italic" }}>
            {positionMessage}
          </div>
          <div style={{ fontSize: "10px", color: "#555", marginTop: "8px" }}>
            Stand on one leg, pulling your foot behind you
          </div>
        </div>
      )}

      {status === "ready" && inPosition && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.14em" }}>Stay steady</div>

          <div style={{ position: "relative", width: "100%", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: zoneWidth + "px", height: "100%", left: "50%", transform: "translateX(-50%)", background: "rgba(200,168,130,0.05)", borderLeft: "1px solid #2a2a2a", borderRight: "1px solid #2a2a2a" }} />
            <div style={{ position: "absolute", display: "flex", justifyContent: "center", width: "100%", transform: "translateX(" + lineOffset * 0.6 + "px)", transition: "transform 0.15s ease-out" }}>
              <div style={{ width: "2px", height: "130px", background: lineColor, borderRadius: "2px", transition: "background 0.3s" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px" }}>
            <div style={{ fontSize: "28px", fontWeight: "500", color: lineColor, fontFamily: "sans-serif", transition: "color 0.3s" }}>{stability}%</div>
            <div style={{ fontSize: "9px", color: "#444", letterSpacing: "0.12em" }}>STABILITY</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StabilityGame