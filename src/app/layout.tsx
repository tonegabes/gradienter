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
  title: "Tailwind Gradient Generator | 100 Cards with Tailwind CSS Colors",
  description: "Application that generates 100 gradient cards using only official Tailwind CSS colors. Each card shows colors and ready-to-use Tailwind classes. Click to copy colors or classes.",
  keywords: ["tailwind", "gradients", "tailwind css", "colors", "design", "CSS", "Next.js", "tailwind classes"],
  authors: [{ name: "Tailwind Gradient Generator" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
