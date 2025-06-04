'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, UploadCloud, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock data for podcasts
const userPodcasts = [
  {
    id: '1',
    title: 'The Tech Breakdown',
  },
  {
    id: '2',
    title: 'Mind Over Matter',
  },
];

const formSchema = z.object({
  podcastId: z.string({
    required_error: 'Please select a podcast.',
  }),
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  audioFile: z.any().refine((file) => file?.length === 1, {
    message: 'Audio file is required.',
  }),
  coverImage: z.any().optional(),
  publishNow: z.boolean().default(true),
  scheduledFor: z.date().optional(),
  tags: z.string().optional(),
});

export default function NewEpisodeForm() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      publishNow: true,
    },
  });

  const publishNow = form.watch('publishNow');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form values:', values);
      
      toast({
        title: "Episode created successfully!",
        description: publishNow 
          ? "Your episode has been published."
          : `Your episode will be published on ${format(values.scheduledFor!, 'PPP')}`,
      });
      
      // Reset form
      form.reset();
      
    } catch (error) {
      toast({
        title: "Error creating episode",
        description: "There was a problem creating your episode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="podcastId"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Podcast</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a podcast" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userPodcasts.map((podcast) => (
                        <SelectItem key={podcast.id} value={podcast.id}>
                          {podcast.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Episode Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter episode title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter episode description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of what listeners can expect from this episode.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audioFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="mb-6">
                  <FormLabel>Audio File</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="audio/*"
                        className="cursor-pointer"
                        onChange={(e) => onChange(e.target.files)}
                        {...field}
                      />
                      <Button type="button" variant="outline" className="gap-1.5">
                        <UploadCloud className="h-4 w-4" />
                        Browse
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload your episode audio file (MP3, WAV, M4A). Maximum file size: 200MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="mb-6">
                  <FormLabel>Cover Image (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a custom cover image for this episode. If not provided, the podcast cover image will be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tags separated by commas" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add tags to help listeners find your episode (e.g., AI, Business, Interview).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishNow"
              render={({ field }) => (
                <FormItem className="mb-4 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish immediately</FormLabel>
                    <FormDescription>
                      If unchecked, you can schedule this episode for future publication.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {!publishNow && (
              <FormField
                control={form.control}
                name="scheduledFor"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publication Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The episode will be automatically published on this date.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        <div className="bg-muted/40 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Important Note</h4>
            <p className="text-sm text-muted-foreground">
              By uploading content, you confirm that you have the right to publish this material and that it doesn't violate our community guidelines.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : publishNow ? "Publish Episode" : "Schedule Episode"}
          </Button>
        </div>
      </form>
    </Form>
  );
}