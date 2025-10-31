import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Task } from '@/core/common/interfaces/task';
import { Fragment } from 'react';
import { IUser } from '@/core/common/interfaces/user';
import { UserSelectorComponent } from '@/features/tasks/components/user-selector.component';

export const TaskListComponent = ({
  tasks,
  users,
}: {
  tasks: Task[];
  users: IUser[];
}) => {
  return (
    <Fragment>
      {tasks?.map((task) => {
        return (
          <Grid size={4} key={task.id}>
            <Card variant='outlined'>
              <CardContent>
                <Box className='mb-5'>
                  <Typography variant='h6' fontWeight={700} gutterBottom>
                    {task.title}
                  </Typography>
                  <Typography>{task.description}</Typography>
                </Box>
                <Box className='flex'>
                  <></>
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
