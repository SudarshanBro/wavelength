import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Share2, Heart, MessageSquare, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from '@/components/podcasts/audio-player';
import EpisodeComments from '@/components/podcasts/episode-comments';

export const metadata: Metadata = {
  title: 'Episode Details | Wavelength',
  description: 'Listen to podcast episodes and engage with the content',
};

// Mock data for episode details
const episodeData = {
  id: '1',
  title: 'The Future of AI in Everyday Life',
  description: 'Exploring how artificial intelligence is becoming integrated into our daily routines and what that means for society. We discuss the ethical implications, practical applications, and potential future developments in AI that will impact how we live, work, and interact.',
  content: `<p>Artificial intelligence is no longer just a concept from science fiction—it's becoming an integral part of our daily lives. From the moment we wake up to check our personalized news feeds to the recommendations we receive while shopping online, AI is quietly working behind the scenes.</p>
<p>In this episode, we explore how AI technologies are transforming various aspects of everyday life and what this means for society as a whole. We'll discuss both the exciting possibilities and the legitimate concerns that come with increasing AI integration.</p>
<h3>Topics covered in this episode:</h3>
<ul>
<li>How AI is currently being used in common products and services</li>
<li>The impact of AI on jobs and the economy</li>
<li>Ethical considerations and privacy concerns</li>
<li>The future of AI in healthcare, transportation, and education</li>
<li>How individuals can prepare for an AI-driven future</li>
</ul>
<p>We're also joined by special guest Dr. Sophia Chen, an AI ethics researcher, who shares her insights on creating responsible AI systems that benefit humanity while minimizing potential harms.</p>`,
  imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  audioUrl: 'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_64kb.mp3',
  podcastId: '1',
  podcastTitle: 'The Tech Breakdown',
  creator: {
    id: '123',
    name: 'Alex Johnson',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  duration: '42:18',
  publishedAt: new Date('2023-12-24'),
  likes: 128,
  isLiked: false,
  tags: ['AI', 'Technology', 'Ethics', 'Future'],
};

export default function EpisodePage({ params }: { params: { id: string; episodeId: string } }) {
  const episode = episodeData;
  
  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Link
          href={`/podcasts/${params.id}`}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {episode.podcastTitle}
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-8 flex flex-col md:flex-row md:items-start md:gap-6">
            <div className="mb-4 h-48 w-48 overflow-hidden rounded-lg md:mb-0">
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="mb-2 text-2xl font-bold md:text-3xl">{episode.title}</h1>
              <p className="mb-4 text-muted-foreground">{episode.description}</p>
              
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDistanceToNow(episode.publishedAt, { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{episode.duration}</span>
                </div>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {episode.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
                    <Badge variant="outline">{tag}</Badge>
                  </Link>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Heart className="h-4 w-4" />
                  {episode.likes} Likes
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-8">
            <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
          </div>

          {/* Episode Content */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Episode Notes</h2>
            <div 
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5" />
              Comments
            </h2>
            <EpisodeComments episodeId={episode.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-lg border bg-card p-5">
            <h3 className="mb-4 font-semibold">About the Creator</h3>
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={episode.creator.imageUrl}
                  alt={episode.creator.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Link
                  href={`/creators/${episode.creator.id}`}
                  className="font-medium hover:underline"
                >
                  {episode.creator.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  Host of {episode.podcastTitle}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  asChild
                >
                  <Link href={`/creators/${episode.creator.id}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-card p-5">
            <h3 className="mb-4 font-semibold">More from this Podcast</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src="https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Programming Languages in 2024"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/podcasts/${params.id}/episodes/2`}
                    className="text-sm font-medium hover:underline"
                  >
                    Programming Languages in 2024
                  </Link>
                  <p className="text-xs text-muted-foreground">38:45</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cybersecurity Threats and Protections"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/podcasts/${params.id}/episodes/3`}
                    className="text-sm font-medium hover:underline"
                  >
                    Cybersecurity Threats and Protections
                  </Link>
                  <p className="text-xs text-muted-foreground">45:32</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 w-full"
              asChild
            >
              <Link href={`/podcasts/${params.id}`}>
                View All Episodes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}