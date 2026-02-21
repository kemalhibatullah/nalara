import { Metadata } from 'next';
import { getChangelogs } from '@/lib/markdown';
import { getDirectoryItems } from '@/lib/directory';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Nalara | Direktori AI',
  description: 'Direktori AI & Rekam Jejak Perkembangan AI Indonesia',
};

export default async function HomePage() {
  // Fetch data natively on the server side
  const changelogs = getChangelogs().slice(0, 3);
  const directoryItems = await getDirectoryItems();

  // Pass it down to the Client Component that houses all Framer Motion logic
  return <HomePageClient changelogs={changelogs} directoryItems={directoryItems} />;
}