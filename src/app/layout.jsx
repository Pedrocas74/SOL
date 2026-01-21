import "./globals.css";
import Navbar from "../components/layout/Navbar";
import CartStorageBridge from "@components/auth/CartStorageBridge";
import ReduxProvider from "../components/ReduxProvider";
import { Toaster } from "sonner";

import { ClerkProvider } from "@clerk/nextjs";

import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const gatwickJet = localFont({
  src: [
    {
      path: "./fonts/gatwick-jet/PPGatwick-JetExtralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/gatwick-jet/PPGatwick-JetSemibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-gatwick-jet",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SOL | For Those Who Shine",
  description: "Awesome e-commerce store.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="google" content="notranslate" />
        </head>
        <body className={`${inter.variable} ${gatwickJet.variable}`}>
          <ReduxProvider>
            <CartStorageBridge />
            <Navbar />
            <main>
              {children}
              <Toaster
                position="top-center"
                expand
                richColors
                duration={4000}
                toastOptions={{
                  style: {
                    fontSize: "1rem",
                    borderRadius: "15px",
                    color: "black",
                  },
                }}
              />
            </main>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
