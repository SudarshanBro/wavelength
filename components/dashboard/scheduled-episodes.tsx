'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, Clock, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

// Mock data for scheduled episodes
const scheduledEpisodes = [
  {
    id: 1,
    title: 'Emerging Tech Trends for 2024',
    podcastTitle: 'The Tech Breakdown',
    podcastId: 1,
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    scheduledFor: new Date('2024-01-05T09:00:00'),
    duration: '45:12',
  },
  {
    id: 2,
    title: 'The Psychology of Habit Formation',
    podcastTitle: 'Mind Over Matter',
    podcastId: 2,
    imageUrl: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    scheduledFor: new Date('2024-01-08T14:30:00'),
    duration: '38:45',
  },
];

export default function ScheduledEpisodes() {
  return (
    <div className="space-y-4">
      {scheduledEpisodes.map((episode) => (
        <Card key={episode.id}>
          <CardContent className="p-4">
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={episode.imageUrl}
                  alt={episode.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div>
                  <p className="text-sm text-muted-foreground">{episode.podcastTitle}</p>
                  <h3 className="font-medium">{episode.title}</h3>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>Scheduled for {format(episode.scheduledFor, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{format(episode.scheduledFor, 'h:mm a')}</span>
                  </div>
                  <span>Duration: {episode.duration}</span>
                </div>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1" asChild>
                      <Link href={`/dashboard/episodes/${episode.id}/edit`}>
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 gap-1" asChild>
                      <Link href={`/dashboard/episodes/${episode.id}/preview`}>
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </Link>
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