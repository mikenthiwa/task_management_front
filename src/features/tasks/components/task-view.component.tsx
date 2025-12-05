'use client';

import { useGetTasksQuery } from '@/core/services/task';
import { useState } from 'react';
import { useGetUsersQuery } from '@/core/services/users';
import { TaskListComponent } from '@/features/tasks/components/task-list.component';
import Loading from '@/app/dashboard/tasks/loading';
import { Box } from '@mui/material';

export const TaskViewComponent = () => {
  const [page, setPage] = useState({ pageNumber: 1, pageSize: 10 });
  const {
    data: tasksResponse,
    error: tasksError,
    isLoading: tasksLoading,
  } = useGetTasksQuery(page);

  const {
    data: usersResponse,
    error: usersError,
    isLoading: usersLoading,
  } = useGetUsersQuery();

  if (tasksLoading)
    return (
      <Box className='w-full'>
        <Loading />
      </Box>
    );
  if (tasksError) return <div>Error loading tasks</div>;
  if (!tasksResponse || !tasksResponse.items) return <div>No tasks</div>;

  // if (usersLoading) return <div>Loading users…</div>;
  if (usersError) return <div>Error loading users</div>;
  if (!usersResponse) return <div>No users</div>;

  return (
    <TaskListComponent tasks={tasksResponse.items} users={usersResponse} />
  );
};
