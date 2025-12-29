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
          main: '#45ee02',
          dark: '#30a601',
          light: '#6af134',
        },
        secondary: {
          main: '#00e5ff',
          dark: '#00a0b2',
          light: '#33eaff',
        },
        mode: resolvedTheme === 'dark' ? 'dark' : 'light',
      },
    });
  }, [resolvedTheme]);

  if (!mounted) return null;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
