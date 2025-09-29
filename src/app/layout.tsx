import "~/styles/globals.css";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Toaster } from "~/components/ui/sonner";
import ReduxProvider from "~/components/ReduxProvider";

export const metadata: Metadata = {
  title: "ImgForgeKit",
  description: "Image editing tools for everyone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark flex min-h-screen flex-col">
        <ReduxProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Toaster />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
