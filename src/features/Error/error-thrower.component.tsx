'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  GRACEFULLY_DEGRADING_ERROR_NAME,
  useGracefullyDegradingErrorBoundary,
} from '@/app/dashboard/GracefullyDegradingErrorBoundary';
import { RootState } from '@/store/store';

export const ErrorThrowerComponent = () => {
  const { hasError, errorMessage, errorType, resetError } =
    useGracefullyDegradingErrorBoundary();
  const err = useSelector((state: RootState) => state.error.message);
  const isGracefulError = errorType === GRACEFULLY_DEGRADING_ERROR_NAME;

  useEffect(() => {
    if (!hasError || !isGracefulError) {
      return;
    }

    if (!err) {
      resetError();
      return;
    }

    if (err !== errorMessage) {
      resetError();
    }
  }, [err, errorMessage, hasError, isGracefulError, resetError]);

  if (hasError && isGracefulError) {
    return null;
  }

  if (err) {
    const error = new Error(err);
    error.name = GRACEFULLY_DEGRADING_ERROR_NAME;
    throw error;
  }

  return null;
};
