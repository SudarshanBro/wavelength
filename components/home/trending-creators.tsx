'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for trending creators
const trendingCreators = [
  {
    id: 1,
    name: 'Alex Johnson',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 3,
    followerCount: '12.5K',
    categories: ['Technology', 'Science'],
  },
  {
    id: 2,
    name: 'Dr. Maya Patel',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 2,
    followerCount: '8.3K',
    categories: ['Health & Wellness', 'Psychology'],
  },
  {
    id: 3,
    name: 'Marcus Chen',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 1,
    followerCount: '6.7K',
    categories: ['Business', 'Entrepreneurship'],
  },
  {
    id: 4,
    name: 'Olivia Martinez',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 2,
    followerCount: '5.9K',
    categories: ['Arts', 'Culture'],
  },
];

export default function TrendingCreators() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {trendingCreators.map((creator) => (
        <Card key={creator.id} className="transition-all hover:shadow-md">
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-4 mt-2 flex h-24 w-24 justify-center overflow-hidden rounded-full">
              <Image
                src={creator.imageUrl}
                alt={creator.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mb-1 font-bold">{creator.name}</h3>
            <div className="mb-3 flex flex-wrap justify-center gap-1">
              {creator.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>{creator.podcastCount} podcasts</span>
              <span>{creator.followerCount} followers</span>
            </div>
            <Link
              href={`/creators/${creator.id}`}
              className="mt-3 block text-sm font-medium text-primary hover:underline"
            >
              View Profile
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}