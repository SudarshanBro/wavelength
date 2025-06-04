'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

export default function FollowButton({ creatorId }: { creatorId: string }) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollowClick = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow this creator.",
        variant: "destructive",
      });
      return;
    }

    // Toggle following state
    setIsFollowing(!isFollowing);
    
    // Show toast based on new state
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing 
        ? "You are no longer following this creator." 
        : "You are now following this creator.",
    });
    
    // Here you would normally make an API call to actually follow/unfollow
    // const response = await fetch('/api/follows', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ creatorId, action: isFollowing ? 'unfollow' : 'follow' }),
    // });
  };

  return (
    <Button
      onClick={handleFollowClick}
      variant={isFollowing ? "secondary" : "default"}
      size="sm"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}