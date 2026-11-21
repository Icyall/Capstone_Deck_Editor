import type { Deck } from '../types/deck'

const KEY = 'deckbuilder.decks'

export function loadDecks(): Deck[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []   // corrupted or blocked storage: start empty instead of crashing
  }
}

export function saveDecks(decks: Deck[]) {
  localStorage.setItem(KEY, JSON.stringify(decks))
}
