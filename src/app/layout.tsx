import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { LocaleProvider } from "./localeContext";
import { ThemeProvider } from "./providers";

export const metadata = {
  title: "Food AI",
  icons: {
    icon: "/images/logo.png",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <LocaleProvider>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Analyze your food with AI" />
        </Head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </LocaleProvider>
    </html>
  );
}
