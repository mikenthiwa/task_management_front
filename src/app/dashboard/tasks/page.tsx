import { createStore } from '@/core/store/store';
import { Box, Typography } from '@mui/material';
import { TaskModalComponent } from '@/features/tasks/components/task-modal.component';
import { userApi } from '@/core/services/users';
import { TaskViewComponent } from '@/features/tasks/components/task-view.component';
import { ReportModalComponent } from '@/features/tasks/components/report-modal.component';
import { TaskSearchBar } from '@/features/tasks/components/task-search-bar.component';

const TasksPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    pageNumber?: number;
    status?: string;
    assignedTo?: string;
    searchTerm?: string;
  }>;
}) => {
  const store = createStore();
  const sp = await searchParams;
  const pageNumber = Number(sp.pageNumber ?? 1);
  const status = sp.status;
  const assignedTo = sp.assignedTo;
  const searchTerm = sp.searchTerm;
  const promise = store.dispatch(userApi.endpoints.getUsers.initiate());
  const { data: users } = await promise;

  return (
    <Box>
      <Box
        className='mb-5 grid items-center gap-3'
        sx={{ gridTemplateColumns: { xs: '1fr', md: 'auto 1fr auto' } }}
      >
        <Typography variant='h5' fontWeight='700'>
          All Tasks
        </Typography>
        <Box sx={{ width: '100%' }}>{<TaskSearchBar />}</Box>
        <Box className='flex justify-end gap-2'>
          <ReportModalComponent />
          <TaskModalComponent />
        </Box>
      </Box>
      <TaskViewComponent
        users={users!}
        pageNumber={pageNumber}
        status={status}
        assignedTo={assignedTo}
        searchTerm={searchTerm}
      />
    </Box>
  );
};

export default TasksPage;
