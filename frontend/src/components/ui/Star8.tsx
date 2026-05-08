interface Star8Props { size?: number; color?: string; className?: string }

export default function Star8({ size = 16, color = 'currentColor', className }: Star8Props) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke={color} strokeWidth="1" className={className}>
      <path d="M16 2 19 10 27 7 24 15 32 16 24 17 27 25 19 22 16 30 13 22 5 25 8 17 0 16 8 15 5 7 13 10 Z" transform="scale(.92) translate(1.4 1.4)"/>
      <circle cx="16" cy="16" r="3" stroke={color}/>
    </svg>
  )
}
