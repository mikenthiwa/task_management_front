'use client';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import {
  Badge,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from '@/core/services/notification';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Notification } from '@/core/common/interfaces/notification';
import { Session } from '@/core/common/interfaces/session';

export const NotificationComponent = ({ session }: { session: Session }) => {
  const { data, isSuccess } = useGetNotificationsQuery({
    pageNumber: 1,
    pageSize: 5,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);
  useEffect(() => {
    if (data && isSuccess) {
      setNotifications(data.items);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (connectionRef.current) return;
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notificationHub`, {
        accessTokenFactory: () => session?.user?.accessToken || '',
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connectionRef.current = connect;
    const handler = (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    };
    connect.start().then(() => {
      connect.on('ReceiveNotification', handler);
    });

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off('ReceiveNotification');
      }
    };
  });

  const [markAsRead] = useMarkAllAsReadMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const unreadCount = useMemo(
    () => notifications.filter((i) => !i.isRead).length,
    [notifications]
  );

  const handleOpen = async (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (unreadCount > 0) await markAsRead();
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
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary={'No Notification'} />
          </MenuItem>
        ) : (
          notifications.map((n) => (
            <div key={n.id}>
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
                className='items-start whitespace-normal'
              >
                <ListItemText
                  primary={n.message}
                  secondary={formatDate(n.createdAt)}
                />
              </MenuItem>
            </div>
          ))
        )}
      </Menu>
    </>
  );
};
