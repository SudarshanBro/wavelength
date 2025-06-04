import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NewEpisodeForm from '@/components/forms/new-episode-form';

export const metadata: Metadata = {
  title: 'Create New Episode | Wavelength',
  description: 'Upload and manage your podcast episodes',
};

export default function NewEpisodePage() {
  return (
    <div className="container py-6 md:py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="mb-6 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold md:text-3xl">Create New Episode</h1>
        <p className="mt-2 text-muted-foreground">
          Create and schedule a new episode for your podcast
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <NewEpisodeForm />
      </div>
    </div>
  );
}