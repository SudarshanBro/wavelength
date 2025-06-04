import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedPodcasts from '@/components/home/featured-podcasts';
import RecentEpisodes from '@/components/home/recent-episodes';
import PopularCategories from '@/components/home/popular-categories';
import TrendingCreators from '@/components/home/trending-creators';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-background" />
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Discover Your Next <span className="text-primary">Favorite</span> Podcast
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Create, share, and engage with podcasts that matter to you. Join thousands of creators
            and listeners in a vibrant audio community.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg">
              <Link href="/discover">Discover Podcasts</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
<<<<<<< HEAD
              <Link href="/start">Start Creating</Link>
=======
              <Link href="/create-podcast">Create Podcast</Link>
>>>>>>> 84b09b6 (Initial commit)
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Podcasts */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Podcasts</h2>
            <Link href="/featured" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <FeaturedPodcasts />
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Recent Episodes</h2>
            <Link href="/episodes" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <RecentEpisodes />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Categories</h2>
            <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <PopularCategories />
        </div>
      </section>

      {/* Trending Creators */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Trending Creators</h2>
            <Link href="/creators" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <TrendingCreators />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="rounded-xl bg-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Share Your Voice?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join our community of podcast creators and reach thousands of engaged listeners.
                It's free to get started!
              </p>
              <Button asChild size="lg">
                <Link href="/start">Create Your Podcast</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}