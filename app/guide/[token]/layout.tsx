import type { Metadata } from "next"

import { GuideShell } from "@/components/shells/guide-shell"

export const metadata: Metadata = {
  title: "Guia do hospede",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
}

export default async function GuideLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <GuideShell homeHref={`/guide/${token}`}>{children}</GuideShell>
}
