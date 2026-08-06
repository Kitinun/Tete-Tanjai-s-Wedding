import type { Metadata } from "next";
import { Prompt, Playfair_Display, Alex_Brush } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer";
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
    "ขอเชิญร่วมงานมงคลสมรส วงศธร & ภัทรภัค (แทนใจ & เตเต้) วันเสาร์ที่ 19 กันยายน 2026 ณ The Halls Bangkok #haveaTtime",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💖</text></svg>",
  },
  openGraph: {
    title: "TeteTanjai's Wedding",
    description:
      "ขอเชิญร่วมงานมงคลสมรส วงศธร & ภัทรภัค (แทนใจ & เตเต้) วันเสาร์ที่ 19 กันยายน 2026 ณ The Halls Bangkok #haveaTtime",
    url: "https://tetetanjai-wedding.vercel.app", // Placeholder URL
    siteName: "Tete-Tanjai's Wedding",
    images: [
      {
        url: "https://tetetanjaiwedding.my.canva.site/_assets/media/dd7ab6ed5c1a6a58cc15c529fa093ebf.jpg",
        width: 1200,
        height: 630,
        alt: "Tete & Tanjai Wedding Invitation",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeteTanjai's Wedding",
    description:
      "ขอเชิญร่วมงานมงคลสมรส วงศธร & ภัทรภัค (แทนใจ & เตเต้) วันเสาร์ที่ 19 กันยายน 2026",
    images: [
      "https://tetetanjaiwedding.my.canva.site/_assets/media/dd7ab6ed5c1a6a58cc15c529fa093ebf.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${prompt.variable} ${playfair.variable} ${alexBrush.variable} antialiased`}
      >
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
