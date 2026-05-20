import { Player } from "@lottiefiles/react-lottie-player"

function StretchAnimation({ animationPath }) {
  if (!animationPath) return null

  return (
    <div style={{ background: "#141414", border: "1px solid #222", borderRadius: "16px", padding: "8px", width: "100%" }}>
      <Player
        autoplay
        loop
        src={animationPath}
        style={{ height: "220px", width: "100%" }}
      />
    </div>
  )
}

export default StretchAnimation
