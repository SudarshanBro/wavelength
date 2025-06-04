import { Metadata } from 'next';
import { SearchResults } from '@/components/search/search-results';
import { SearchFilters } from '@/components/search/search-filters';

export const metadata: Metadata = {
  title: 'Search | Wavelength',
  description: 'Search for podcasts, episodes, or creators',
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; type?: string; category?: string };
}) {
  const query = searchParams.q || '';
  const type = searchParams.type || 'all';
  const category = searchParams.category || '';

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-2xl font-bold md:text-3xl">Search Results</h1>
      <p className="mt-2 text-muted-foreground">
        {query ? `Showing results for "${query}"` : 'Browse all content'}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <SearchFilters query={query} type={type} category={category} />
        </div>
        <div className="md:col-span-3">
          <SearchResults query={query} type={type} category={category} />
        </div>
      </div>
    </div>
  );
}