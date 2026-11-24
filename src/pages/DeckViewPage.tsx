import { Link, useParams } from 'react-router-dom'
import { useDecks } from '../hooks/useDecks'
import { countCards } from '../logic/validateDeck'
import { imageUrl } from '../services/tcgdexService'

const GROUPS = ['Pokemon', 'Trainer', 'Energy']

export default function DeckViewPage() {
  const { id } = useParams()
  const { decks } = useDecks()
  const deck = decks.find(d => d.id === id)
  if (!deck) return <p>Deck not found. <Link to="/decks">Back</Link></p>

  return (
    <>
      <h1>{deck.name} ({countCards(deck)}/60)</h1>
      <Link to={`/decks/${deck.id}/edit`}>Edit deck</Link>

      {GROUPS.map(group => {
        const entries = deck.entries.filter(e => e.card.category === group)
        if (entries.length === 0) return null
        const total = entries.reduce((s, e) => s + e.count, 0)
        return (
          <section key={group}>
            <h2>{group} ({total})</h2>
            <div className="card-grid">
              {entries.map(e => (
                <div className="card-tile" key={e.cardId}>
                  {e.card.image
                    ? <img src={imageUrl(e.card.image)} alt={e.card.name} />
                    : <div className="card-placeholder">{e.card.name}</div>}
                  <p>{e.count}× {e.card.name}</p>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}