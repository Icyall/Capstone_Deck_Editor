import { useEffect, useState } from 'react'
import type { CardBrief } from '../types/card'
import { searchCards, PAGE_SIZE } from '../services/tcgdexService'
import CardTile from './CardTile'

interface Props {
  onAdd?: (card: CardBrief) => void
}

export default function CardSearch({ onAdd }: Props) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<CardBrief[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const q = query.trim()
  const canSearch = q.length >= 2

  useEffect(() => {
    if (!canSearch) return

    // Wait 300 ms after the user stops typing before calling the API
    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)
      searchCards(q, page)
        .then(setResults)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, 300)
    return () => clearTimeout(timer)
  }, [q, page, canSearch])

  // Hide old results when the search box is too short
  const shown = canSearch ? results : []

  return (
    <div>
      <input
        className="search-box"
        placeholder="Search cards (e.g. Pikachu)"
        value={query}
        onChange={e => { setQuery(e.target.value); setPage(1) }}
      />

      {canSearch && loading && <p>Loading…</p>}
      {canSearch && error && <p className="error">{error}</p>}
      {canSearch && !loading && !error && shown.length === 0 && <p>No cards found.</p>}

      <div className="card-grid">
        {shown.map(card => <CardTile key={card.id} card={card} onAdd={onAdd} />)}
      </div>

      {shown.length > 0 && (
        <div className="pager">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span>Page {page}</span>
          <button disabled={shown.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  )
}