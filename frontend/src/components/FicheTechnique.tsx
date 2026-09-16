import { useEffect } from 'react'
import type { ConnectedObject } from '../types'

const rarityStyle: Record<string, { badge: string; glow: string; accent: string }> = {
  Commun:       { badge: 'text-slate-400 bg-slate-800/60 border-slate-600',   glow: 'shadow-slate-500/20',   accent: 'text-slate-400' },
  'Peu commun': { badge: 'text-green-400 bg-green-900/30 border-green-700',   glow: 'shadow-green-500/20',   accent: 'text-green-400' },
  Rare:         { badge: 'text-blue-400 bg-blue-900/30 border-blue-700',      glow: 'shadow-blue-500/20',    accent: 'text-blue-400' },
  Légendaire:   { badge: 'text-yellow-400 bg-yellow-900/30 border-yellow-600', glow: 'shadow-yellow-500/20', accent: 'text-yellow-400' },
}

interface Props {
  object: ConnectedObject | null
  onClose: () => void
}

export function FicheTechnique({ object, onClose }: Props) {
  const visible = object !== null

  useEffect(() => {
    if (!visible) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onClose])

  const rarity = object?.specs['Rareté'] ?? 'Commun'
  const style = rarityStyle[rarity] ?? rarityStyle['Commun']

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col bg-[#080f0c] border-l border-emerald-900/60 shadow-2xl ${style.glow} transition-transform duration-300 ease-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-500 text-xs uppercase tracking-widest font-bold">RFID détecté</span>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-700 hover:text-emerald-300 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {object && (
          <div className="flex-1 overflow-y-auto">
            {/* Hero */}
            <div className="px-6 py-8 border-b border-emerald-900/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              <p className="text-emerald-600 text-xs uppercase tracking-widest font-medium mb-2">{object.category}</p>
              <h2 className="text-2xl font-black text-white mb-1 portal-text-glow">{object.name}</h2>
              <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mt-1 mb-4 ${style.badge}`}>
                {rarity}
              </span>
              <p className="text-emerald-300/60 text-sm leading-relaxed">{object.description}</p>
            </div>

            {/* Specs */}
            <div className="px-6 py-6">
              <p className="text-emerald-700 text-xs uppercase tracking-widest font-bold mb-4">Fiche technique</p>
              <dl className="space-y-0">
                {Object.entries(object.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-emerald-900/30 last:border-0 gap-4">
                    <dt className="text-emerald-700 text-sm shrink-0">{key}</dt>
                    <dd className={`text-sm font-semibold text-right ${key === 'Rareté' ? style.accent : 'text-emerald-200'}`}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
