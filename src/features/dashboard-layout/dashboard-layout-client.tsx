'use client';
import { Fragment, ReactNode, useState } from 'react';
import HeaderComponent from '@/features/header/component/header.component';
import { PersistentDrawerComponent } from '@/features/side-bar/components/persistent-drawer.component';
import { Box } from '@mui/material';

export const DashboardLayoutClient = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const drawerWidth = 250;

  return (
    <Fragment>
      <HeaderComponent
        handleDrawerToggleAction={handleDrawerToggle}
        open={open}
      />
      <PersistentDrawerComponent
        open={open}
        handleDrawerToggleAction={handleDrawerToggle}
      />
      <Box
        component='main'
        sx={{
          marginLeft: {
            sm: open ? `${drawerWidth}px` : 0,
          },
          transition: 'margin-left 300ms ease-in-out',
        }}
        className='p-6'
      >
        {children}
      </Box>
    </Fragment>
  );
};
