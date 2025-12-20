import React from 'react';
import { NotificationComponent } from '@/features/header/component/notification.component';
import { LogoutComponent } from '@/features/header/component/logout.component';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export default async function HeaderComponent() {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <IconButton>
          <Menu />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <NotificationComponent />
        <LogoutComponent />
      </Toolbar>
    </AppBar>
  );
}
