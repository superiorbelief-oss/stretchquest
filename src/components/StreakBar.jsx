function StreakBar({ streak, shields, totalXP, levelInfo }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"]
  const filledDays = Math.min(streak % 7, 7)

  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-lg font-medium text-gray-800">{streak} day streak</p>
            {shields > 0 && (
              <p className="text-xs text-blue-400">❄️ {shields} freeze shield{shields > 1 ? "s" : ""}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-purple-600">{levelInfo.name}</p>
          <p className="text-xs text-gray-400">{totalXP} XP</p>
        </div>
      </div>

      <div className="flex justify-between mb-3">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{
                background: i < filledDays ? "#7c3aed" : "#f3f4f6",
                color: i < filledDays ? "white" : "#9ca3af"
              }}
            >
              {i < filledDays ? "✓" : day}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${levelInfo.progress * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{totalXP} XP</span>
        <span className="text-xs text-gray-400">{levelInfo.max} XP</span>
      </div>
    </div>
  )
}

export default StreakBar
