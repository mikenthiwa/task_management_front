'use client';
import { useGetTasksQuery } from '@/core/services/task';
import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

export const TasksComponent = () => {
  const { data: tasks, isLoading } = useGetTasksQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {tasks?.items.map((task) => (
        <ListItem key={task.id} secondaryAction={<Checkbox edge='end' />}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText id={`${task.id}`} primary={task.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
