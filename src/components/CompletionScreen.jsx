function CompletionScreen({ onHome, gameScore, newStreak, shields, levelInfo }) {
  const safeScore = gameScore || 0
  const baseXP = 150
  const bonusXP = safeScore * 10
  const totalXP = baseXP + bonusXP
  const earnedShield = newStreak % 7 === 0 && newStreak > 0

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-medium text-gray-800 mb-2">Session complete!</h2>
        <p className="text-gray-400">Great work — you've stretched your whole body</p>
      </div>

      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-sm border border-gray-100 mb-4 text-center">
        <p className="text-4xl font-medium text-purple-600 mb-1">+{totalXP} XP</p>
        <p className="text-gray-400 text-sm">earned today</p>
      </div>

      <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Base XP</span>
          <span className="text-gray-700 font-medium">+{baseXP}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-400">Game bonus ({safeScore} taps)</span>
          <span className="text-green-500 font-medium">+{bonusXP}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🔥</span>
            <span className="text-gray-700 font-medium">{newStreak} day streak!</span>
          </div>
          <span className="text-sm text-purple-600 font-medium">{levelInfo?.name}</span>
        </div>
        {earnedShield && (
          <div className="mt-3 bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-blue-500 font-medium text-sm">❄️ Freeze shield earned!</p>
            <p className="text-blue-400 text-xs mt-1">7 day streak reward</p>
          </div>
        )}
      </div>

      <button
        onClick={onHome}
        className="bg-purple-600 text-white text-lg font-medium px-16 py-4 rounded-2xl hover:bg-purple-700 transition-colors"
      >
        Back to home
      </button>
    </div>
  )
}

export default CompletionScreen