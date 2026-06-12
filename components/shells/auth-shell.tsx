import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

import { Brand } from "@/components/brand";
import { DecorativeLeaf } from "@/components/decorative-leaf";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.72fr)]">
      <aside className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground dark:bg-[oklch(0.24_0.045_135)] dark:text-white lg:flex lg:flex-col lg:justify-between">
        <DecorativeLeaf className="absolute -right-16 -top-8 size-80 text-primary-foreground opacity-10 dark:text-white dark:opacity-[0.06]" />
        <Brand className="text-primary-foreground dark:text-white [&>span:first-child]:dark:bg-white/10 [&>span:first-child]:dark:text-white" />
        <div className="relative max-w-xl space-y-6">
          <span className="inline-flex size-12 items-center justify-center rounded-3xl bg-primary-foreground/10 dark:bg-white/10">
            <Leaf className="size-5" />
          </span>
          <blockquote className="font-sans text-4xl font-semibold leading-tight tracking-tight dark:text-white">
            Um bom guia deixa a chegada mais leve antes mesmo da porta abrir.
          </blockquote>
          <p className="text-sm text-primary-foreground/70 dark:text-white/70">
            Centralize informacoes, acessos e orientacoes de cada propriedade.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60 dark:text-white/55">
          Casa Verde, 2026.
        </p>
      </aside>
      <main className="relative flex min-h-svh flex-col bg-background dark:bg-[oklch(0.16_0.015_135)]">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft />
              Inicio
            </Link>
          </Button>
          <div className="flex items-center gap-2 lg:hidden">
            <Brand compact />
            <ThemeToggle />
          </div>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 pb-16 sm:p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
