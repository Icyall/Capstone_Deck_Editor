import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDecks } from '../hooks/useDecks'
import { countCards } from '../logic/validateDeck'

export default function MyDecksPage() {
  const { decks, createDeck, deleteDeck } = useDecks()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  function handleCreate() {
    if (!name.trim()) return
    const deck = createDeck(name.trim())
    setName('')
    navigate(`/decks/${deck.id}/edit`)
  }

  return (
    <>
      <h1>My Decks</h1>
      <input value={name} placeholder="New deck name"
             onChange={e => setName(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleCreate()} />
      <button onClick={handleCreate}>Create deck</button>

      {decks.length === 0 && <p>No decks yet.</p>}
      <ul>
        {decks.map(d => (
          <li key={d.id}>
            <strong>{d.name}</strong> ({countCards(d)}/60){' '}
            <Link to={`/decks/${d.id}`}>View</Link>{' '}
            <Link to={`/decks/${d.id}/edit`}>Edit</Link>{' '}
            <button onClick={() => confirm(`Delete "${d.name}"?`) && deleteDeck(d.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
