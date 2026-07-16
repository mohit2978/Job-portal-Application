import { cn } from "@/lib/utils"

function Avatar({ className, ...props }) {
  return (
    <span
      className={cn("relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  )
}

function AvatarImage({ className, src, alt = "", ...props }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
