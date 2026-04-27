import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-white text-black`}>
        {children}

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#140f0b",
              border: "1px solid rgba(196,98,45,0.2)",
              color: "#f0ebe5",
            },
          }}
          />
      </body>
    </html>
  );
}
