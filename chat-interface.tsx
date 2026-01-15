'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage, User } from '@/lib/types';
import { format } from 'date-fns';

type ChatInterfaceProps = {
  messages: ChatMessage[];
  currentUser: User;
  otherUser: User;
};

export default function ChatInterface({ messages, currentUser, otherUser }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to your backend here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.uid;
            const sender = isCurrentUser ? currentUser : otherUser;

            return (
              <div
                key={message.id}
                className={cn('flex items-end gap-3', isCurrentUser && 'justify-end')}
              >
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender.avatarUrl} alt={sender.name} />
                    <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md rounded-lg px-4 py-2',
                    isCurrentUser ? 'bg-accent text-accent-foreground' : 'bg-muted'
                  )}
                >
                  {message.text && <p className="text-sm">{message.text}</p>}
                  {message.voiceNoteUrl && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
                    </div>
                  )}
                  <p className="text-xs text-right mt-1 opacity-70">
                    {format(new Date(message.timestamp), 'p')}
                  </p>
                </div>
                 {isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender.avatarUrl} alt={sender.name} />
                    <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex items-center gap-2 border-t p-2">
        <Input
          type="text"
          placeholder="Type a message..."
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size="icon" variant="ghost">
          <Mic className="h-5 w-5" />
        </Button>
        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
