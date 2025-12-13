import React from 'react';
import Link from 'next/link';
import { NotificationComponent } from '@/features/header/component/notification.component';
import { Box } from '@mui/system';
import { LogoutComponent } from '@/features/header/component/logout.component';

export default async function HeaderComponent() {
  return (
    <header className='flex items-center justify-between px-6 py-4 shadow-md bg-background sticky top-0 z-10 border-b border-neutral'>
      <Link href='/' className='text-xl font-bold'>
        Task Manager
      </Link>
      <Box className='flex justify-between items-center gap-4'>
        <>
          <NotificationComponent />
          <LogoutComponent />
        </>
      </Box>
    </header>
  );
}
