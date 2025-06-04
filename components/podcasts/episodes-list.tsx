'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Heart, MessageSquare, Calendar, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for podcast episodes
const episodesData = [
  {
    id: '1',
    title: 'The Future of AI in Everyday Life',
    description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society.',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '42:18',
    publishedAt: new Date('2023-12-24'),
    likes: 128,
    comments: 24,
  },
  {
    id: '2',
    title: 'Programming Languages in 2024',
    description: 'A deep dive into which programming languages are on the rise, which are fading, and what that means for developers.',
    imageUrl: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '38:45',
    publishedAt: new Date('2023-12-17'),
    likes: 96,
    comments: 18,
  },
  {
    id: '3',
    title: 'Cybersecurity Threats and Protections',
    description: 'Examining the latest cybersecurity threats and what individuals and businesses can do to protect themselves.',
    imageUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    duration: '45:32',
    publishedAt: new Date('2023-12-10'),
    likes: 112,
    comments: 31,
  },
];

export default function PodcastEpisodesList({ podcastId }: { podcastId: string }) {
  return (
    <div className="space-y-4">
      {episodesData.map((episode) => (
        <Card key={episode.id} className="overflow-hidden transition-all hover:shadow-md">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-40 w-full sm:h-auto sm:w-40">
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <Link href={`/podcasts/${podcastId}/episodes/${episode.id}`} className="hover:underline">
                  <h3 className="mb-2 font-bold tracking-tight">{episode.title}</h3>
                </Link>
                <p className="text-sm line-clamp-2 text-muted-foreground">{episode.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {formatDistanceToNow(episode.publishedAt, { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    <span>{episode.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{episode.comments} comments</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button size="sm" className="gap-1.5" asChild>
                  <Link href={`/podcasts/${podcastId}/episodes/${episode.id}`}>
                    <PlayCircle className="h-4 w-4" />
                    Play Episode
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/podcasts/${podcastId}/episodes/${episode.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}