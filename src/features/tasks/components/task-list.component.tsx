import { Card, CardContent, Grid, Typography, Box, Stack } from '@mui/material';
import { Task } from '@/core/common/interfaces/task';
import { Fragment } from 'react';
import { IUser } from '@/core/common/interfaces/user';
import { UserSelectorComponent } from '@/features/tasks/components/user-selector.component';
import { TaskStatusChip } from '@/features/tasks/components/task-status-chip.component';

export const TaskListComponent = ({
  tasks,
  users,
  currentUserId,
}: {
  tasks: Task[];
  users: IUser[];
  currentUserId?: string;
}) => {
  return (
    <Fragment>
      {tasks?.map((task) => {
        return (
          <Grid size={4} key={task.id}>
            <Card variant='outlined'>
              <CardContent>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='start'
                  className='mb-3'
                >
                  <Typography variant='h6' fontWeight={700}>
                    {task.title}
                  </Typography>
                  <TaskStatusChip
                    currentStatus={task.status}
                    taskId={task.id}
                    assignedUserId={task.assignee?.id}
                    currentUserId={currentUserId}
                  />
                </Stack>

                <Typography className='mb-4' color='text.secondary'>
                  {task.description}
                </Typography>

                <Box>
                  <UserSelectorComponent
                    users={users}
                    assignedUserId={task.assignee?.id}
                    taskId={task.id}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Fragment>
  );
};
