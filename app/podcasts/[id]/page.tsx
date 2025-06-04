import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Radio, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PodcastEpisodesList from '@/components/podcasts/episodes-list';
import FollowButton from '@/components/podcasts/follow-button';
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Podcast Details | Wavelength',
  description: 'View podcast details and episodes',
};

// Mock data for podcast details
const podcastData = {
  id: '1',
  title: 'The Tech Breakdown',
  description: 'Breaking down the latest in technology news and trends. We delve deep into the innovations, controversies, and breakthroughs that are shaping our digital world. Join host Alex Johnson as he interviews industry experts and analyzes the most impactful developments in tech.',
  imageUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  coverImage: 'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  creator: {
    id: '123',
    name: 'Alex Johnson',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    followerCount: '12.5K',
  },
  category: 'Technology',
  tags: ['AI', 'Programming', 'Digital Trends', 'Innovation'],
  episodeCount: 42,
  followerCount: '8.2K',
  createdAt: new Date('2022-06-15'),
  updatedAt: new Date('2023-12-15'),
};

export default function PodcastPage({ params }: { params: { id: string } }) {
  const podcast = podcastData;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Cover Image */}
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={podcast.coverImage}
          alt={podcast.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container -mt-20 pb-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Podcast Info */}
          <div className="md:col-span-2">
            <div className="mb-6 flex items-start gap-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg shadow-lg md:h-44 md:w-44">
                <Image
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{podcast.category}</Badge>
                  <p className="text-xs text-muted-foreground">
                    {podcast.episodeCount} episodes
                  </p>
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  {podcast.title}
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={podcast.creator.imageUrl}
                        alt={podcast.creator.name}
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Link
                      href={`/creators/${podcast.creator.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {podcast.creator.name}
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {podcast.followerCount} followers
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {podcast.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                      <Badge variant="outline">{tag}</Badge>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <FollowButton creatorId={podcast.creator.id} />
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-2 font-semibold">About</h2>
              <p className="text-muted-foreground">{podcast.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                Started {formatDistanceToNow(podcast.createdAt, { addSuffix: true })} • 
                Updated {formatDistanceToNow(podcast.updatedAt, { addSuffix: true })}
              </p>
            </div>

            {/* Episodes */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Episodes</h2>
                <Link
                  href={`/podcasts/${podcast.id}/episodes`}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <PodcastEpisodesList podcastId={podcast.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="rounded-lg border bg-card p-5">
              <h2 className="mb-4 font-semibold">Where to Listen</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Radio className="h-5 w-5 text-primary" />
                  <span className="text-sm">Spotify</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-5 w-5 text-primary" />
                  <span className="text-sm">Apple Podcasts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-5 w-5 text-primary" />
                  <span className="text-sm">Google Podcasts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-5 w-5 text-primary" />
                  <span className="text-sm">RSS Feed</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t">
                <Button className="w-full" variant="outline">
                  Subscribe to RSS
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-lg border bg-card p-5">
              <h2 className="mb-4 font-semibold">More from this Creator</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Science Discoveries"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href="/podcasts/2"
                      className="font-medium hover:underline"
                    >
                      Science Discoveries
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      21 episodes
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src="https://images.pexels.com/photos/6084834/pexels-photo-6084834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Digital Life"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href="/podcasts/3"
                      className="font-medium hover:underline"
                    >
                      Digital Life
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      15 episodes
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/creators/${podcast.creator.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Creator Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}