import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { api } from '@/core/services/api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rtkErrorToastMiddleware } from '@/store/rtkqErrorToastMiddleware';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(rtkErrorToastMiddleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const dispatch: AppDispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
