'use client';
import { Box, Grid, Skeleton } from '@mui/material';

const loading = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box className='mb-5 flex justify-between'>
        <Skeleton
          variant='text'
          sx={{ fontSize: '3rem' }}
          className='w-1/2 md:w-1/4'
        />
      </Box>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid size={4} key={index}>
            <Skeleton variant='rectangular' height={120} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default loading;
