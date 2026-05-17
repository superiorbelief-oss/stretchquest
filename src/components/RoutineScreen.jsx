function RoutineScreen({ routines, onSelect }) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium text-purple-600 mb-2">StretchQuest</h1>
        <p className="text-gray-400">Choose your routine</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {Object.values(routines).map(routine => (
          <button
            key={routine.id}
            onClick={() => onSelect(routine)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{routine.emoji}</span>
                <div>
                  <p className="font-medium text-gray-800">{routine.name}</p>
                  <p className="text-sm text-gray-400">{routine.description}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-3 ml-12">
              <span className="text-xs text-purple-500 bg-purple-50 px-3 py-1 rounded-full">
                {routine.stretches.length} stretches
              </span>
              <span className="text-xs text-purple-500 bg-purple-50 px-3 py-1 rounded-full">
                {routine.duration}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoutineScreen