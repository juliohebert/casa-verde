import Link from "next/link"
import { ArrowUpRight, Building2, CirclePlus, Eye, Radio } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow="Fase 1"
          title="Suas propriedades"
          description="Este shell ja esta pronto para receber os dados reais do Supabase."
        />
        <Button asChild>
          <Link href="/admin/propriedades/nova">
            <CirclePlus />
            Adicionar imovel
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["2", "Propriedades", Building2],
          ["1", "Guia publicado", Radio],
          ["24", "Visualizacoes demo", Eye],
        ].map(([value, label, Icon]) => (
          <Card key={label as string}>
            <CardHeader>
              <CardDescription>{label as string}</CardDescription>
              <CardAction>
                <Icon className="size-4 text-primary" />
              </CardAction>
              <CardTitle className="text-3xl">{value as string}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Badge className="w-fit">Publicado</Badge>
          <CardTitle className="text-2xl">Casa do Vale</CardTitle>
          <CardDescription>
            Estrada das Palmeiras, 120, Serra Verde
          </CardDescription>
          <CardAction>
            <Button asChild variant="outline" size="sm">
              <Link href="/guide/demo">
                Visualizar
                <ArrowUpRight />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {["Check-in 15:00", "Check-out 11:00", "Atualizado hoje"].map(
            (item) => (
              <div key={item} className="rounded-2xl bg-muted p-4 text-sm">
                {item}
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  )
}
