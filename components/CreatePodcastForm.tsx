'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Tag {
  id: string;
  text: string;
  category?: string;
}

interface PodcastData {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  audioFile: File | null;
  thumbnail: File | null;
  duration: number;
  category: string;
  isPublic: boolean;
  publishDate: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export function CreatePodcastForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount <= 200) {
      setDescription(value);
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const addTag = () => {
    if (currentTag && tags.length < 5) {
      setTags([...tags, { id: Date.now().toString(), text: currentTag }]);
      setCurrentTag('');
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 100 * 1024 * 1024) { // 100MB limit
        setAudioFile(file);
        const audio = new Audio(URL.createObjectURL(file));
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
      } else {
        toast.error('File size must be less than 100MB');
      }
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return false;
    }
    if (!description.trim()) {
      toast.error('Please enter a description');
      return false;
    }
    if (!audioFile) {
      toast.error('Please upload an audio file');
      return false;
    }
    if (!category) {
      toast.error('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('isPublic', String(isPublic));
      formData.append('duration', String(duration));
      if (audioFile) formData.append('audioFile', audioFile);
      if (thumbnail) formData.append('thumbnail', thumbnail);
      if (publishDate) formData.append('publishDate', publishDate.toISOString());
      formData.append('tags', JSON.stringify(tags));

      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      const podcastData: PodcastData = {
        id: Date.now().toString(),
        title,
        description,
        tags,
        audioFile,
        thumbnail,
        duration,
        category,
        isPublic,
        publishDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store in localStorage for demo purposes
      const existingPodcasts = JSON.parse(localStorage.getItem('podcasts') || '[]');
      localStorage.setItem('podcasts', JSON.stringify([...existingPodcasts, podcastData]));

      toast.success('Podcast created successfully!');
      router.push('/dashboard'); // Redirect to dashboard after successful creation
    } catch (error) {
      console.error('Error creating podcast:', error);
      toast.error('Failed to create podcast. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter podcast title"
          maxLength={100}
          required
        />
        <p className="text-sm text-gray-500">{title.length}/100 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter podcast description"
          rows={4}
          required
        />
        <p className="text-sm text-gray-500">
          {description.trim().split(/\s+/).length}/200 words
        </p>
      </div>

      <div className="space-y-2">
        <Label>Tags (max 5)</Label>
        <div className="flex gap-2">
          <Input
            value={currentTag}
            onChange={handleTagInput}
            placeholder="Add tags"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <Button type="button" onClick={addTag} disabled={tags.length >= 5}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <div
              key={tag.id}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{tag.text}</span>
              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Audio Upload</Label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAudioUpload}
            accept=".mp3,.wav,.m4a"
            className="hidden"
            required
          />
          {audioFile ? (
            <div>
              <p>{audioFile.name}</p>
              <p className="text-sm text-gray-500">
                {(audioFile.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          ) : (
            <p>Click to upload or drag and drop audio file</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Thumbnail (Optional)</Label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          <input
            type="file"
            ref={thumbnailInputRef}
            onChange={handleThumbnailUpload}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          {thumbnail ? (
            <div>
              <p>{thumbnail.name}</p>
              <p className="text-sm text-gray-500">
                {(thumbnail.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          ) : (
            <p>Click to upload thumbnail</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Duration in seconds"
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label>Public</Label>
        </div>

        <div className="space-y-2">
          <Label>Schedule Publish</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !publishDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {publishDate ? format(publishDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={publishDate}
                onSelect={setPublishDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {audioFile && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <audio
            ref={audioRef}
            controls
            className="w-full"
            src={URL.createObjectURL(audioFile)}
          />
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsDraft(true)}
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </form>
  );
} 