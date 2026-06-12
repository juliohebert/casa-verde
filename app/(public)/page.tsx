import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
} from "lucide-react";

import { ProductShowcase } from "@/components/marketing/product-showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agbalumo, playwriteEnglandJoined } from "@/app/fonts";
import heroBackground from "@/assets/hero-bg.jpg";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate flex flex-1 overflow-hidden border-b">
        <Image
          src={heroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div className="absolute inset-0 -z-20 bg-black/10" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.34)_38%,rgba(0,0,0,0.08)_68%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/25 to-transparent" />

        <div className="mx-auto grid min-h-svh w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-32">
          <div className="relative isolate space-y-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.16)_55%,transparent_78%)] blur-xl"
            />
            <Badge
              variant="secondary"
              className="gap-2 border border-white/20 bg-background/90 text-primary shadow-lg backdrop-blur-md"
            >
              <Leaf className="size-3.5" />
              Facilite a vida dos seus hóspedes
            </Badge>
            <div className="space-y-5">
              <h1
                className={cn(
                  agbalumo.className,
                  "max-w-3xl text-balance text-5xl leading-[0.98] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl",
                )}
              >
                Uma boa estadia começa com uma boa orientação.
              </h1>
              <p className="max-w-2xl text-pretty text-lg font-semibold text-white/85 drop-shadow-md">
                Crie guias digitais para suas propriedades e deixe check-in,
                Wi-Fi, regras e contatos sempre ao alcance do hospede.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shadow-lg shadow-black/20">
                <Link href="/cadastro">
                  Comecar agora
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/35 bg-background/90 shadow-lg shadow-black/10 backdrop-blur-md"
              >
                <Link href="/guide/demo">Explorar guia demonstrativo</Link>
              </Button>
            </div>
          </div>

          <Card className="relative overflow-visible border-white/25 bg-card/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="absolute -left-4 -top-4 size-24 rounded-[2rem] bg-secondary/90 shadow-lg backdrop-blur-md" />
            <CardHeader className="relative">
              <Badge
                className={cn(
                  playwriteEnglandJoined.className,
                  "p-3 text-md font-medium",
                )}
              >
                Casa do Campo
              </Badge>
              <CardTitle className="text-3xl font-sans">
                Tudo pronto para te receber
              </CardTitle>
              <CardDescription className="text-card-foreground/65">
                Prévia do guia digital criado para os hóspedes da Casa do Campo
              </CardDescription>
            </CardHeader>
            <CardContent className="relative grid gap-3 sm:grid-cols-2">
              {[
                "Guia publicado",
                "Check-in as 15:00",
                "Wi-Fi configurado",
                "8 regras registradas",
                "Restaurantes recomendados",
                "Supermercado proximo",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border/70 bg-background/82 p-4 text-sm font-medium shadow-sm backdrop-blur-md"
                >
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
      <ProductShowcase />
    </>
  );
}
