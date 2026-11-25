import type { Deck } from '../types/deck'

// Matches basic energy names like "Grass Energy" or "Basic Grass Energy".
const BASIC_ENERGY_NAME =
  /^(Basic )?(Grass|Fire|Water|Lightning|Psychic|Fighting|Darkness|Metal|Fairy) Energy$/

export function countCards(deck: Deck): number {
  return deck.entries.reduce((sum, e) => sum + e.count, 0)
}

export function validateDeck(deck: Deck): string[] {
  const errors: string[] = []

  // Rule 1: exactly 60 cards
  const total = countCards(deck)
  if (total !== 60) errors.push(`Deck has ${total} cards (must be exactly 60).`)

  // Rule 2: max 4 copies per card NAME (different printings share a name).
  // Basic Energy is exempt.
  const byName = new Map<string, number>()
  for (const e of deck.entries) {
    const isBasicEnergy =
      e.card.category === 'Energy' &&
      (e.card.energyType === 'Basic' || BASIC_ENERGY_NAME.test(e.card.name))

    if (isBasicEnergy) continue

    byName.set(e.card.name, (byName.get(e.card.name) ?? 0) + e.count)
  }
  for (const [name, count] of byName) {
    if (count > 4) errors.push(`${count} copies of "${name}" (max 4).`)
  }

  return errors
}