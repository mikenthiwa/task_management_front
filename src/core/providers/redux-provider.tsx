'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/core/store/store';
import { ToastContainer } from 'react-toastify';

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer position={'top-right'} autoClose={5000} />
    </Provider>
  );
}
