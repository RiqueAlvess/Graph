import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Graphite Engine",
  description: "SaaS moderno para gestão de dados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          {children}
        </main>
        
        {/* O Toaster gerencia os avisos (Toasts) que o backend envia */}
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}