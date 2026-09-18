import { useCallback, useEffect, useRef, useState } from 'react'
import { FicheTechnique } from '../components/FicheTechnique'
import { OBJECTS } from '../data/objects'
import type { ConnectedObject } from '../types'

type Dir = 'avant' | 'arriere' | 'gauche' | 'droite'

export function Home() {
  const [dropping, setDropping] = useState(false)
  const [detected, setDetected] = useState<ConnectedObject | null>(null)
  const held = useRef<Set<string>>(new Set())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  
const move = useCallback((_dir: Dir) => {
  fetch('api/send-command.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'cmd=' + _dir
  }).catch(err => console.error(err))
}, [])

// pince
const drop = () => {
  if (dropping) return
  setDropping(true)
  fetch('api/send-command.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'cmd=drop'
  }).catch(err => console.error(err))
  setTimeout(() => setDropping(false), 700)
}

  // nfc
  const checkNow = () => {
    fetch('api/get-object.php').then(res => res.json()).then(data => {
        const found = OBJECTS.find(obj => obj.name === data.uid)
        if (found) setDetected(found)}).catch(err => console.error(err))
  }

  // joystick
  useEffect(() => {
    const keyMap: Record<string, Dir> = {
      ArrowUp: 'avant', ArrowDown: 'arriere', ArrowLeft: 'gauche', ArrowRight: 'droite',
      z: 'avant', s: 'arriere', q: 'gauche', d: 'droite',
    }
    const down = (e: KeyboardEvent) => { if (keyMap[e.key]) { e.preventDefault(); held.current.add(e.key) } }
    const up = (e: KeyboardEvent) => { held.current.delete(e.key) }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    intervalRef.current = setInterval(() => {
      held.current.forEach((k) => { if (keyMap[k]) move(keyMap[k]) })
    }, 120)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [move])

  return (
    <>
      <FicheTechnique object={detected} onClose={() => setDetected(null)} />

      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12 select-none">

        {/* D-pad + DROP */}
        <div className="flex items-center gap-16">

          {/* D-pad */}
          <div className="flex flex-col items-center gap-2">
            <ArcadeBtn label="▲" sub="AVANT" onClick={() => move('avant')} />
            <div className="flex items-center gap-2">
              <ArcadeBtn label="◀" sub="GAU" onClick={() => move('gauche')} />
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800" />
              <ArcadeBtn label="▶" sub="DRO" onClick={() => move('droite')} />
            </div>
            <ArcadeBtn label="▼" sub="ARR" onClick={() => move('arriere')} />
          </div>

          {/* DROP */}
          <div className="flex flex-col items-center gap-3">
            <button
              onMouseDown={drop}
              disabled={dropping}
              className="w-32 h-32 rounded-full font-black text-xl tracking-wider transition-all duration-150 cursor-pointer disabled:opacity-60 active:scale-95"
              style={{
                background: dropping
                  ? 'radial-gradient(circle at 40% 35%, #b91c1c, #7f1d1d)'
                  : 'radial-gradient(circle at 40% 35%, #ef4444, #b91c1c)',
                boxShadow: dropping
                  ? '0 2px 0 #7f1d1d, 0 0 30px rgba(239,68,68,0.3)'
                  : '0 6px 0 #7f1d1d, 0 0 40px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                color: '#fecaca',
                transform: dropping ? 'translateY(4px)' : 'translateY(0)',
                border: '3px solid #dc2626',
              }}
            >
              {dropping ? '↓↓↓' : 'DROP'}
            </button>
            <span className="text-red-800 text-xs font-bold uppercase tracking-widest">Lâcher</span>
          </div>
        </div>

        {/* RFID test */}
        <button
          onClick={checkNow}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border border-emerald-700/40 text-emerald-600 hover:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-900/20 transition-all cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          RFID
        </button>

      </div>
    </>
  )
}

function ArcadeBtn({ label, sub, onClick }: { label: string; sub: string; onClick: () => void }) {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      onMouseDown={() => { setPressed(true); onClick() }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className="w-16 h-16 rounded-xl font-black text-lg text-emerald-300 cursor-pointer transition-all duration-75 flex flex-col items-center justify-center gap-0.5"
      style={{
        background: pressed
          ? 'radial-gradient(circle at 40% 35%, #064e3b, #022c22)'
          : 'radial-gradient(circle at 40% 35%, #065f46, #064e3b)',
        boxShadow: pressed
          ? '0 1px 0 #022c22, 0 0 12px rgba(52,211,153,0.15)'
          : '0 5px 0 #022c22, 0 0 20px rgba(52,211,153,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        border: '2px solid #047857',
        transform: pressed ? 'translateY(4px)' : 'translateY(0)',
      }}
    >
      <span>{label}</span>
      <span className="text-emerald-600 text-[9px] font-bold tracking-widest">{sub}</span>
    </button>
  )
}
