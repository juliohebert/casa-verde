import { DashboardShell } from "@/components/shells/dashboard-shell"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell mode="super-admin">{children}</DashboardShell>
}
