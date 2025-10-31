'use client';
import { Box, Typography } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  title: string;
  subtitle: string;
}

export const TabPanelComponent = (props: TabPanelProps) => {
  const { children, index, value, title, subtitle, ...other } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tab: { [key: number]: string } = { 0: 'appearance', 1: 'profile' };
    params.set('tab', tab[value]);
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, value]);

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
