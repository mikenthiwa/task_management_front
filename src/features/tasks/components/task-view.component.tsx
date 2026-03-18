'use client';

import { useGetTasksQuery } from '@/core/services/task';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import Loading from '@/app/dashboard/tasks/loading';
import { Box, Grid } from '@mui/material';
import { IUser } from '@/core/common/interfaces/user';
import { PaginationClient } from '@/features/tasks/components/pagination-client.component';
import { CustomInfoMessage } from '@/ui/custom-info-message';
import { useEffect, useState } from 'react';
import { Task } from '@/core/common/interfaces/task';
import { useSession } from 'next-auth/react';
import { DEFAULT_PAGE_SIZE } from '@/core/common/constants';

export const TaskViewComponent = ({
  users,
  pageNumber,
}: {
  users: IUser[];
  pageNumber: number;
}) => {
  const { data: session } = useSession();
  const {
    data,
    isLoading: tasksLoading,
    isSuccess,
  } = useGetTasksQuery({ pageNumber, pageSize: DEFAULT_PAGE_SIZE });
  const [taskList, setTaskList] = useState<Task[]>([]);
  useEffect(() => {
    if (data && isSuccess) {
      setTaskList(data.items);
    }
  }, [data, isSuccess]);

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
      <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
        <TaskListComponent
          tasks={taskList}
          users={users}
          currentUserId={session?.user?.id}
        />
      </Grid>
      <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
        <PaginationClient
          count={Math.ceil(data.count / DEFAULT_PAGE_SIZE)}
          page={pageNumber}
        />
      </Box>
    </Box>
  );
};
