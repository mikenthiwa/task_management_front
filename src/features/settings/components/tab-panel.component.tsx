'use client';
import { Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title: string;
  subtitle: string;
}

export const TabPanelComponent = (props: TabPanelProps) => {
  const { children, index, value, subtitle, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className='pl-3'>
          <Box className='mb-3'>
            <Typography variant='subtitle2'>{subtitle}</Typography>
          </Box>
          {children}
        </Box>
      )}
    </div>
  );
};
