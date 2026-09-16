import { useNavigate, useParams } from 'react-router-dom'
import { getObjectById } from '../data/objects'

const rarityStyle: Record<string, string> = {
  Commun: 'text-slate-400 bg-slate-800/60 border-slate-700',
  'Peu commun': 'text-green-400 bg-green-900/30 border-green-800',
  Rare: 'text-blue-400 bg-blue-900/30 border-blue-800',
  Légendaire: 'text-yellow-400 bg-yellow-900/30 border-yellow-700',
}

export function ObjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const obj = id ? getObjectById(id) : undefined

  if (!obj) {
    return (
      <div className="text-center py-20">
        <p className="text-emerald-700 text-lg mb-4">Objet introuvable dans cette dimension.</p>
        <button onClick={() => navigate('/')} className="text-emerald-500 hover:text-emerald-300 text-sm">
          ← Retour
        </button>
      </div>
    )
  }

  const rarity = obj.specs['Rareté'] ?? 'Commun'

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-400 text-sm mb-6 transition-colors"
      >
        ← Retour aux objets
      </button>

      <div className="bg-[#0b1a14] border border-emerald-800/50 rounded-2xl overflow-hidden portal-glow">
        {/* Header */}
        <div className="relative p-8 border-b border-emerald-900/50 bg-gradient-to-br from-emerald-950/60 to-transparent">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start justify-between mb-3">
            <p className="text-emerald-600 text-xs uppercase tracking-widest font-medium">{obj.category}</p>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${rarityStyle[rarity]}`}>
              {rarity}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mb-3 portal-text-glow">{obj.name}</h1>
          <p className="text-emerald-300/70 leading-relaxed text-sm">{obj.description}</p>
        </div>

        {/* Specs */}
        <div className="p-8">
          <p className="text-emerald-600 text-xs uppercase tracking-widest font-medium mb-4">
            Fiche technique
          </p>
          <dl className="space-y-0">
            {Object.entries(obj.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-emerald-900/40 last:border-0">
                <dt className="text-emerald-700 text-sm">{key}</dt>
                <dd className="text-emerald-200 text-sm font-semibold text-right max-w-[60%]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
