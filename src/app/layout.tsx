import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'
import Navigation from '@/components/navigation'
import { Toaster } from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: 'AI-Advokát',
  description:
    'Zde je jeden z nejlepších asistentů AI pro právní záležitosti! Naše služby vám pomohou vyřešit problémy se stížnostmi, odvoláním před soudním řízením a smlouvami',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
