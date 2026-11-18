import type { CardBrief, CardFull } from '../types/card'

const BASE = 'https://api.tcgdex.net/v2/en'
export const PAGE_SIZE = 30

export async function searchCards(name: string, page = 1): Promise<CardBrief[]> {
  const url = `${BASE}/cards?name=${encodeURIComponent(name)}` +
    `&pagination:page=${page}&pagination:itemsPerPage=${PAGE_SIZE}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Search failed (${res.status})`)
  return res.json()
}

// Remember cards we've already fetched
const cache = new Map<string, CardFull>()

export async function getCard(id: string): Promise<CardFull> {
  const cached = cache.get(id)
  if (cached) return cached
  const res = await fetch(`${BASE}/cards/${encodeURIComponent(id)}`)
  if (!res.ok) throw new Error(`Could not load card ${id} (${res.status})`)
  const card: CardFull = await res.json()
  cache.set(id, card)
  return card
}

export function imageUrl(image: string | undefined, quality: 'low' | 'high' = 'low') {
  return image ? `${image}/${quality}.webp` : undefined
}