'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function HeaderComponent() {
  const { status } = useSession();

  return (
    <header className='flex items-center justify-between px-6 py-4 shadow-md bg-white'>
      <Link href='/' className='text-xl font-bold'>
        Task Manager
      </Link>

      {status === 'authenticated' ? (
        <button
          onClick={() => signOut()}
          className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
        >
          Logout
        </button>
      ) : null}
    </header>
  );
}
