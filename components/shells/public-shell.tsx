import Link from "next/link";

import { Brand } from "@/components/brand";
import { DecorativeLeaf } from "@/components/decorative-leaf";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-leaf-pattern">
      <DecorativeLeaf className="pointer-events-none absolute -left-10 -top-8 size-48 -rotate-12 opacity-[0.07]" />
      <DecorativeLeaf className="pointer-events-none absolute -right-16 top-16 size-64 rotate-45 opacity-[0.08]" />
      <header className="absolute inset-x-0 top-0 z-30 overflow-hidden rounded-b-3xl border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <nav
            className="flex items-center gap-2"
            aria-label="Navegacao principal"
          >
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/guide/demo">Ver demonstracao</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <footer className="relative z-10">
        <Separator />
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Casa Verde. Todos os direitos
            reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}
