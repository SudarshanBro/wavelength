'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

// Mock data for featured podcasts
const featuredPodcasts = [
  {
    id: 1,
    title: 'The Tech Breakdown',
    description: 'Breaking down the latest in technology news and trends',
    imageUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Alex Johnson',
    category: 'Technology',
    episodeCount: 42,
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: 2,
    title: 'Mind Over Matter',
    description: 'Exploring the depths of human psychology and motivation',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Dr. Maya Patel',
    category: 'Health & Wellness',
    episodeCount: 28,
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: 3,
    title: 'Business Insights',
    description: 'Strategies and stories from the world of business and entrepreneurship',
    imageUrl: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Marcus Chen',
    category: 'Business',
    episodeCount: 35,
    updatedAt: new Date('2023-12-18'),
  },
  {
    id: 4,
    title: 'Creative Sparks',
    description: 'Interviews with artists, writers, and other creative minds',
    imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Olivia Martinez',
    category: 'Arts',
    episodeCount: 19,
    updatedAt: new Date('2023-12-22'),
  },
];

export default function FeaturedPodcasts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featuredPodcasts.map((podcast) => (
        <Card key={podcast.id} className="overflow-hidden transition-all hover:shadow-md">
          <Link href={`/podcasts/${podcast.id}`}>
            <div className="aspect-square overflow-hidden">
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{podcast.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {podcast.episodeCount} episodes
                </span>
              </div>
              <h3 className="font-bold line-clamp-1">{podcast.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {podcast.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">By {podcast.creator}</span>
              <span className="text-xs text-muted-foreground">
                Updated {formatDistanceToNow(podcast.updatedAt, { addSuffix: true })}
              </span>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}