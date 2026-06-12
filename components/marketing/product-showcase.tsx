import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  ContactRound,
  Copy,
  KeyRound,
  MapPinned,
  MessageSquareHeart,
  PackageCheck,
  Radio,
  ScrollText,
  Wifi,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agbalumo } from "@/app/fonts";
import { cn } from "@/lib/utils";

const guideItems = [
  { label: "Check-in", icon: KeyRound, tone: "bg-[#e7efd8]" },
  { label: "Wi-Fi", icon: Wifi, tone: "bg-[#f3e4c9]" },
  { label: "Direções", icon: MapPinned, tone: "bg-[#dcebe6]" },
  { label: "Regras", icon: ScrollText, tone: "bg-[#eee3d8]" },
  { label: "Comodidades", icon: PackageCheck, tone: "bg-[#e4e0ef]" },
  { label: "Contato", icon: ContactRound, tone: "bg-[#e8ecd7]" },
];

const featureTicker = [
  "Check-in e check-out",
  "Senha do Wi-Fi",
  "Código de acesso",
  "Regras da casa",
  "Contato do anfitrião",
  "Direções",
  "Comodidades",
  "Feedback",
];

export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden border-t bg-background pb-12 pt-20 sm:pb-14 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-leaf-pattern opacity-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <h2
              className={cn(
                agbalumo.className,
                "max-w-3xl text-balance text-4xl leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl",
              )}
            >
              Um guia que acompanha toda a estadia.
            </h2>
          </div>
          <div className="space-y-5 lg:pb-1">
            <p className="text-pretty text-lg text-muted-foreground">
              Reúna as orientações da propriedade em uma experiência simples
              para o hóspede e fácil de gerir para o anfitrião.
            </p>
            <Button asChild variant="outline">
              <Link href="/guide/demo">
                Conhecer o guia
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="group relative min-h-[34rem] overflow-hidden border-primary/15 bg-primary p-0 text-primary-foreground shadow-soft lg:col-span-7 lg:row-span-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_88%_88%,rgba(255,255,255,0.1),transparent_28%)]" />
            <CardHeader className="relative max-w-xl p-7 sm:p-9">
              <Badge className="w-fit border-white/15 bg-white/10 text-white">
                Guia do hóspede
              </Badge>
              <CardTitle className="font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Cada informação aparece na hora certa.
              </CardTitle>
              <CardDescription className="max-w-lg text-base text-white/70">
                O hóspede acessa tudo pelo celular, sem criar conta e sem
                procurar mensagens antigas.
              </CardDescription>
            </CardHeader>

            <CardContent className="relative flex flex-1 items-end justify-center px-5 pb-0 sm:px-10">
              <div className="showcase-float relative w-full max-w-lg translate-y-6 rounded-t-[2.5rem] border border-white/25 bg-background p-5 text-foreground shadow-2xl transition-transform duration-500 group-hover:translate-y-3 sm:p-7">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Casa do Vale
                    </p>
                    <h3 className="mt-1 font-sans text-2xl font-semibold tracking-tight text-primary">
                      Bem-vindo!
                    </h3>
                  </div>
                  <span className="relative flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
                    <Radio className="size-4" />
                    <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {guideItems.map(({ label, icon: Icon, tone }, index) => (
                    <div
                      key={label}
                      className="showcase-rise rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      style={{ animationDelay: `${index * 110}ms` }}
                    >
                      <span
                        className={`mb-4 grid size-9 place-items-center rounded-lg text-primary ${tone}`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <p className="text-sm font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="showcase-drift absolute left-8 top-5 hidden rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md sm:block">
                <span className="flex items-center gap-2">
                  <Check className="size-3.5" />
                  Guia publicado
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-primary/10 bg-[#f1eadc] transition-transform duration-500 hover:-translate-y-1 dark:bg-card lg:col-span-5">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Copy className="size-5" />
                </span>
                <Badge variant="outline" className="bg-background/60">
                  Sem login
                </Badge>
              </div>
              <CardTitle className="pt-4 font-sans text-3xl font-semibold leading-tight tracking-tight">
                Um link para cada propriedade.
              </CardTitle>
              <CardDescription className="text-base">
                Compartilhe o guia antes da chegada e mantenha todas as
                orientações sempre acessíveis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-xl border bg-background/80 p-3 shadow-sm">
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                  casaverde.app/guide/casa-do-vale
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Copy className="size-3.5" />
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-primary/10 bg-[#dfe8d1] transition-transform duration-500 hover:-translate-y-1 dark:bg-card lg:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-background text-primary shadow-sm">
                  <Clock3 className="size-5" />
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="showcase-pulse size-2 rounded-full bg-emerald-500" />
                  Sempre disponível
                </span>
              </div>
              <CardTitle className="pt-4 font-sans text-3xl font-semibold leading-tight tracking-tight">
                Da chegada ao check-out.
              </CardTitle>
              <CardDescription className="text-base">
                Acesso, horários, contato e feedback organizados em uma jornada
                fácil de entender.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-1.5">
              {[
                ["15:00", "Check-in", KeyRound],
                ["Durante", "Suporte", ContactRound],
                ["11:00", "Check-out", MessageSquareHeart],
              ].map(([value, label, Icon]) => (
                <div
                  key={label as string}
                  className="rounded-xl border border-primary/10 bg-background/70 p-3 transition-colors group-hover:bg-background"
                >
                  <Icon className="mb-4 size-4 text-primary" />
                  <p className="font-sans text-lg font-semibold text-primary">
                    {value as string}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {label as string}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border bg-card/70 py-3 shadow-sm">
          <div className="showcase-marquee flex w-max items-center">
            {[...featureTicker, ...featureTicker].map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="flex items-center gap-3 px-5 text-sm font-medium text-muted-foreground"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
