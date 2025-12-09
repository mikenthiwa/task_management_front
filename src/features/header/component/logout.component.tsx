'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

export const LogoutComponent = () => {
  return (
    <Button
      variant='contained'
      onClick={() => signOut()}
      className='bg-primary'
      size='small'
    >
      Logout
    </Button>
  );
};
