import { Box, Typography } from '@mui/material';

export const CustomInfoMessage = ({ message }: { message: string }) => {
  return (
    <Box className='flex justify-center items-center mt-5 font-bold'>
      <Typography variant='body1' gutterBottom>
        {message}
      </Typography>
    </Box>
  );
};
