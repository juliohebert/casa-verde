"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  ChevronUp,
  CircleHelp,
  House,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react"

import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const hostItems = [
  { href: "/admin", label: "Visao geral", icon: LayoutDashboard },
  { href: "/admin/propriedades/nova", label: "Nova propriedade", icon: Building2 },
  { href: "/guide/demo", label: "Guia demonstrativo", icon: House },
]

const superAdminItems = [
  { href: "/super-admin", label: "Visao geral", icon: ShieldCheck },
  { href: "/super-admin#usuarios", label: "Usuarios", icon: Users },
  { href: "/super-admin#pagamentos", label: "Pagamentos", icon: WalletCards },
]

export function DashboardShell({
  children,
  mode = "host",
}: {
  children: React.ReactNode
  mode?: "host" | "super-admin"
}) {
  const pathname = usePathname()
  const items = mode === "host" ? hostItems : superAdminItems
  const identity =
    mode === "host"
      ? { name: "Elena Martins", email: "elena@casaverde.com", initials: "EM" }
      : { name: "Administrador", email: "admin@casaverde.com", initials: "AD" }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="px-2 py-1">
            <Brand href={mode === "host" ? "/admin" : "/super-admin"} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {mode === "host" ? "Gestao" : "Controle SaaS"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href.split("#")[0]}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Suporte</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Configuracoes">
                    <Settings />
                    <span>Configuracoes</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Ajuda">
                    <CircleHelp />
                    <span>Ajuda</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <Avatar className="size-8 rounded-xl">
                      <AvatarFallback className="rounded-xl bg-primary text-primary-foreground">
                        {identity.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{identity.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {identity.email}
                      </span>
                    </span>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end">
                  <DropdownMenuItem>
                    <Settings />
                    Minha conta
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <p className="text-xs text-muted-foreground">
                {mode === "host" ? "Area do anfitriao" : "Administracao"}
              </p>
              <p className="font-serif text-base text-primary">
                {mode === "host" ? "Casa Verde" : "Control Center"}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
