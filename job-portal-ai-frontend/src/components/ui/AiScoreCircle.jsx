import { cn } from "@/lib/utils"

export default function AiScoreCircle({ score, size = 40 }) {
  if (score == null) return null

  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const fraction = Math.max(0, Math.min(score, 100)) / 100
  const dash = fraction * circumference

  const color =
    score >= 75
      ? "#10b981" // emerald
      : score >= 50
      ? "#f59e0b" // amber
      : "#ef4444" // red

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={3}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
      </svg>
      <span
        className="absolute text-[10px] font-bold leading-none"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  )
}
