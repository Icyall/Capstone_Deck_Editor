export type Format = 'standard' | 'expanded'

// The few card fields a deck needs to display and validate itself
export interface CardSnapshot {
  name: string
  category: string
  stage?: string
  energyType?: string
  image?: string
  regulationMark?: string
  legal?: { standard: boolean; expanded: boolean }
}

export interface DeckEntry {
  cardId: string
  count: number
  card: CardSnapshot
}

export interface Deck {
  id: string
  name: string
  format: Format
  entries: DeckEntry[]
  createdAt: string
  updatedAt: string
}
