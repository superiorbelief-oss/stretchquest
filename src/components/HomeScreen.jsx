import StreakBar from "./StreakBar"

function HomeScreen({ onStart, streak, shields, totalXP, levelInfo, alreadyDoneToday }) {
  const safeLevelInfo = levelInfo || { name: "Stiff", progress: 0, max: 500 }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 gap-6">
      <div className="text-center">
        <h1 className="text-5xl font-medium text-purple-600 mb-2">StretchQuest</h1>
        <p className="text-gray-400 text-lg">Daily stretching made fun</p>
      </div>

      <StreakBar
        streak={streak || 0}
        shields={shields || 0}
        totalXP={totalXP || 0}
        levelInfo={safeLevelInfo}
      />

      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-sm border border-gray-100">
        <div className="flex justify-between text-center">
          <div>
            <p className="text-2xl font-medium text-purple-600">7</p>
            <p className="text-xs text-gray-400 mt-1">Stretches</p>
          </div>
          <div>
            <p className="text-2xl font-medium text-purple-600">5</p>
            <p className="text-xs text-gray-400 mt-1">Minutes</p>
          </div>
          <div>
            <p className="text-2xl font-medium text-purple-600">Full</p>
            <p className="text-xs text-gray-400 mt-1">Body</p>
          </div>
        </div>
      </div>

      {alreadyDoneToday ? (
        <div className="text-center">
          <p className="text-green-500 font-medium">✓ Session complete for today!</p>
          <p className="text-gray-400 text-sm mt-1">Come back tomorrow to keep your streak</p>
          <button
            onClick={onStart}
            className="mt-4 text-purple-500 text-sm underline"
          >
            Do another session anyway
          </button>
        </div>
      ) : (
        <button
          onClick={onStart}
          className="bg-purple-600 text-white text-lg font-medium px-16 py-4 rounded-2xl hover:bg-purple-700 transition-colors"
        >
          Start stretching
        </button>
      )}
    </div>
  )
}

export default HomeScreen