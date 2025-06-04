'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

// Mock data for recent episodes
const recentEpisodes = [
  {
    id: 1,
    title: 'The Future of AI in Everyday Life',
    description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society.',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'The Tech Breakdown',
    duration: '42:18',
    publishedAt: new Date('2023-12-24'),
    likes: 128,
  },
  {
    id: 2,
    title: 'Understanding Anxiety and Stress Management',
    description: 'Dr. Maya Patel discusses effective strategies for managing anxiety and stress in our busy modern lives.',
    imageUrl: 'https://images.pexels.com/photos/5699376/pexels-photo-5699376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'Mind Over Matter',
    duration: '56:05',
    publishedAt: new Date('2023-12-23'),
    likes: 95,
  },
  {
    id: 3,
    title: 'Startup Funding Strategies for 2024',
    description: 'Expert advice on how early-stage startups can secure funding in the current economic climate.',
    imageUrl: 'https://images.pexels.com/photos/6476264/pexels-photo-6476264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'Business Insights',
    duration: '38:42',
    publishedAt: new Date('2023-12-22'),
    likes: 86,
  },
];

export default function RecentEpisodes() {
  return (
    <div className="space-y-4">
      {recentEpisodes.map((episode) => (
        <Card key={episode.id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 w-full sm:h-auto sm:w-48">
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-6">
              <div>
                <Link href={`/podcasts/${episode.id}`} className="hover:underline">
                  <h3 className="mb-1 font-bold tracking-tight">{episode.title}</h3>
                </Link>
                <p className="mb-2 text-sm text-muted-foreground">{episode.podcastTitle}</p>
                <p className="text-sm line-clamp-2 mb-4">{episode.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    <span>{episode.likes} likes</span>
                  </div>
                  <span>{formatDistanceToNow(episode.publishedAt, { addSuffix: true })}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button size="sm" className="gap-1.5" asChild>
                  <Link href={`/episodes/${episode.id}`}>
                    <PlayCircle className="h-4 w-4" />
                    Play Episode
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/episodes/${episode.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}