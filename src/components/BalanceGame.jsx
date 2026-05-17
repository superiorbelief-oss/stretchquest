import { useEffect, useRef, useState } from "react"

function BalanceGame({ onScoreUpdate }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState("waiting")
  const [beamAngle, setBeamAngle] = useState(0)
  const [score, setScore] = useState(0)
  const [fallen, setFallen] = useState(false)
  const scoreRef = useRef(0)
  const animRef = useRef(null)
  const landmarkerRef = useRef(null)

  useEffect(() => {
    setStatus("requesting")
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
        setStatus("loading_ai")
        await setupPose()
      }
    } catch (e) {
      setStatus("error")
      console.error("Camera error", e)
    }
  }

  async function setupPose() {
    try {
      const { PoseLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision")
      setStatus("loading_model")
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
      console.error("Pose error", e)
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
    <div className="bg-white rounded-2xl p-4 w-full shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-500">Balance game</p>
        <span className="text-sm font-medium text-purple-600">{score} pts</span>
      </div>

      <div className="text-center py-2">
        {status === "requesting" && <p className="text-sm text-gray-400">Requesting camera...</p>}
        {status === "camera_ready" && <p className="text-sm text-gray-400">Camera ready...</p>}
        {status === "loading_ai" && <p className="text-sm text-purple-400">Loading AI...</p>}
        {status === "loading_model" && <p className="text-sm text-purple-400">Loading pose model... this takes 10-15 seconds</p>}
        {status === "error" && <p className="text-sm text-red-400">Something went wrong — try refreshing</p>}
      </div>

      <video ref={videoRef} className="w-full rounded-xl" style={{ transform: "scaleX(-1)", maxHeight: "160px", objectFit: "cover", display: status === "ready" ? "block" : "none" }} muted playsInline />

      {status === "ready" && (
        <div>
          <div className="flex justify-center mt-3">
            <svg width="200" height="80" viewBox="0 0 200 80">
              <g transform={"translate(100,60) rotate(" + beamAngle + ")"}>
                <rect x="-80" y="-8" width="160" height="12" rx="4" fill={fallen ? "#E24B4A" : Math.abs(beamAngle) > 15 ? "#EF9F27" : "#7c3aed"} />
                <circle cx="-60" cy="-14" r="8" fill="#534AB7" />
                <circle cx="0" cy="-14" r="8" fill="#534AB7" />
                <circle cx="60" cy="-14" r="8" fill="#534AB7" />
              </g>
              <polygon points="100,68 88,80 112,80" fill="#9ca3af" />
            </svg>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            {fallen ? "Fell! Stay still!" : Math.abs(beamAngle) > 15 ? "Careful - tilting!" : "Great balance!"}
          </p>
        </div>
      )}
    </div>
  )
}

export default BalanceGame