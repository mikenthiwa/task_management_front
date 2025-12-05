'use client';

import { useGetTasksQuery } from '@/core/services/task';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import Loading from '@/app/dashboard/tasks/loading';
import { Box, Grid } from '@mui/material';
import { IUser } from '@/core/common/interfaces/user';
import { PaginationClient } from '@/features/tasks/components/pagination-client.component';
import { CustomInfoMessage } from '@/ui/custom-info-message';

export const TaskViewComponent = ({
  users,
  pageNumber,
}: {
  users: IUser[];
  pageNumber: number;
}) => {
  const { data, isLoading: tasksLoading } = useGetTasksQuery({ pageNumber });

  if (tasksLoading)
    return (
      <Box className='w-full'>
        <Loading />
      </Box>
    );
  if (!data || !data.items)
    return <CustomInfoMessage message='No tasks available' />;

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        <TaskListComponent tasks={data.items} users={users} />
      </Grid>
      <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
        <PaginationClient
          count={Math.ceil(data.count / 10)}
          page={pageNumber}
        />
      </Box>
    </Box>
  );
};
