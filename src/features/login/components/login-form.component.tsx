import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { signIn } from '@/auth';

interface FormData {
  email: string;
  password: string;
}

const LoginFormComponent = () => {
  return (
    <Box
      bgcolor='white'
      px={4}
      py={4}
      borderRadius={2}
      boxShadow={3}
      mx='auto'
      display='flex'
      flexDirection='column'
      gap={3}
    >
      <form
        action={async (formData) => {
          'use server';
          await signIn('credentials', formData);
        }}
      >
        <Box className='flex flex-col gap-4' width='100%'>
          <TextField
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            size='small'
          />
          <TextField
            id='password'
            name='password'
            label='Password'
            variant='outlined'
            size='small'
            type='password'
          />

          <Button type='submit' variant='contained'>
            <span>Login</span>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginFormComponent;
