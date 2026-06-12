import Link from "next/link"
import {
  ClipboardCheck,
  ContactRound,
  KeyRound,
  MapPinned,
  MessageSquareHeart,
  PackageCheck,
  ScrollText,
  Wifi,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

const menuItems = [
  ["Check-in e acesso", ClipboardCheck],
  ["Senha do Wi-Fi", Wifi],
  ["Direcoes e guia", MapPinned],
  ["Contato do anfitriao", ContactRound],
  ["Regras da casa", ScrollText],
  ["Comodidades", PackageCheck],
  ["Check-out", KeyRound],
  ["Feedback", MessageSquareHeart],
]

export default async function GuideHome({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  return (
    <div className="mx-auto max-w-6xl py-8 sm:py-12">
      <header className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
        <Badge variant="secondary">Guia demonstrativo</Badge>
        <h1 className="font-script text-6xl text-primary sm:text-7xl">
          Bem-vindo!
        </h1>
        <p className="font-serif text-3xl text-primary/80">Casa do Vale</p>
        <p className="text-muted-foreground">
          Seu refugio esta pronto. Aproveite cada detalhe.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {menuItems.map(([label, Icon], index) => (
          <Link
            key={label as string}
            href={index === 0 ? `/guide/${token}/checkin` : "#"}
            className="group"
          >
            <Card className="h-full min-h-40 justify-center border-primary/10 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
              <CardHeader className="items-center text-center">
                <span className="grid size-12 place-items-center rounded-3xl bg-secondary text-primary transition-transform group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="text-base">{label as string}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
