import type { CardBrief } from '../types/card'
import { imageUrl } from '../services/tcgdexService'

interface Props {
  card: CardBrief
  onAdd?: (card: CardBrief) => void
}

export default function CardTile({ card, onAdd }: Props) {
  const src = imageUrl(card.image)
  return (
    <div className="card-tile">
      {src
        ? <img src={src} alt={card.name} loading="lazy" />
        : <div className="card-placeholder">{card.name}</div>}
      <p>{card.name}</p>
      {onAdd && <button onClick={() => onAdd(card)}>+ Add</button>}
    </div>
  )
}