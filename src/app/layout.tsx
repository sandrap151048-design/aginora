import type { Metadata } from "next";
import { Inter, Poppins, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const playfair = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ajinorah Entrance Academy | Expert NEET, JEE, KEAM Coaching",
  description: "Shape your future with Ajinorah Entrance Academy. Expert entrance coaching for NEET, JEE, KEAM, and CUET with integrated schooling and personal mentoring.",
  keywords: "NEET coaching, JEE coaching, KEAM coaching, Ajinorah Entrance Academy, Entrance coaching Kerala",
};

import { Providers } from "@/components/Providers";
import MobileNav from "@/components/layout/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-poppins antialiased bg-light text-dark`}>
        <Providers>
          {children}
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
