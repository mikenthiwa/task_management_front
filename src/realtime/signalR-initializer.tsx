'use client';

import { useEffect, useRef } from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useAppDispatch } from '@/store/store';
import { Notification } from '@/core/common/interfaces/notification';
import { Session } from '@/core/common/interfaces/session';
import { Task } from '@/core/common/interfaces/task';
import {
  notificationUpdateHandler,
  taskUpdateHandler,
} from '@/realtime/signalR-handlers';

export const SignalRInitializer = ({ session }: { session: Session }) => {
  const connectionRef = useRef<HubConnection | null>(null);
  const dispatch = useAppDispatch();
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

    connect.start().then(() => {
      connect.on('ReceiveNotification', (data: Notification) => {
        dispatch(notificationUpdateHandler(data));
      });

      connect.on('TaskUpdated', (data: Task) => {
        dispatch(taskUpdateHandler(data));
      });
    });

    return () => {
      if (connectionRef.current) {
        connectionRef.current.off('ReceiveNotification');
      }
    };
  });
  return null;
};
