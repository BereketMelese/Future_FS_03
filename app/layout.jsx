import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  preload: true,
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  preload: false,
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  title: "Addis Cup Coffee House",
  description: "Crafted coffee experience with a cozy, premium atmosphere.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <div className="page-bg" />
        <Navbar />
        <main className="relative z-10 min-h-screen px-4 pb-12 pt-24 sm:px-6 lg:px-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
