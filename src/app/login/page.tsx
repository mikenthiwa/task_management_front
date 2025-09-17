import { Box } from '@mui/material';
import LoginFormComponent from '@/features/login/components/login-form.component';

export default function Page() {
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
      <LoginFormComponent />
    </Box>
  );
}
