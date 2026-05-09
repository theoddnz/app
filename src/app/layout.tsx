import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "TheOddOne — A place for people who think differently about learning.",
  description: "Build. Break. Repair. Repeat. The platform for contrarian learners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <Navbar />
          {children}

          <Toaster
            theme="system"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                color: "var(--popover-foreground)",
              },
            }}
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
