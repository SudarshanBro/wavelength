'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFiltersProps {
  query: string;
  type: string;
  category: string;
}

export function SearchFilters({ query, type, category }: SearchFiltersProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedType, setSelectedType] = useState(type);
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedType(type);
    setSelectedCategory(category);
  }, [query, type, category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedType && selectedType !== 'all') params.set('type', selectedType);
    if (selectedCategory) params.set('category', selectedCategory);

    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedCategory('');
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-2 w-full">
          Search
        </Button>
      </form>

      <div>
        <h3 className="mb-3 font-medium">Content Type</h3>
        <RadioGroup value={selectedType} onValueChange={setSelectedType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All Content</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="podcasts" id="podcasts" />
            <Label htmlFor="podcasts">Podcasts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="episodes" id="episodes" />
            <Label htmlFor="episodes">Episodes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="creators" id="creators" />
            <Label htmlFor="creators">Creators</Label>
          </div>
        </RadioGroup>
      </div>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="technology"
                  checked={selectedCategory === 'Technology'}
                  onCheckedChange={() => handleCategoryChange('Technology')}
                />
                <label
                  htmlFor="technology"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Technology
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="health"
                  checked={selectedCategory === 'Health & Wellness'}
                  onCheckedChange={() => handleCategoryChange('Health & Wellness')}
                />
                <label
                  htmlFor="health"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Health & Wellness
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="business"
                  checked={selectedCategory === 'Business'}
                  onCheckedChange={() => handleCategoryChange('Business')}
                />
                <label
                  htmlFor="business"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Business
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="arts"
                  checked={selectedCategory === 'Arts'}
                  onCheckedChange={() => handleCategoryChange('Arts')}
                />
                <label
                  htmlFor="arts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Arts
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="education"
                  checked={selectedCategory === 'Education'}
                  onCheckedChange={() => handleCategoryChange('Education')}
                />
                <label
                  htmlFor="education"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Education
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="entertainment"
                  checked={selectedCategory === 'Entertainment'}
                  onCheckedChange={() => handleCategoryChange('Entertainment')}
                />
                <label
                  htmlFor="entertainment"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Entertainment
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="society"
                  checked={selectedCategory === 'Society & Culture'}
                  onCheckedChange={() => handleCategoryChange('Society & Culture')}
                />
                <label
                  htmlFor="society"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Society & Culture
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {(selectedType !== 'all' || selectedCategory) && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      )}
    </div>
  );
}