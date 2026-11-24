import { Link, useParams } from 'react-router-dom'
import { useDecks } from '../hooks/useDecks'
import { getCard } from '../services/tcgdexService'
import { countCards, validateDeck } from '../logic/validateDeck'
import CardSearch from '../components/CardSearch'
import type { CardBrief } from '../types/card'

export default function DeckEditorPage() {
  const { id } = useParams()
  const { decks, addCard, removeCard } = useDecks()
  const deck = decks.find(d => d.id === id)

  if (!deck) return <p>Deck not found. <Link to="/decks">Back to My Decks</Link></p>

  const handleAdd = async (brief: CardBrief) => {
    try {
      const full = await getCard(brief.id)   // need category/stage/energyType for validation
      addCard(deck.id, full)
    } catch {
      alert(`Could not add ${brief.name}. Check your connection and try again.`)
    }
  }

  const errors = validateDeck(deck)

  return (
    <>
      <h1>Editing: {deck.name}</h1>
      <div className="editor">
        <section>
          <CardSearch onAdd={handleAdd} />
        </section>

        <aside>
          <h2>Deck ({countCards(deck)}/60)</h2>
          {errors.length === 0
            ? <p>✅ Deck is legal</p>
            : <ul className="error">{errors.map(e => <li key={e}>{e}</li>)}</ul>}

          {deck.entries.map(e => (
            <div className="deck-row" key={e.cardId}>
              <span>{e.count}× {e.card.name}</span>
              <button onClick={() => removeCard(deck.id, e.cardId)}>−</button>
              <button onClick={() => handleAdd({ id: e.cardId, localId: '', name: e.card.name })}>+</button>
            </div>
          ))}
          <Link to={`/decks/${deck.id}`}>View full deck →</Link>
        </aside>
      </div>
    </>
  )
}
