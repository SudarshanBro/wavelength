import { Metadata } from 'next';
import { CreatePodcastForm } from "@/components/CreatePodcastForm";

export const metadata: Metadata = {
  title: 'Create Podcast | Wavelength',
  description: 'Create and publish your own podcast',
};

export default function CreatePodcastPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Podcast</h1>
      <CreatePodcastForm />
    </div>
  );
} 