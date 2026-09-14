import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NIFTY AlphaLab — AI-Native Trading Research Prototype',
  description:
    'Structured hypothesis exploration: ASK → CLARIFY → DEFINE → TEST → LEARN for Indian equities (NIFTY 50)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
