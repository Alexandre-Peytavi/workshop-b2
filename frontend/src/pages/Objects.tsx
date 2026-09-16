import { useState } from 'react'
import { FicheTechnique } from '../components/FicheTechnique'
import { OBJECTS } from '../data/objects'
import type { ConnectedObject } from '../types'

const rarityStyle: Record<string, string> = {
  Commun:       'text-slate-400 bg-slate-800/60 border-slate-700',
  'Peu commun': 'text-green-400 bg-green-900/30 border-green-800',
  Rare:         'text-blue-400 bg-blue-900/30 border-blue-800',
  Légendaire:   'text-yellow-400 bg-yellow-900/30 border-yellow-700',
}

export function Objects() {
  const [selected, setSelected] = useState<ConnectedObject | null>(null)

  return (
    <>
      <FicheTechnique object={selected} onClose={() => setSelected(null)} />

      <div className="mb-8">
        <p className="text-emerald-500 text-xs uppercase tracking-widest mb-2 font-medium">Dimension C-137</p>
        <h1 className="text-3xl font-black text-white portal-text-glow">Artefacts</h1>
        <p className="text-emerald-700 text-sm mt-1">Cliquez sur un objet pour voir sa fiche technique.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OBJECTS.map((obj) => {
          const rarity = obj.specs['Rareté'] ?? 'Commun'
          return (
            <button
              key={obj.id}
              onClick={() => setSelected(obj)}
              className="text-left bg-[#0b1a14] border border-emerald-900/40 rounded-xl p-5 hover:border-emerald-500/60 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-emerald-700 text-xs uppercase tracking-wider font-medium">{obj.category}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${rarityStyle[rarity]}`}>
                  {rarity}
                </span>
              </div>
              <h2 className="text-white font-bold text-base mb-2 group-hover:text-emerald-300 transition-colors">
                {obj.name}
              </h2>
              <p className="text-emerald-800 text-sm leading-relaxed line-clamp-2">{obj.description}</p>
              <div className="mt-4 text-emerald-500 text-xs font-semibold flex items-center gap-1">
                Voir fiche
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}
