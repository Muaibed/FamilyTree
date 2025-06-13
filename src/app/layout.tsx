import ThemeProvider from "@/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderWrapper from "@/components/client/SessionProviderWrapper";
import MembersContextProvider from "@/components/client/MembersContextProvider";
import useSWR from "swr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#212226] dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]">
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MembersContextProvider>
              {children}
            </MembersContextProvider>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
