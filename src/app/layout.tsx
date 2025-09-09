import ThemeProvider from "@/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderWrapper from "@/components/client/SessionProviderWrapper";
import MembersContextProvider from "@/components/client/MembersContextProvider";
import ThemeToggle from "@/theme/theme-toggle";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Amiri, Cairo } from 'next/font/google'
import Head from "next/head";
 
const amiri = Amiri({
  weight: '400',
  subsets: ['arabic'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ar" suppressHydrationWarning className={amiri.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="w-full overflow-y-auto">
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute top-4 right-4 z-60">
              <ThemeToggle />
            </div>            
            <MembersContextProvider>
              <BlurBackground>
                <div className="w-full">
                  {children}
                </div>
              </BlurBackground>
            </MembersContextProvider>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
