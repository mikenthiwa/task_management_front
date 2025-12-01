'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@mui/material';
import { NotificationComponent } from '@/features/header/component/notification.component';
import { Box } from '@mui/system';

export default function HeaderComponent() {
  const { status, data } = useSession();

  return (
    <header className='flex items-center justify-between px-6 py-4 shadow-md bg-background sticky top-0 z-10 border-b border-neutral'>
      <Link href='/' className='text-xl font-bold'>
        Task Manager
      </Link>
      <Box className='flex justify-between items-center gap-4'>
        {status === 'authenticated' ? (
          <>
            <NotificationComponent userId={data.user.id!} />
            <Button
              variant='contained'
              onClick={() => signOut()}
              className='bg-primary'
              size='small'
            >
              Logout
            </Button>
          </>
        ) : null}
      </Box>
    </header>
  );
}
