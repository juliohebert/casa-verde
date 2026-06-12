"use client"

import { useEffect } from "react"
import { CircleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-svh place-items-center p-6">
      <Empty className="max-w-lg">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleAlert />
          </EmptyMedia>
          <EmptyTitle>Algo saiu do caminho</EmptyTitle>
          <EmptyDescription>
            Nao conseguimos carregar esta area. Tente novamente em instantes.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => unstable_retry()}>Tentar novamente</Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
