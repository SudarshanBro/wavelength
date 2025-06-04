import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PodcastsList from '@/components/dashboard/podcasts-list';
import StatsOverview from '@/components/dashboard/stats-overview';
import ScheduledEpisodes from '@/components/dashboard/scheduled-episodes';
import RecentActivity from '@/components/dashboard/recent-activity';

export const metadata: Metadata = {
  title: 'Creator Dashboard | Wavelength',
  description: 'Manage your podcasts, episodes, and view analytics',
};

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your podcasts, episodes, and view analytics
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/podcasts/new">New Podcast</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/episodes/new">New Episode</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsOverview />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Podcasts</h2>
              <Link href="/dashboard/podcasts" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <PodcastsList />
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Scheduled Episodes</h2>
              <Link href="/dashboard/episodes/scheduled" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <ScheduledEpisodes />
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-sm font-medium text-primary hover:underline">
              Refresh
            </Button>
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}