import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PawCare India — Animal Care Discovery & Medical Intelligence',
  description:
    'Location-based veterinary discovery, 24/7 emergency casualty transit, and AI medical report simplification for pet parents and animal rescuers in Bengaluru.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
