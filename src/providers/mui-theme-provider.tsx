'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { useTheme as useNextTheme } from 'next-themes';

export function MuiThemeBridge({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === 'dark' ? 'dark' : 'light',
        },
      }),
    [resolvedTheme]
  );
  if (!mounted) {
    return null;
  }

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
