import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuditList — NBR Audit Selection Checker',
  description:
    'Check if your TIN is selected for NBR Risk-Based Audit for Assessment Year 2023–24. Instant lookup from the official published list.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Viewport ensures clean rendering on all devices */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}