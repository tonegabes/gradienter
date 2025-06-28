import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Gerador de Gradientes Tailwind | 100 Cards com Cores Tailwind CSS",
  description: "Aplicação que gera 100 cards com gradientes usando apenas cores oficiais do Tailwind CSS. Cada card mostra as cores e classes Tailwind prontas para usar. Clique para copiar cores ou classes.",
  keywords: ["tailwind", "gradientes", "tailwind css", "cores", "design", "CSS", "Next.js", "classes tailwind"],
  authors: [{ name: "Tailwind Gradient Generator" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
