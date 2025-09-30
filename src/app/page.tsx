export const dynamic = 'force-dynamic';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import { Box, Grid, Typography } from '@mui/material';
import { taskAPI } from '@/core/services/task';
import { createStore } from '@/store/store';
import { PaginationClient } from '@/features/tasks/components/pagination-client.component';
import { CustomInfoMessage } from '@/ui/custom-info-message';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ pageNumber: number }>;
}) {
  const store = createStore();

  const pageNumber = Number((await searchParams).pageNumber ?? 1);
  const promise = store.dispatch(
    taskAPI.endpoints.getTasks.initiate({ pageNumber })
  );

  const { data } = await promise;

  if (!data) return;

  return (
    <Box>
      <Box className='mb-5 flex justify-between'>
        <Typography variant='h5' fontWeight={700}>
          All Tasks
        </Typography>
      </Box>
      {data.count === 0 && <CustomInfoMessage message='No tasks available' />}
      {data.count > 0 && (
        <Box>
          <Grid container spacing={2}>
            <TaskListComponent tasks={data!.items!} />
          </Grid>
          <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
            <PaginationClient
              count={Math.ceil(data!.count / 10)}
              page={pageNumber}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
