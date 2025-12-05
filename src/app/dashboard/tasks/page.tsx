import { createStore } from '@/store/store';
import { Box, Typography } from '@mui/material';
import { TaskModalComponent } from '@/features/tasks/components/task-modal.component';
import { userApi } from '@/core/services/users';
import { TaskViewComponent } from '@/features/tasks/components/task-view.component';

const TasksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ pageNumber: number }>;
}) => {
  const store = createStore();
  const pageNumber = Number((await searchParams).pageNumber ?? 1);
  const promise = store.dispatch(userApi.endpoints.getUsers.initiate());
  const { data: users } = await promise;

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
      <TaskViewComponent users={users!} pageNumber={pageNumber} />
    </Box>
  );
};

export default TasksPage;
