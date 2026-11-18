// Short version returned by search
export interface CardBrief {
  id: string
  localId: string
  name: string
  image?: string
}

// Full version returned by /cards/{id}
export interface CardFull extends CardBrief {
  category: string          // "Pokemon" | "Trainer" | "Energy"
  stage?: string            // "Basic", "Stage1", ...
  energyType?: string       // "Basic" | "Special"
  trainerType?: string
  hp?: number
  types?: string[]
  rarity?: string
  regulationMark?: string
  legal?: { standard: boolean; expanded: boolean }
  set: { id: string; name: string }
}