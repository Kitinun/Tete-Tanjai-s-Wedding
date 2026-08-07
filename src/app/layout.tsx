import type { Metadata } from "next";
import { Prompt, Playfair_Display, Alex_Brush } from "next/font/google";
import { WeddingDataProvider } from "@/lib/WeddingDataContext";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "TeteTanjai's Wedding",
  description:
    "You are cordially invited to the wedding of Wongsathon & Pattarapak (Tanjai & Tete) on Saturday, September 19, 2026, at The Halls Bangkok #haveaTtime",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>",
  },
  openGraph: {
    title: "TeteTanjai's Wedding",
    description:
      "You are cordially invited to the wedding of Wongsathon & Pattarapak (Tanjai & Tete) on Saturday, September 19, 2026, at The Halls Bangkok #haveaTtime",
    url: "https://tete-tanjai-wedding.vercel.app",
    siteName: "Tete-Tanjai's Wedding",
    images: [
      {
        url: "https://tete-tanjai-wedding.vercel.app/og-image-wide.jpg",
        width: 1200,
        height: 630,
        alt: "Tete & Tanjai Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeteTanjai's Wedding",
    description:
      "You are cordially invited to the wedding of Wongsathon & Pattarapak (Tanjai & Tete) on Saturday, September 19, 2026",
    images: [
      "https://tete-tanjai-wedding.vercel.app/og-image-wide.jpg",
    ],
  },
};

async function getInitialWeddingData() {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url) return { initialWishes: [], initialRsvpTotal: null };
  
  try {
    // Fetch data server-side and cache it for 60 seconds (ISR)
    const res = await fetch(url, { next: { revalidate: 60 } });
    const text = await res.text();
    if (text.trim().startsWith('<')) return { initialWishes: [], initialRsvpTotal: null };
    
    const result = JSON.parse(text);
    if (result.status === "success") {
      return { 
        initialWishes: result.data || [], 
        initialRsvpTotal: typeof result.rsvpTotal === "number" ? result.rsvpTotal : null 
      };
    }
  } catch (e) {
    console.error("Failed to fetch initial wedding data:", e);
  }
  return { initialWishes: [], initialRsvpTotal: null };
}

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialWishes, initialRsvpTotal } = await getInitialWeddingData();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://script.google.com" />
        <link rel="preconnect" href="https://script.googleusercontent.com" />
      </head>
      <body
        className={`${prompt.variable} ${playfair.variable} ${alexBrush.variable} antialiased`}
      >
        <WeddingDataProvider initialWishes={initialWishes} initialRsvpTotal={initialRsvpTotal}>
          {children}
        </WeddingDataProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
