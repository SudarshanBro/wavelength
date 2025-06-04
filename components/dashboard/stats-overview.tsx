'use client';

import { ChevronUpIcon, ChevronDownIcon, Headphones, Heart, Users, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for dashboard stats
const stats = [
  {
    title: 'Total Plays',
    value: '12,486',
    change: '+12.4%',
    increasing: true,
    icon: <Headphones className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Total Likes',
    value: '2,845',
    change: '+8.2%',
    increasing: true,
    icon: <Heart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Followers',
    value: '1,752',
    change: '+15.3%',
    increasing: true,
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Comments',
    value: '864',
    change: '-2.1%',
    increasing: false,
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function StatsOverview() {
  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="flex items-center text-xs text-muted-foreground">
              {stat.increasing ? (
                <ChevronUpIcon className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ChevronDownIcon className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={stat.increasing ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}