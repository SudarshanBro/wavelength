'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Heart, MessageSquare, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchProps {
  query: string;
  type: string;
  category: string;
}

// Mock data for search results
const mockPodcasts = [
  {
    id: '1',
    title: 'The Tech Breakdown',
    description: 'Breaking down the latest in technology news and trends',
    imageUrl: 'https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Alex Johnson',
    category: 'Technology',
    episodeCount: 42,
    updatedAt: new Date('2023-12-15'),
  },
  {
    id: '2',
    title: 'Mind Over Matter',
    description: 'Exploring the depths of human psychology and motivation',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Dr. Maya Patel',
    category: 'Health & Wellness',
    episodeCount: 28,
    updatedAt: new Date('2023-12-20'),
  },
  {
    id: '3',
    title: 'Future Tech Today',
    description: 'Exploring emerging technologies that will shape our world',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    creator: 'Sam Wilson',
    category: 'Technology',
    episodeCount: 35,
    updatedAt: new Date('2023-12-10'),
  },
];

const mockEpisodes = [
  {
    id: '1',
    title: 'The Future of AI in Everyday Life',
    description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society.',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'The Tech Breakdown',
    podcastId: '1',
    duration: '42:18',
    publishedAt: new Date('2023-12-24'),
    likes: 128,
    comments: 24,
  },
  {
    id: '2',
    title: 'Understanding Anxiety and Stress Management',
    description: 'Dr. Maya Patel discusses effective strategies for managing anxiety and stress in our busy modern lives.',
    imageUrl: 'https://images.pexels.com/photos/5699376/pexels-photo-5699376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'Mind Over Matter',
    podcastId: '2',
    duration: '56:05',
    publishedAt: new Date('2023-12-23'),
    likes: 95,
    comments: 17,
  },
  {
    id: '3',
    title: 'AI Ethics and Responsibility',
    description: 'A discussion on the ethical considerations and responsibilities in AI development and deployment.',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastTitle: 'Future Tech Today',
    podcastId: '3',
    duration: '48:22',
    publishedAt: new Date('2023-12-18'),
    likes: 74,
    comments: 12,
  },
];

const mockCreators = [
  {
    id: '1',
    name: 'Alex Johnson',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 3,
    followerCount: '12.5K',
    categories: ['Technology', 'Science'],
  },
  {
    id: '2',
    name: 'Dr. Maya Patel',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 2,
    followerCount: '8.3K',
    categories: ['Health & Wellness', 'Psychology'],
  },
  {
    id: '3',
    name: 'Sam Wilson',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    podcastCount: 1,
    followerCount: '4.2K',
    categories: ['Technology', 'Innovation'],
  },
];

export function SearchResults({ query, type, category }: SearchProps) {
  const [activeTab, setActiveTab] = useState(type === 'all' ? 'all' : type);
  const [filteredPodcasts, setFilteredPodcasts] = useState(mockPodcasts);
  const [filteredEpisodes, setFilteredEpisodes] = useState(mockEpisodes);
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);

  useEffect(() => {
    // Filter podcasts based on query and category
    const podcastResults = mockPodcasts.filter(
      (podcast) =>
        (podcast.title.toLowerCase().includes(query.toLowerCase()) ||
          podcast.description.toLowerCase().includes(query.toLowerCase()) ||
          podcast.creator.toLowerCase().includes(query.toLowerCase())) &&
        (category ? podcast.category === category : true)
    );
    setFilteredPodcasts(podcastResults);

    // Filter episodes based on query and category
    const episodeResults = mockEpisodes.filter(
      (episode) =>
        (episode.title.toLowerCase().includes(query.toLowerCase()) ||
          episode.description.toLowerCase().includes(query.toLowerCase()) ||
          episode.podcastTitle.toLowerCase().includes(query.toLowerCase())) &&
        (category
          ? mockPodcasts.find((p) => p.id === episode.podcastId)?.category === category
          : true)
    );
    setFilteredEpisodes(episodeResults);

    // Filter creators based on query and category
    const creatorResults = mockCreators.filter(
      (creator) =>
        (creator.name.toLowerCase().includes(query.toLowerCase())) &&
        (category
          ? creator.categories.some((c) => c === category)
          : true)
    );
    setFilteredCreators(creatorResults);
  }, [query, category]);

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredPodcasts.length === 0 && filteredEpisodes.length === 0 && filteredCreators.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl font-semibold">No results found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPodcasts.length > 0 && (
                <div>
                  <h2 className="mb-4 font-semibold">Podcasts</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPodcasts.slice(0, 3).map(renderPodcast)}
                  </div>
                  {filteredPodcasts.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('podcasts')}>
                        View all podcasts
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {filteredEpisodes.length > 0 && (
                <div>
                  <h2 className="mb-4 font-semibold">Episodes</h2>
                  <div className="space-y-4">
                    {filteredEpisodes.slice(0, 3).map(renderEpisode)}
                  </div>
                  {filteredEpisodes.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('episodes')}>
                        View all episodes
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {filteredCreators.length > 0 && (
                <div>
                  <h2 className="mb-4 font-semibold">Creators</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCreators.slice(0, 3).map(renderCreator)}
                  </div>
                  {filteredCreators.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('creators')}>
                        View all creators
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-6">
          {filteredPodcasts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl font-semibold">No podcasts found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find podcasts.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPodcasts.map(renderPodcast)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="episodes" className="mt-6">
          {filteredEpisodes.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl font-semibold">No episodes found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find episodes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEpisodes.map(renderEpisode)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="creators" className="mt-6">
          {filteredCreators.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl font-semibold">No creators found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find creators.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCreators.map(renderCreator)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function renderPodcast(podcast: typeof mockPodcasts[0]) {
  return (
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
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">By {podcast.creator}</span>
            <span className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(podcast.updatedAt, { addSuffix: true })}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function renderEpisode(episode: typeof mockEpisodes[0]) {
  return (
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
        <CardContent className="flex flex-1 flex-col justify-between p-4">
          <div>
            <p className="text-sm text-muted-foreground">{episode.podcastTitle}</p>
            <Link href={`/podcasts/${episode.podcastId}/episodes/${episode.id}`} className="hover:underline">
              <h3 className="mb-2 font-bold tracking-tight">{episode.title}</h3>
            </Link>
            <p className="text-sm line-clamp-2 text-muted-foreground">{episode.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDistanceToNow(episode.publishedAt, { addSuffix: true })}</span>
              <span>{episode.duration}</span>
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                <span>{episode.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{episode.comments}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" className="gap-1.5" asChild>
              <Link href={`/podcasts/${episode.podcastId}/episodes/${episode.id}`}>
                <PlayCircle className="h-4 w-4" />
                Play Episode
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function renderCreator(creator: typeof mockCreators[0]) {
  return (
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
        <Button size="sm" className="mt-3 w-full gap-1.5" asChild>
          <Link href={`/creators/${creator.id}`}>
            <User className="h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}