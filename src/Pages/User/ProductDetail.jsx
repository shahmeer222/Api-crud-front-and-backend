import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl font-semibold text-brand">
        Product Detail
      </h1>
      <p className="mt-3 text-ink/60">Product id: {id} — coming soon.</p>
    </div>
  )
}
