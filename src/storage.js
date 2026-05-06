const STORAGE_KEY = "stretchtest_data"

const defaultData = {
  streak: 0,
  lastSessionDate: null,
  totalXP: 0,
  shields: 0,
  unlockedRoutines: ["morning"],
}

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultData
    const parsed = JSON.parse(saved)
    if (typeof parsed.totalXP !== "number" || isNaN(parsed.totalXP)) {
      localStorage.removeItem(STORAGE_KEY)
      return defaultData
    }
    return parsed
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY)
    return defaultData
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function calculateStreak(data) {
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  if (data.lastSessionDate === today) {
    return data
  }

  if (data.lastSessionDate === yesterday) {
    const newStreak = data.streak + 1
    const newShields = newStreak % 7 === 0 ? data.shields + 1 : data.shields
    return {
      ...data,
      streak: newStreak,
      lastSessionDate: today,
      shields: newShields,
    }
  }

  if (data.lastSessionDate !== today && data.shields > 0) {
    return {
      ...data,
      shields: data.shields - 1,
      lastSessionDate: today,
    }
  }

  return {
    ...data,
    streak: 1,
    lastSessionDate: today,
  }
}

export function getLevelInfo(totalXP) {
  const safeXP = totalXP || 0
  const levels = [
    { name: "Stiff", min: 0, max: 500 },
    { name: "Flexible", min: 500, max: 1500 },
    { name: "Elastic", min: 1500, max: 3000 },
    { name: "Master", min: 3000, max: 9999 },
  ]
  const level = levels.find(l => safeXP >= l.min && safeXP < l.max) || levels[3]
  const progress = (safeXP - level.min) / (level.max - level.min)
  return { ...level, progress }
}