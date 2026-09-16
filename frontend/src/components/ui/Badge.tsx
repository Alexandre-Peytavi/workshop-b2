interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'purple'
}

const variantClasses = {
  default: 'bg-slate-700 text-slate-200',
  success: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700',
  warning: 'bg-yellow-900/60 text-yellow-300 border border-yellow-700',
  error: 'bg-red-900/60 text-red-300 border border-red-700',
  purple: 'bg-purple-900/60 text-purple-300 border border-purple-700',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
