'use client';

import { useEffect, useRef } from 'react';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { useAppDispatch } from '@/core/store/store';
import { Notification } from '@/core/common/interfaces/notification';
import { Task } from '@/core/common/interfaces/task';
import {
  notificationUpdateHandler,
  taskUpdateHandler,
} from '@/core/realtime/signalR-handlers';
import { useSession } from 'next-auth/react';

export const SignalRInitializer = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;
  const connectionRef = useRef<HubConnection | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!accessToken) return;
    if (status !== 'authenticated') return;
    if (
      connectionRef.current &&
      connectionRef.current.state !== HubConnectionState.Disconnected
    )
      return;

    let canceled = false;

    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notificationHub`, {
        accessTokenFactory: () => {
          console.log('accessToken', session?.user?.accessToken);
          return session?.user?.accessToken || '';
        },
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connect.on('ReceiveNotification', (data: Notification) => {
      console.log('ReceiveNotification', data);
      dispatch(notificationUpdateHandler(data));
    });

    connect.on('TaskUpdated', (data: Task) => {
      dispatch(taskUpdateHandler(data));
    });

    connectionRef.current = connect;

    // connect.start().then(() => {
    //   if (canceled) return;
    // connect.on('ReceiveNotification', (data: Notification) => {
    //   console.log('ReceiveNotification', data);
    //   dispatch(notificationUpdateHandler(data));
    // });
    //
    // connect.on('TaskUpdated', (data: Task) => {
    //   dispatch(taskUpdateHandler(data));
    // });
    // });

    connect.start().catch((error) => {
      console.error('SignalR connection failed', error);
    });

    return () => {
      canceled = true;
      connect.off('ReceiveNotification');
      connect.off('TaskUpdated');

      // if (
      //   connectionRef.current &&
      //   connectionRef.current.state === HubConnectionState.Connected
      // ) {
      //   connectionRef.current.stop();
      // }
      // connectionRef.current = null;
      if (connect.state !== HubConnectionState.Disconnected) {
        connect.stop();
      }

      if (connectionRef.current === connect) {
        connectionRef.current = null;
      }
    };
  }, [accessToken, dispatch, status]);
  return null;
};
