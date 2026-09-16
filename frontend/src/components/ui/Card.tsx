interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  glow?: boolean
}

export function Card({ children, className = '', onClick, glow }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900 border border-slate-700 rounded-xl p-4 ${glow ? 'shadow-lg shadow-purple-900/30 border-purple-700/50' : ''} ${onClick ? 'cursor-pointer hover:border-purple-600 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
