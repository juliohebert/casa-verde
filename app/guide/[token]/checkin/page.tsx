import Link from "next/link"
import { ArrowLeft, Clock3, KeyRound, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function CheckInPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <Button asChild variant="ghost">
        <Link href={`/guide/${token}`}>
          <ArrowLeft />
          Voltar ao guia
        </Link>
      </Button>
      <header className="text-center">
        <h1 className="font-script text-6xl text-primary">Guia de Check-in</h1>
        <p className="font-serif text-xl text-primary/70">Chegada e acesso</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Clock3 className="size-5 text-primary" />
            <CardTitle>Horarios</CardTitle>
            <CardDescription>Entrada 15:00, saida 11:00</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <KeyRound className="size-5" />
            <CardTitle>Codigo de acesso</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-4xl font-bold tracking-[0.2em]">
            8492#
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MapPin className="size-5 text-primary" />
            <CardTitle>Localizacao</CardTitle>
            <CardDescription>Estrada das Palmeiras, 120</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
