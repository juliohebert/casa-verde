import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import { cn } from "@/lib/utils";
import {
  dancingScript,
  dmSerifDisplay,
  geistMono,
  nunitoSans,
} from "@/app/fonts";

export const metadata: Metadata = {
  title: {
    default: "Casa Verde",
    template: "%s | Casa Verde",
  },
  description: "Guias digitais acolhedores para anfitrioes e seus hospedes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        nunitoSans.variable,
        geistMono.variable,
        dmSerifDisplay.variable,
        dancingScript.variable,
      )}
    >
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
