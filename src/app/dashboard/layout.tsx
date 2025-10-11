import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';

import HeaderComponent from '@/features/header/component/header.component';
import { Box } from '@mui/material';
import { SideBarComponent } from '@/features/side-bar/components/side-bar.component';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',

  subsets: ['latin'],
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <HeaderComponent />
      <Box className='h-screen flex overflow-hidden'>
        <aside className='border-border border-r flex-shrink-0 w-[80px] md:min-w-[250px]'>
          <SideBarComponent />
        </aside>
        <main className='flex-grow p-6 md:p-12 overflow-y-auto h-full'>
          {children}
        </main>
      </Box>
    </div>
  );
};

export default DashboardLayout;
