'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function HeaderComponent() {
  const { status } = useSession();

  return (
    <header className='flex items-center justify-between px-6 py-4 shadow-md bg-background sticky top-0 z-10'>
      <Link href='/' className='text-xl font-bold'>
        Task Manager
      </Link>

      {status === 'authenticated' ? (
        <button
          onClick={() => signOut()}
          className='rounded bg-primary px-4 py-2 ext-foreground hover:bg-red-600'
        >
          Logout
        </button>
      ) : null}
    </header>
  );
}
