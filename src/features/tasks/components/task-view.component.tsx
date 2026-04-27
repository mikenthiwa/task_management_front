'use client';

import { useGetTasksQuery, useSearchTasksQuery } from '@/core/services/task';
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
  status,
  assignedTo,
  searchTerm,
}: {
  users: IUser[];
  pageNumber: number;
  status?: string;
  assignedTo?: string;
  searchTerm?: string;
}) => {
  const { data: session } = useSession();
  const isSearching = !!searchTerm && searchTerm.trim().length > 0;
  const {
    data,
    isLoading: tasksLoading,
    isSuccess,
  } = useGetTasksQuery(
    { pageNumber, pageSize: DEFAULT_PAGE_SIZE, status, assignedTo },
    { skip: isSearching }
  );
  const {
    data: searchData,
    isLoading: searchLoading,
    isSuccess: searchSuccess,
  } = useSearchTasksQuery(
    { searchTerm: searchTerm || '' },
    { skip: !isSearching }
  );
  const [taskList, setTaskList] = useState<Task[]>([]);
  useEffect(() => {
    if (!isSearching) {
      if (data && isSuccess) setTaskList(data.items);
    } else {
      if (searchData && searchSuccess) setTaskList(searchData);
      else if (!searchLoading) setTaskList([]);
    }
  }, [data, isSuccess, isSearching, searchData, searchSuccess, searchLoading]);

  if (tasksLoading || searchLoading)
    return (
      <Box className='w-full'>
        <Loading />
      </Box>
    );
  if (
    (!isSearching && (!data || !data.items)) ||
    (isSearching && taskList.length === 0)
  )
    return (
      <CustomInfoMessage
        message={
          isSearching ? `No tasks found for "${searchTerm}"` : 'No tasks available'
        }
      />
    );

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
        <TaskListComponent
          tasks={taskList}
          users={users}
          currentUserId={session?.user?.id}
        />
      </Grid>
      {!isSearching && data && (
        <Box className='fixed bottom-5 left-1/2 -translate-x-1/2'>
          <PaginationClient
            count={Math.ceil(data.count / DEFAULT_PAGE_SIZE)}
            page={pageNumber}
          />
        </Box>
      )}
    </Box>
  );
};
