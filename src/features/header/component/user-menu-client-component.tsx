import { useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';

export const UserMenuClientComponent = () => {
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const menu = ['Logout'];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          alt={session?.user.picture}
          src={session?.user.picture}
          sx={{ width: 24, height: 24 }}
        />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menu.map((item) => {
          return (
            <MenuItem key={item}>
              <Typography sx={{ textAlign: 'center' }}>{item}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
