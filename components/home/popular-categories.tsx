'use client';

import Link from 'next/link';
import { Headphones, TrendingUp, Heart, Users, BookOpen, LightbulbIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for popular categories
const categories = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Latest in tech, coding, and digital trends',
    icon: <LightbulbIcon className="h-8 w-8" />,
    count: 243,
    color: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Entrepreneurship, marketing, and finance',
    icon: <TrendingUp className="h-8 w-8" />,
    count: 189,
    color: 'bg-amber-100 dark:bg-amber-900',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    description: 'Fitness, mental health, and nutrition',
    icon: <Heart className="h-8 w-8" />,
    count: 176,
    color: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-700 dark:text-green-300',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Learning, academic insights, and skills',
    icon: <BookOpen className="h-8 w-8" />,
    count: 154,
    color: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-700 dark:text-purple-300',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, music, gaming, and pop culture',
    icon: <Headphones className="h-8 w-8" />,
    count: 132,
    color: 'bg-pink-100 dark:bg-pink-900',
    textColor: 'text-pink-700 dark:text-pink-300',
  },
  {
    id: 'society',
    name: 'Society & Culture',
    description: 'Current events, history, and social issues',
    icon: <Users className="h-8 w-8" />,
    count: 118,
    color: 'bg-indigo-100 dark:bg-indigo-900',
    textColor: 'text-indigo-700 dark:text-indigo-300',
  },
];

export default function PopularCategories() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-start p-6">
              <div className={`mb-4 rounded-full p-3 ${category.color}`}>
                <div className={category.textColor}>{category.icon}</div>
              </div>
              <h3 className="mb-1 font-bold">{category.name}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{category.description}</p>
              <p className="mt-auto text-xs font-medium">{category.count} podcasts</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}