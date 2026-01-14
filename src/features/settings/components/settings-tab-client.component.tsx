'use client';
import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanelComponent } from '@/features/settings/components/tab-panel.component';
import { AppearanceComponent } from '@/features/settings/appearance/components/appearance.component';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TABS: Record<string, number> = {
  appearance: 0,
  profile: 1,
};

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const SettingsTabClientComponent = ({ tab }: { tab: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab: { [key: number]: string } = { 0: 'appearance', 1: 'profile' };
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab[newValue]);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Box className='flex'>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={TABS[tab]}
        aria-label='Settings Tabs'
        className='border-border border-r'
        onChange={handleTabChange}
      >
        <Tab label='Appearance' {...a11yProps(0)} />
        <Tab label='Profile' {...a11yProps(1)} />
      </Tabs>

      <TabPanelComponent
        value={TABS[tab]}
        index={0}
        title={'Appearance'}
        subtitle={'Theme'}
      >
        <AppearanceComponent />
      </TabPanelComponent>

      <TabPanelComponent
        value={TABS[tab]}
        index={1}
        title={'Profile'}
        subtitle={'User Information'}
      >
        {/* Profile settings content goes here */}
        <div>User profile settings will be implemented here.</div>
      </TabPanelComponent>
    </Box>
  );
};
