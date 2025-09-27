'use client';
import { useState } from 'react';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import { Box, Grid, Pagination } from '@mui/material';
import { useGetTasksQuery } from '@/core/services/task';

export default function Home() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data, isLoading } = useGetTasksQuery({ pageNumber });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <TaskListComponent tasks={data!.items!} />
      </Grid>
      <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
        <Pagination
          count={Math.ceil(data!.count / 10)}
          page={pageNumber}
          onChange={(_, value) => setPageNumber(value)}
        />
      </Box>
    </Box>
  );
}
