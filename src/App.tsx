import { Link, Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import MyDecksPage from './pages/MyDecksPage'
import DeckEditorPage from './pages/DeckEditorPage'
import DeckViewPage from './pages/DeckViewPage'
import './App.css'

export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/">Search</Link>
        <Link to="/decks">My Decks</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/decks" element={<MyDecksPage />} />
          <Route path="/decks/:id" element={<DeckViewPage />} />
          <Route path="/decks/:id/edit" element={<DeckEditorPage />} />
        </Routes>
      </main>
    </>
  )
}
