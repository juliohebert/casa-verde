import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";

  return (
    <Card className="border border-border/70 shadow-soft dark:border-white/10 dark:bg-[oklch(0.255_0.025_135)] dark:shadow-2xl dark:shadow-black/35 dark:ring-white/5">
      <CardHeader>
        <CardTitle className="font-sans text-3xl font-semibold tracking-tight dark:text-white">
          {isLogin ? "Acesso do gestor" : "Crie sua conta"}
        </CardTitle>
        <CardDescription className="dark:text-white/65">
          {isLogin
            ? "Entre para gerenciar as informacoes dos seus imoveis."
            : "Comece a montar o guia digital da sua primeira propriedade."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            {!isLogin && (
              <>
                <Field>
                  <FieldLabel htmlFor="owner-name">Seu nome</FieldLabel>
                  <Input
                    id="owner-name"
                    name="owner-name"
                    autoComplete="name"
                    placeholder="Ex.: Maria Silva"
                    className="dark:border-white/15 dark:bg-black/20 dark:text-white dark:focus-visible:border-primary"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="property-name">
                    Nome da propriedade
                  </FieldLabel>
                  <Input
                    id="property-name"
                    name="property-name"
                    placeholder="Ex.: Casa do Vale"
                    className="dark:border-white/15 dark:bg-black/20 dark:text-white dark:focus-visible:border-primary"
                  />
                </Field>
              </>
            )}
            <Field>
              <FieldLabel htmlFor={`${mode}-email`}>E-mail</FieldLabel>
              <Input
                id={`${mode}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                className="dark:border-white/15 dark:bg-black/20 dark:text-white dark:focus-visible:border-primary"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${mode}-password`}>Senha</FieldLabel>
              <Input
                id={`${mode}-password`}
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                placeholder="Digite sua senha"
                className="dark:border-white/15 dark:bg-black/20 dark:text-white dark:focus-visible:border-primary"
              />
            </Field>
            <Button type="button" size="lg" className="w-full">
              {isLogin ? "Entrar" : "Cadastrar e comecar"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground dark:text-white/60">
        {isLogin ? "Ainda nao tem uma conta?" : "Ja possui uma conta?"}
        <Button asChild variant="link" className="px-2">
          <Link href={isLogin ? "/cadastro" : "/login"}>
            {isLogin ? "Cadastre-se" : "Fazer login"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
