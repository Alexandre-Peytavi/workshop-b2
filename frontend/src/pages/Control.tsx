export function Control() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-emerald-500 text-xs uppercase tracking-widest mb-2 font-medium">Dimension C-137</p>
        <h1 className="text-3xl font-black text-white mb-2 portal-text-glow">Contrôle MQTT</h1>
        <p className="text-emerald-700 text-sm">Connexion au broker et visualisation du joystick Arduino.</p>
      </div>
      <div className="bg-[#0b1a14] border border-dashed border-emerald-900/50 rounded-xl p-16 text-center">
        <p className="text-5xl mb-4">🕹️</p>
        <p className="text-emerald-700">Interface MQTT à brancher</p>
      </div>
    </div>
  )
}
