import { useEffect, useState } from 'react'
import type { Deck, CardSnapshot } from '../types/deck'
import type { CardFull } from '../types/card'
import { loadDecks, saveDecks } from '../services/deckStorage'

function toSnapshot(c: CardFull): CardSnapshot {
  return {
    name: c.name, category: c.category, stage: c.stage, energyType: c.energyType,
    image: c.image, regulationMark: c.regulationMark, legal: c.legal,
  }
}

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>(() => loadDecks())

  // Every time decks change, save them
  useEffect(() => { saveDecks(decks) }, [decks])

  function createDeck(name: string): Deck {
    const now = new Date().toISOString()
    const deck: Deck = {
      id: crypto.randomUUID(), name, format: 'standard',
      entries: [], createdAt: now, updatedAt: now,
    }
    setDecks(ds => [...ds, deck])
    return deck
  }

  function updateDeck(id: string, change: (d: Deck) => Deck) {
    setDecks(ds => ds.map(d =>
      d.id === id ? { ...change(d), updatedAt: new Date().toISOString() } : d))
  }

  function addCard(deckId: string, card: CardFull) {
    updateDeck(deckId, deck => {
      const exists = deck.entries.some(e => e.cardId === card.id)
      const entries = exists
        ? deck.entries.map(e => e.cardId === card.id ? { ...e, count: e.count + 1 } : e)
        : [...deck.entries, { cardId: card.id, count: 1, card: toSnapshot(card) }]
      return { ...deck, entries }
    })
  }

  function removeCard(deckId: string, cardId: string) {
    updateDeck(deckId, deck => ({
      ...deck,
      entries: deck.entries
        .map(e => e.cardId === cardId ? { ...e, count: e.count - 1 } : e)
        .filter(e => e.count > 0),
    }))
  }

  function deleteDeck(id: string) {
    setDecks(ds => ds.filter(d => d.id !== id))
  }

  return { decks, createDeck, addCard, removeCard, deleteDeck }
}