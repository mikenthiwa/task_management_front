'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const ThemeToggleComponent = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (!value) return;
    setTheme(value);
  };

  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      onChange={handleThemeChange}
      aria-label='Theme'
    >
      <ToggleButton value='light'>Light</ToggleButton>
      <ToggleButton value='dark'>Dark</ToggleButton>
      <ToggleButton value='system'>System</ToggleButton>
    </ToggleButtonGroup>
  );
};
