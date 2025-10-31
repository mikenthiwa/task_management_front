import { createStore } from '@/store/store';
import { taskAPI } from '@/core/services/task';
import { Box, Grid, Typography } from '@mui/material';

import { CustomInfoMessage } from '@/ui/custom-info-message';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import { PaginationClient } from '@/features/tasks/components/pagination-client.component';
import { TaskModalComponent } from '@/features/tasks/components/task-modal.component';
import { userApi } from '@/core/services/users';

const TasksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ pageNumber: number }>;
}) => {
  const store = createStore();

  const pageNumber = Number((await searchParams).pageNumber ?? 1);

  const [taskResult, userResult] = await Promise.all([
    store
      .dispatch(taskAPI.endpoints.getTasks.initiate({ pageNumber }))
      .unwrap(),
    store.dispatch(userApi.endpoints.getUsers.initiate()).unwrap(),
  ]);

  return (
    <Box>
      <Box className='mb-5 flex justify-between'>
        <Typography variant='h5' fontWeight={700}>
          All Tasks
        </Typography>
        <Box>
          <TaskModalComponent />
        </Box>
      </Box>
      {taskResult.count === 0 && (
        <CustomInfoMessage message='No tasks available' />
      )}
      {taskResult.count > 0 && (
        <Box>
          <Grid
            container
            spacing={2}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            <TaskListComponent tasks={taskResult.items} users={userResult} />
          </Grid>
          <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
            <PaginationClient
              count={Math.ceil(taskResult.count / 10)}
              page={pageNumber}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TasksPage;
