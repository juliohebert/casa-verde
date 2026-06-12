import { cn } from "@/lib/utils"

export function DecorativeLeaf({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("text-primary", className)}
      fill="currentColor"
      viewBox="0 0 200 200"
    >
      <path d="M150 0c10 40-30 80-10 120C100 100 60 60 150 0Z" />
      <path
        d="M180 20c-10 40-40 70-20 110-40-20-70-60 20-110Z"
        opacity=".55"
      />
    </svg>
  )
}
