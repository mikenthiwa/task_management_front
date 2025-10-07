import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Task } from '@/core/common/interfaces/task';
import { Fragment } from 'react';

export const TaskListComponent = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Fragment>
      {tasks?.map((task) => {
        return (
          <Grid size={4} key={task.id}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                  {task.title}
                </Typography>
                <Typography>{task.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Fragment>
  );
};
