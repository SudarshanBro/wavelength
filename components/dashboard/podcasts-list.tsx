'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

// Mock data for user's podcasts
const podcasts = [
  {
    id: 1,
    title: 'The Tech Breakdown',
    description: 'Breaking down the latest in technology news and trends',
    imageUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technology',
    episodeCount: 42,
    listenerCount: '8.2K',
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 2,
    title: 'Mind Over Matter',
    description: 'Exploring the depths of human psychology and motivation',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Health & Wellness',
    episodeCount: 28,
    listenerCount: '5.4K',
    updatedAt: new Date('2023-12-20'),
  },
];

export default function PodcastsList() {
  return (
    <div className="space-y-4">
      {podcasts.map((podcast) => (
        <Card key={podcast.id}>
          <CardContent className="p-4">
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-1">
                      {podcast.category}
                    </Badge>
                    <h3 className="font-bold">{podcast.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {podcast.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{podcast.episodeCount} episodes</span>
                  <span>{podcast.listenerCount} listeners</span>
                  <span>
                    Updated {formatDistanceToNow(podcast.updatedAt, { addSuffix: true })}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/podcasts/${podcast.id}/episodes/new`}>Add Episode</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/dashboard/podcasts/${podcast.id}`}>Manage</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/podcasts/${podcast.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}