'use client';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ElementType } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems: Array<{ text: string; link: string; icon: unknown }> = [
  { text: 'Dashboard', link: '/dashboard', icon: DashboardIcon },
  { text: 'Tasks', link: '/dashboard/tasks', icon: TaskIcon },
  { text: 'Settings', link: '/dashboard/settings', icon: SettingsIcon },
];

export const SideBarComponent = () => {
  const pathname = usePathname();
  return (
    <nav aria-label='Main' role='navigation'>
      <List>
        {menuItems.map((item) => {
          const IconComponent = item.icon as ElementType;
          const isActive = pathname === item.link;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                href={item.link}
                prefetch={false}
                selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                className={`
                    px-4 py-2
                    focus:outline-none focus-visible:ring focus-visible:ring-blue-500
                    ${isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'}
                  `}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <span className='hidden md:inline'>
                  <ListItemText primary={item.text} disableTypography />
                </span>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};
