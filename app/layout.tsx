import type { Metadata } from "next";
import { Nunito_Sans, Baloo_2 } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Agende sua visita | Centro Educacional Louvor na Terra";
  const description = "Escolha o melhor dia e horário para conhecer nossa estrutura, nossa equipe e nosso método de ensino.";

  return {
    metadataBase: base,
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, type: "website", images: [{ url: new URL("/og-visita.png", base).toString(), width: 1200, height: 630, alt: "Agende sua visita ao Centro Educacional Louvor na Terra" }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og-visita.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} ${baloo.variable}`}>{children}</body>
    </html>
  );
}
