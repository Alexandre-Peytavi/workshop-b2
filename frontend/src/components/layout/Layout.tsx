import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FicheTechnique } from '../FicheTechnique'
import { OBJECTS } from '../../data/objects'
import type { ConnectedObject } from '../../types'

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [scanned, setScanned] = useState<ConnectedObject | null>(null)

  useEffect(() => {
    let lastUid = ''

    const interval = setInterval(() => {
      fetch('http://localhost:8000/get-object.php')
        .then(res => res.json())
        .then(data => {
          if (data.uid && data.uid !== lastUid) {
            lastUid = data.uid
            const found = OBJECTS.find(obj => obj.name === data.uid)
            if (found) setScanned(found)
          }
        })
        .catch(err => console.error(err))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const links = [
    { to: '/', label: '🕹 Arcade' },
    { to: '/objects', label: '📦 Objets' },
  ]

  return (
    <div className="min-h-screen bg-[#060b0f] text-emerald-100 flex flex-col">
      <FicheTechnique object={scanned} onClose={() => setScanned(null)} />
      <header className="border-b border-emerald-900/40 bg-black/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-13 flex items-center gap-6">
          <span className="font-black text-base tracking-tight text-emerald-400 portal-text-glow whitespace-nowrap">
            ☢ R&M ARCADE
          </span>
          <nav className="flex gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  location.pathname === to
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                    : 'text-emerald-700 hover:text-emerald-300 hover:bg-emerald-900/30'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-4">{children}</main>
    </div>
  )
}