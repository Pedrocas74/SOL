
import "./globals.css";
import Navbar from "../components/Navbar";
import ReduxProvider from "../components/ReduxProvider";
import { Toaster } from "sonner";


import localFont from "next/font/local";

export const acma = localFont({
  src: [
    { path: "./fonts/acma/PPAcma-Thin.otf", weight: "100", style: "normal" },
    { path: "./fonts/acma/PPAcma-Light.otf", weight: "300", style: "normal" },
    {
      path: "./fonts/acma/PPAcma-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/acma/PPAcma-Black.otf", weight: "900", style: "normal" },
    {
      path: "./fonts/acma/PPAcma-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/acma/PPAcma-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/acma/PPAcma-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/acma/PPAcma-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-acma",
  display: "swap",
});

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

export const metadata = {
  title: "Redux Shop",
  description: "Awesome e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${acma.variable} ${gatwickJet.variable}`}>
        <ReduxProvider>
          <Navbar />
          <main>
            {children}
            <Toaster
              position="top-center"
              expand
              theme="light"
              duration={4000}
              toastOptions={{
                style: { fontSize: "1rem", borderRadius: "10px", color: "#1a1a1a" },
              }}
            />
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
