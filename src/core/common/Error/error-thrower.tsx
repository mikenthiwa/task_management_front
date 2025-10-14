'use client';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export const ErrorThrower = () => {
  const err = useSelector((state: RootState) => state.error.message);

  if (err) {
    throw new Error(err);
  }
  return null;
};
