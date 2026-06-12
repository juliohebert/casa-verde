import { Brand } from "@/components/brand"
import { DecorativeLeaf } from "@/components/decorative-leaf"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

export function GuideShell({
  children,
  homeHref,
}: {
  children: React.ReactNode
  homeHref: string
}) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden">
      <DecorativeLeaf className="pointer-events-none fixed -left-12 -top-12 size-52 -rotate-12 opacity-[0.07]" />
      <DecorativeLeaf className="pointer-events-none fixed -right-20 top-0 size-72 rotate-45 opacity-[0.09]" />
      <header className="relative z-20">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Brand href={homeHref} />
          <ThemeToggle />
        </div>
      </header>
      <main className="relative z-10 flex-1 px-4 pb-16 sm:px-6">
        {children}
      </main>
      <footer className="relative z-10">
        <Separator />
        <p className="px-4 py-6 text-center text-xs text-muted-foreground">
          Guia Digital Casa Verde
        </p>
      </footer>
    </div>
  )
}
