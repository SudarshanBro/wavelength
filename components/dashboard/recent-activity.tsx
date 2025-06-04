'use client';

import { format } from 'date-fns';
import { Heart, MessageSquare, Play, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

// Mock data for recent activity
const activities = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Sarah Garcia',
      id: '123',
    },
    episode: {
      title: 'The Future of AI in Everyday Life',
      id: '456',
    },
    timestamp: new Date('2023-12-25T15:32:00'),
    icon: <Heart className="h-4 w-4 text-red-500" />,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Michael Wong',
      id: '234',
    },
    episode: {
      title: 'Understanding Anxiety and Stress Management',
      id: '567',
    },
    comment: 'Great episode! The breathing techniques have been so helpful.',
    timestamp: new Date('2023-12-25T14:45:00'),
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 3,
    type: 'play',
    episode: {
      title: 'Startup Funding Strategies for 2024',
      id: '678',
    },
    count: 25,
    timestamp: new Date('2023-12-25T12:15:00'),
    icon: <Play className="h-4 w-4 text-green-500" />,
  },
  {
    id: 4,
    type: 'follow',
    user: {
      name: 'Emma Peterson',
      id: '345',
    },
    timestamp: new Date('2023-12-25T11:20:00'),
    icon: <UserPlus className="h-4 w-4 text-purple-500" />,
  },
  {
    id: 5,
    type: 'like',
    user: {
      name: 'David Kim',
      id: '456',
    },
    episode: {
      title: 'The Psychology of Habit Formation',
      id: '789',
    },
    timestamp: new Date('2023-12-25T10:05:00'),
    icon: <Heart className="h-4 w-4 text-red-500" />,
  },
  {
    id: 6,
    type: 'comment',
    user: {
      name: 'Jennifer Wilson',
      id: '567',
    },
    episode: {
      title: 'Emerging Tech Trends for 2024',
      id: '890',
    },
    comment: 'I'm excited to see where AI is heading. Great insights!',
    timestamp: new Date('2023-12-25T08:30:00'),
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.type === 'like' && (
                      <>
                        <Link href={`/users/${activity.user.id}`} className="font-medium hover:underline">
                          {activity.user.name}
                        </Link>{' '}
                        liked your episode{' '}
                        <Link href={`/episodes/${activity.episode.id}`} className="font-medium hover:underline">
                          {activity.episode.title}
                        </Link>
                      </>
                    )}
                    {activity.type === 'comment' && (
                      <>
                        <Link href={`/users/${activity.user.id}`} className="font-medium hover:underline">
                          {activity.user.name}
                        </Link>{' '}
                        commented on{' '}
                        <Link href={`/episodes/${activity.episode.id}`} className="font-medium hover:underline">
                          {activity.episode.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          "{activity.comment}"
                        </p>
                      </>
                    )}
                    {activity.type === 'play' && (
                      <>
                        Your episode{' '}
                        <Link href={`/episodes/${activity.episode.id}`} className="font-medium hover:underline">
                          {activity.episode.title}
                        </Link>{' '}
                        received {activity.count} new plays
                      </>
                    )}
                    {activity.type === 'follow' && (
                      <>
                        <Link href={`/users/${activity.user.id}`} className="font-medium hover:underline">
                          {activity.user.name}
                        </Link>{' '}
                        started following you
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(activity.timestamp, 'h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}