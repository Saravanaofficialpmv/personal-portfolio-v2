import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Stack_Sans_Notch, Kavivanar, Arima } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WelcomePreloader from "@/components/WelcomePreloader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const stackSansNotch = Stack_Sans_Notch({
  variable: "--font-notch",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const kavivanar = Kavivanar({
  variable: "--font-kavivanar",
  subsets: ["tamil"],
  weight: "400",
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

const tamilCustomFont = localFont({
  src: "../fonts/tamil-calligraphy.ttf",
  variable: "--font-tamil-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saravana S — Product & Experience Designer",
  description:
    "Portfolio of Saravana S — product designer & developer with award-winning branding expertise, building at the intersection of culture, craft, and technology.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${stackSansNotch.variable} ${kavivanar.variable} ${arima.variable} ${tamilCustomFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#171717] font-sans selection:bg-[#E8342A] selection:text-white">
        <WelcomePreloader />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
