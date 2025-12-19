import { redirect } from 'next/navigation';
import { SettingsTabClientComponent } from '@/features/settings/components/settings-tab-client.component';

const SettingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) => {
  const tab = (await searchParams).tab;

  if (!tab) redirect('/dashboard/settings?tab=appearance');

  return <SettingsTabClientComponent tab={tab} />;
};

export default SettingsPage;
