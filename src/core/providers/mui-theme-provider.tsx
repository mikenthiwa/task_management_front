'use client';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { useTheme } from 'next-themes';

export const MuiThemeProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: '#4CAF50',
        },
        mode: resolvedTheme === 'dark' ? 'dark' : 'light',
      },
    });
  }, [resolvedTheme]);

  if (!mounted) return null;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
