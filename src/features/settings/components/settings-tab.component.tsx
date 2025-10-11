'use client';
import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabPanelComponent } from '@/features/settings/components/tab-panel.component';
import { AppearanceComponent } from '@/features/settings/appearance/components/appearance.component';

export const SettingsTabComponent = ({ tabValue }: { tabValue: number }) => {
  const [tab, setTab] = useState<number>(tabValue);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Box className='flex'>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={tab}
        aria-label='Settings Tabs'
        className='border-border border-r'
        onChange={handleTabChange}
      >
        <Tab label='Appearance' />
      </Tabs>
      <TabPanelComponent
        value={tab}
        index={0}
        title={'Appearance'}
        subtitle={'Theme'}
      >
        <AppearanceComponent />
      </TabPanelComponent>
    </Box>
  );
};
