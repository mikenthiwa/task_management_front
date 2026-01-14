import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import { SignalRInitializer } from '@/core/realtime/signalR-initializer';
import { DashboardLayoutClient } from '@/features/dashboard-layout/dashboard-layout-client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <SignalRInitializer />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </div>
  );
};

export default DashboardLayout;
