'use client'

import ThemeProvider from "@/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderWrapper from "@/components/client/SessionProviderWrapper";
import ThemeToggle from "@/theme/theme-toggle";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Amiri, Cairo } from 'next/font/google'
import Head from "next/head";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
const amiri = Amiri({
  weight: '400',
  subsets: ['arabic'],
})

const queryClient = new QueryClient();

export default function RootLayout({
  children,
  // menuContent
}: Readonly<{
  children: React.ReactNode;
  // menuContent: any;
}>) {
  
  return (
    <html lang="ar" suppressHydrationWarning className={amiri.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="w-full overflow-y-auto">
        <QueryClientProvider client={queryClient}>
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
            {/* <div className="flex flex-row gap-2 p-4">
              <Menu menuContent={menuContent} />    
            </div>         */}
              <BlurBackground>
                <div className="w-full">
                  <Suspense>
                    {children}
                  </Suspense>
                </div>
              </BlurBackground>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
