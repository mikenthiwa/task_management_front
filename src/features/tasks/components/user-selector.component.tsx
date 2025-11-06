'use client';
import { useState } from 'react';
import { IUser } from '@/core/common/interfaces/user';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAssignTaskMutation } from '@/core/services/task';
import { toast } from 'react-toastify';

export const UserSelectorComponent = ({
  users,
  assignedUserId,
  taskId,
}: {
  users: IUser[];
  assignedUserId?: string | null;
  taskId: number;
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(
    assignedUserId ?? ''
  );
  const [assignTask, { isLoading }] = useAssignTaskMutation();

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const result = await assignTask({
      taskId,
      assignedId: event.target.value as string,
    });
    if (result.data) {
      setSelectedUserId(event.target.value);
      toast.success('Task assigned successfully');
    }
  };
  return (
    <FormControl className='w-full'>
      <InputLabel id='user-selector-label'>Assigned user</InputLabel>
      <Select
        labelId='user-selector-label'
        id='user-selector'
        value={selectedUserId}
        label='Assigned user'
        onChange={handleChange}
        size='small'
        disabled={isLoading}
      >
        {users.map((user: IUser) => (
          <MenuItem key={user.id} value={user.id}>
            {user.email}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
