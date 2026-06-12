import {
  Agbalumo,
  Dancing_Script,
  DM_Serif_Display,
  Geist_Mono,
  Nunito_Sans,
  Playwrite_GB_J,
} from "next/font/google";

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
});

export const agbalumo = Agbalumo({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const playwriteEnglandJoined = Playwrite_GB_J({
  weight: "400",
  display: "swap",
});
