'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('error', error);
  }, [error]);

  return (
    <Box className='flex justify-center'>
      <Box
        role='alert'
        aria-live='assertive'
        className='w-full max-w-md rounded-xl border border-neutral-strong shadow-lg '
      >
        <Box className='px-6 pt-6 pb-4 text-center'>
          <Box className='mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center'>
            <ErrorIcon fontSize={'large'} className='text-error' />
          </Box>

          <Typography variant='h6'>Something went wrong</Typography>
          <Typography variant='body2'>
            Please try again. If the problem persists, contact support.
          </Typography>
        </Box>

        <Box className='px-6 pb-6 pt-2 grid grid-cols-2 gap-3'>
          <Button
            variant='contained'
            className='bg-primary'
            onClick={() => reset()}
          >
            Try again
          </Button>

          <Button variant='outlined' component={Link} href='/'>
            Go home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
