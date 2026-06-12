import { Activity, BadgeDollarSign, ShieldCheck, Users } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const metrics = [
  ["12", "Clientes totais", Users],
  ["10", "Licencas ativas", Activity],
  ["2", "Acessos suspensos", ShieldCheck],
  ["R$ 970", "Faturamento demo", BadgeDollarSign],
]

export default function SuperAdminPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PageHeader
        eyebrow="Super admin"
        title="Control Center"
        description="Estrutura visual pronta; role, metricas e operacoes reais entram nas fases de Auth e administracao."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([value, label, Icon]) => (
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
      <Card id="usuarios">
        <CardHeader>
          <CardTitle>Clientes recentes</CardTitle>
          <CardDescription>Dados demonstrativos da fundacao visual.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gestor</TableHead>
              <TableHead>Propriedade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Plano</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Elena Martins</TableCell>
              <TableCell>Casa do Vale</TableCell>
              <TableCell>
                <Badge variant="secondary">Ativo</Badge>
              </TableCell>
              <TableCell className="text-right">Trial</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marco Silva</TableCell>
              <TableCell>Chale Verde</TableCell>
              <TableCell>
                <Badge variant="outline">Suspenso</Badge>
              </TableCell>
              <TableCell className="text-right">Manual</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
