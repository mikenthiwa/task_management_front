'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export default function HeaderComponent() {
  const { status } = useSession();

  return (
    <header className='flex items-center justify-between px-6 py-4 shadow-md bg-background sticky top-0 z-10'>
      <Link href='/' className='text-xl font-bold'>
        Task Manager
      </Link>

      {status === 'authenticated' ? (
        <Button
          variant='contained'
          onClick={() => signOut()}
          className='bg-primary'
        >
          Logout
        </Button>
      ) : null}
    </header>
  );
}
