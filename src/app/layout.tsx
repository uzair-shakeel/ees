import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { PageLoader } from "@/components/PageLoader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mon Dossier · Procédure EEF",
  description: "Études en France simplement — dossier documents et validations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
      style={
        {
          ["--font-display" as string]:
            '"Neue Montreal", "Helvetica Neue", Inter, ui-sans-serif, sans-serif',
        } as React.CSSProperties
      }
    >
      <body className={`${inter.className} flex min-h-full flex-col bg-eef-mist text-eef-navy`}>
        <Script
          id="eef-page-loaded"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){function m(){document.documentElement.classList.add("eef-loaded");}if(document.readyState==="complete")m();else window.addEventListener("load",m,{once:true});})();`,
          }}
        />
        <PageLoader />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
