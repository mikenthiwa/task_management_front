import { SettingsTabComponent } from '@/features/settings/components/settings-tab.component';

const SettingsPage = async ({
  params,
}: {
  params: Promise<{ tabName: string }>;
}) => {
  const value = (await params).tabName || 'appearance';
  const tabs: { [key: string]: number } = { appearance: 0, profile: 1 };
  const idx = tabs[value];

  return <SettingsTabComponent tabValue={idx} />;
};

export default SettingsPage;
