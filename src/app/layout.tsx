import ThemeProvider from "@/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderWrapper from "@/components/client/SessionProviderWrapper";
import MembersContextProvider from "@/components/client/MembersContextProvider";
import ThemeToggle from "@/theme/theme-toggle";
import { BlurBackground } from "@/components/ui/BlurBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
              <BlurBackground className="">
                {children}
              </BlurBackground>
            </MembersContextProvider>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
