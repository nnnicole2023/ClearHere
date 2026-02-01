// src/utils/storage.js

function normalizeTerm(s) {
  return (s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " "); // 多空格变一个空格
}


export function loadState() {
  if (typeof window === "undefined") return null

  const raw = localStorage.getItem("appState")

  if (!raw) {
    const initialState = {
      xp: 0,
      coins: 0,
      reviewList: [],
      plantGrowth: 0
    }
    localStorage.setItem("appState", JSON.stringify(initialState))
    return initialState
  }

  return JSON.parse(raw)
}

export function saveState(state) {
  localStorage.setItem("appState", JSON.stringify(state))
}

export function addToReview(term) {
  const state = loadState();
  if (!state) return;

  const key = normalizeTerm(term);
  if (!key) return;

  const exists = state.reviewList.some(item => item.key === key);

  if (!exists) {
    state.reviewList.push({ term: term.trim(), key });
    saveState(state);
  }
}


export function awardCoins(amount = 1) {
  const state = loadState()
  if (!state) return
  state.coins += amount
  saveState(state)
}

export function growPlant() {
  const state = loadState()
  if (!state) return
  state.plantGrowth = (state.plantGrowth || 0) + 1
  saveState(state)
}

export function getPlantStage() {
  const state = loadState()
  const growth = state?.plantGrowth || 0
  
  if (growth < 5) {
    return {
      stage: 'seedling',
      emoji: '🌱',
      name: 'Seedling',
      message: 'Your plant just started.',
      nextIn: 5 - growth,
      isMax: false
    }
  }
  if (growth < 12) {
    return {
      stage: 'growing',
      emoji: '🌿',
      name: 'Growing',
      message: "Nice! You're getting the hang of it.",
      nextIn: 12 - growth,
      isMax: false
    }
  }
  return {
    stage: 'blooming',
    emoji: '🌳',
    name: 'Blooming',
    message: "Milestone reached. You're thriving.",
    nextIn: 0,
    isMax: true
  }
}



