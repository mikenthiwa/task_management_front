'use client';
import { MouseEvent } from 'react';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  Badge,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from '@/core/services/notification';

export const NotificationComponent = ({ userId }: { userId: string }) => {
  const { data } = useGetNotificationsQuery({
    pageNumber: 1,
    pageSize: 5,
    userId,
  });

  const [markAsRead] = useMarkAllAsReadMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const unreadCount = useMemo(
    () => data?.items.filter((i) => !i.isRead).length,
    [data?.items]
  );

  const handleOpen = async (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    await markAsRead({ userId: userId });
  };

  const handleClose = () => setAnchorEl(null);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy HH:mm');
  };

  return (
    <>
      <Tooltip title='Notifications'>
        <IconButton
          aria-label={'Notifications'}
          onClick={handleOpen}
          size='small'
        >
          <Badge badgeContent={unreadCount} color='error'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {data?.items.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary={'No Notification'} />
          </MenuItem>
        ) : (
          data?.items.map((n, idx) => (
            <div key={n.id}>
              <MenuItem
                onClick={() => {
                  // onItemClickAction?.(n);
                  handleClose();
                }}
                className='items-start whitespace-normal'
              >
                <ListItemText
                  primary={n.message}
                  secondary={formatDate(n.createdAt)}
                />
              </MenuItem>
              {idx < data?.items.length - 1 && <Divider component='li' />}
            </div>
          ))
        )}
      </Menu>
    </>
  );
};
