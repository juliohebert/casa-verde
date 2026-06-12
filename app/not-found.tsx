import Link from "next/link"
import { SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center p-6">
      <Empty className="max-w-lg">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>Pagina nao encontrada</EmptyTitle>
          <EmptyDescription>
            O endereco pode ter mudado ou o conteudo nao esta disponivel.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/">Voltar ao inicio</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
