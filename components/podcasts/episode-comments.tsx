'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Flag, Send, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
  };
  likes: number;
  isLiked: boolean;
  createdAt: Date;
  isPrivate: boolean;
}

// Mock data for comments
const commentsData: Comment[] = [
  {
    id: '1',
    content: "This episode was so insightful! I've been following AI developments for a while, but I never considered how it might impact education in the way you described. Thanks for the perspective!",
    user: {
      id: '123',
      name: 'Michael Wong',
      imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    likes: 12,
    isLiked: false,
    createdAt: new Date('2023-12-24T14:45:00'),
    isPrivate: false,
  },
  {
    id: '2',
    content: "I'm a bit concerned about the ethical implications you mentioned regarding AI in healthcare. Do you think there will be stronger regulations in place before these systems become widely implemented?",
    user: {
      id: '234',
      name: 'Sarah Garcia',
      imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    likes: 8,
    isLiked: true,
    createdAt: new Date('2023-12-24T16:30:00'),
    isPrivate: false,
  },
  {
    id: '3',
    content: "Great discussion on AI ethics! I'd love to hear more about the technical side in a future episode - perhaps exploring how different machine learning approaches handle bias?",
    user: {
      id: '345',
      name: 'David Kim',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    likes: 5,
    isLiked: false,
    createdAt: new Date('2023-12-24T18:15:00'),
    isPrivate: true,
  },
];

export default function EpisodeComments({ episodeId }: { episodeId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { toast } = useToast();

  const handleLikeComment = (commentId: string) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like comments.",
        variant: "destructive",
      });
      return;
    }

    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 
            } 
          : comment
      )
    );
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add comments.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Create a new comment and add it to the list
    const newCommentObj: Comment = {
      id: `${comments.length + 1}`,
      content: newComment,
      user: {
        id: session.user?.id || 'user-id',
        name: session.user?.name || 'Anonymous',
        imageUrl: session.user?.image || 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      likes: 0,
      isLiked: false,
      createdAt: new Date(),
      isPrivate,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setIsPrivate(false);

    toast({
      title: "Comment added",
      description: isPrivate ? "Your private feedback has been sent to the creator." : "Your comment has been posted successfully.",
    });
  };

  const reportComment = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for your report. We'll review this comment.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Comment form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmitComment}>
            <Textarea
              placeholder="Share your thoughts on this episode..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3 min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="private-comment"
                  checked={isPrivate}
                  onCheckedChange={(checked) => setIsPrivate(checked === true)}
                />
                <label
                  htmlFor="private-comment"
                  className="text-sm font-medium flex items-center gap-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Private feedback (only visible to creator)
                </label>
              </div>
              <Button type="submit" className="gap-1.5">
                <Send className="h-4 w-4" />
                {isPrivate ? 'Send Feedback' : 'Post Comment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className={comment.isPrivate ? "border-dashed bg-muted/50" : ""}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={comment.user.imageUrl}
                    alt={comment.user.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                        {comment.isPrivate && (
                          <span className="ml-2 inline-flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Private feedback
                          </span>
                        )}
                      </p>
                    </div>
                    {!comment.isPrivate && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => reportComment(comment.id)}
                      >
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Report comment</span>
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{comment.content}</p>
                  {!comment.isPrivate && (
                    <div className="mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 gap-1.5 text-xs ${comment.isLiked ? 'text-red-500' : ''}`}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Heart className="h-3.5 w-3.5" fill={comment.isLiked ? "currentColor" : "none"} />
                        {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}