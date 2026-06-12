"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="grid min-h-svh place-items-center bg-background p-6 text-foreground">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="font-serif text-3xl text-primary">
              Nao foi possivel abrir a Casa Verde
            </h1>
            <p className="text-muted-foreground">
              Ocorreu uma falha inesperada na aplicacao.
            </p>
            <Button onClick={() => unstable_retry()}>Recarregar</Button>
          </div>
        </main>
      </body>
    </html>
  )
}
