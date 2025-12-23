'use client';
import React from 'react';
import { NotificationComponent } from '@/features/header/component/notification.component';
import { LogoutComponent } from '@/features/header/component/logout.component';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export default function HeaderComponent({
  handleDrawerToggleAction,
  open,
}: {
  handleDrawerToggleAction: () => void;
  open: boolean;
}) {
  const drawerWidth = 250;
  return (
    <AppBar
      position='sticky'
      sx={{
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { sm: open ? `${drawerWidth}px` : '0px' },
        transition: 'ml 300ms ease-in-out',
      }}
    >
      <Toolbar onClick={handleDrawerToggleAction}>
        <IconButton>
          <Menu />
        </IconButton>
        <Typography variant='h6' component='div'>
          Task Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box className='flex'>
          <NotificationComponent />
          <LogoutComponent />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
