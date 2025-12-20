import { NextThemeProvider } from '@/core/providers/next-theme-provider';
import { MuiThemeProviderWrapper } from '@/core/providers/mui-theme-provider';
import { SessionProvider } from 'next-auth/react';

import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <NextThemeProvider>
        <MuiThemeProviderWrapper>
          <SessionProvider>{children}</SessionProvider>
        </MuiThemeProviderWrapper>
      </NextThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default providers;
