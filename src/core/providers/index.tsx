import { NextThemeProvider } from '@/core/providers/next-theme-provider';
import { MuiThemeProviderWrapper } from '@/core/providers/mui-theme-provider';
import { SessionProvider } from 'next-auth/react';

import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReduxProvider } from '@/core/providers/redux-provider';

const providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <NextThemeProvider>
        <MuiThemeProviderWrapper>
          <SessionProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </SessionProvider>
        </MuiThemeProviderWrapper>
      </NextThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default providers;
