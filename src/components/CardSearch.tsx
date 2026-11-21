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

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) { setResults([]); return }

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
  }, [query, page])

  return (
    <div>
      <input
        className="search-box"
        placeholder="Search cards (e.g. Pikachu)"
        value={query}
        onChange={e => { setQuery(e.target.value); setPage(1) }}
      />

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && query.trim().length >= 2 && results.length === 0 && <p>No cards found.</p>}

      <div className="card-grid">
        {results.map(card => <CardTile key={card.id} card={card} onAdd={onAdd} />)}
      </div>

      {results.length > 0 && (
        <div className="pager">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span>Page {page}</span>
          <button disabled={results.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  )
}