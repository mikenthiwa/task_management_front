'use client';
import { Box } from '@mui/material';
import RegisterFormComponent from '@/features/register/components/register-form.component';

const RegisterPage = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <RegisterFormComponent />;
    </Box>
  );
};

export default RegisterPage;
