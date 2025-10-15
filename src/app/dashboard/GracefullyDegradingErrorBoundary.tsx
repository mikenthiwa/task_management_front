'use client';

import React, {
  Component,
  ErrorInfo,
  ReactNode,
  createContext,
  useContext,
} from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
  errorType: string | null;
}

interface ErrorBoundaryContextValue {
  hasError: boolean;
  errorMessage: string | null;
  errorType: string | null;
  resetError: () => void;
}

export const GRACEFULLY_DEGRADING_ERROR_NAME =
  'GracefullyDegradingBoundaryError';

export const GracefullyDegradingErrorBoundaryContext =
  createContext<ErrorBoundaryContextValue>({
    hasError: false,
    errorMessage: null,
    errorType: null,
    resetError: () => undefined,
  });

export const useGracefullyDegradingErrorBoundary = () =>
  useContext(GracefullyDegradingErrorBoundaryContext);

export class GracefullyDegradingErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null, errorType: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
      errorType: error.name ?? null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private resetError = () => {
    this.setState({ hasError: false, errorMessage: null, errorType: null });
  };

  render() {
    const { hasError, errorMessage, errorType } = this.state;
    const message = errorMessage || 'An error occurred';
    const shouldRenderChildren =
      !hasError || errorType === GRACEFULLY_DEGRADING_ERROR_NAME;

    return (
      <GracefullyDegradingErrorBoundaryContext.Provider
        value={{
          hasError,
          errorMessage,
          errorType,
          resetError: this.resetError,
        }}
      >
        {shouldRenderChildren && this.props.children}
        {hasError && (
          <div
            role='alert'
            className='fixed bottom-0 left-0 right-0 bg-error text-foreground py-4 px-6 text-center shadow-lg'
          >
            <p className='font-semibold'>{message}</p>
          </div>
        )}
      </GracefullyDegradingErrorBoundaryContext.Provider>
    );
  }
}

export default GracefullyDegradingErrorBoundary;
