import type { Metadata, Viewport } from "next";
import { Geist_Mono, IBM_Plex_Sans, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/logo-mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "get c",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/brand/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
