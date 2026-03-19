import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Addis Cup Coffee House",
  description: "Crafted coffee experience with a cozy, premium atmosphere.",
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
