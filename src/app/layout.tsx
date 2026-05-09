import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import GrainOverlay from "@/components/ui/GrainOverlay";

export const metadata: Metadata = {
  title: "Creative Video Editor Portfolio",
  description: "A high-end, cinematic portfolio website for a luxury video editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-brand-black text-brand-white selection:bg-brand-red selection:text-brand-white">
        <SmoothScroll>
          <div className="vignette" />
          <GrainOverlay />
          <Cursor />
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
