'use client';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material';
import { ElementType } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const menuItems: Array<{ text: string; link: string; icon: unknown }> = [
  { text: 'Dashboard', link: '/dashboard', icon: DashboardIcon },
  { text: 'Tasks', link: '/dashboard/tasks', icon: TaskIcon },
  { text: 'Settings', link: '/dashboard/settings', icon: SettingsIcon },
];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const PersistentDrawerComponent = ({
  open,
  handleDrawerToggleAction,
}: {
  open: boolean;
  handleDrawerToggleAction: () => void;
}) => {
  const theme = useTheme();
  const pathname = usePathname();
  const drawerWidth = 250;
  const DrawerList = (
    <Box
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      role='presentation'
    >
      <List>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon as ElementType;
          const isActive = pathname === item.link;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.link}
                prefetch={false}
                selected={isActive}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant='persistent'
      open={open}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggleAction}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {DrawerList}
    </Drawer>
  );
};
