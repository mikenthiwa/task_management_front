'use client';
import { useState, MouseEvent } from 'react';
import { Chip, Menu, MenuItem, Tooltip, CircularProgress } from '@mui/material';
import { useUpdateTaskStatusMutation } from '@/core/services/task';
import { toast } from 'react-toastify';
import { TaskStatus } from '@/core/common/interfaces/task';

const STATUS_OPTIONS = [
  { value: 0, label: TaskStatus.new, color: 'default' as const },
  { value: 1, label: TaskStatus.InProgress, color: 'warning' as const },
  { value: 2, label: TaskStatus.completed, color: 'success' as const },
  { value: 3, label: TaskStatus.onHold, color: 'info' as const },
  { value: 4, label: TaskStatus.cancelled, color: 'error' as const },
];

const getStatusColor = (status: string) => {
  const option = STATUS_OPTIONS.find((opt) => opt.label === status);
  return option?.color || 'default';
};

const getStatusValue = (status: string): number | undefined => {
  const option = STATUS_OPTIONS.find((opt) => opt.label === status);
  return option?.value;
};

export const TaskStatusChip = ({
  currentStatus,
  taskId,
  assignedUserId,
  currentUserId,
}: {
  currentStatus: string;
  taskId: number;
  assignedUserId?: string | null;
  currentUserId?: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [updateStatus, { isLoading }] = useUpdateTaskStatusMutation();

  const isAuthorized = currentUserId && currentUserId === assignedUserId;
  const open = Boolean(anchorEl);
  const currentStatusValue = getStatusValue(currentStatus);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isAuthorized) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (statusValue: number) => {
    handleClose();

    if (statusValue === currentStatusValue) return;

    const result = await updateStatus({
      taskId,
      status: statusValue,
    });

    if (result.data) {
      toast.success('Task status updated successfully');
    }
  };

  const tooltipTitle = isAuthorized
    ? 'Click to change status'
    : 'Only the assignee can change status';

  return (
    <>
      <Tooltip title={tooltipTitle} arrow>
        <Chip
          label={
            isLoading ? (
              <CircularProgress size={16} color='inherit' />
            ) : (
              currentStatus
            )
          }
          color={getStatusColor(currentStatus)}
          size='small'
          onClick={handleClick}
          sx={{
            cursor: isAuthorized ? 'pointer' : 'not-allowed',
            opacity: isAuthorized ? 1 : 0.7,
            '&:hover': {
              opacity: isAuthorized ? 0.8 : 0.7,
            },
          }}
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            selected={option.value === currentStatusValue}
            disabled={option.value === currentStatusValue}
          >
            <Chip
              label={option.label}
              color={option.color}
              size='small'
              sx={{ pointerEvents: 'none' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
