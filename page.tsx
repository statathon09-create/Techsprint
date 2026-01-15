'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { findAlert, findUser, chatMessages, resolveAlert as resolveAlertInData } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ChatInterface from '@/components/chat-interface';
import { MapPin, Phone, Stethoscope, ShieldCheck, User } from 'lucide-react';
import type { User as UserType, Alert } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

function UserCard({ user, type }: { user: UserType; type: 'Requester' | 'Volunteer' }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          {type === 'Requester' ? <User /> : <ShieldCheck />}
          {type}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg">{user.name}</p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
        {user.skills !== 'none' && (
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-accent" />
            <Badge variant="secondary" className="capitalize text-base">{user.skills}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AlertDetailPage({ params }: { params: { id: string } }) {
  const initialAlert = findAlert(params.id);
  const [alert, setAlert] = useState<Alert | undefined>(initialAlert);
  const router = useRouter();
  const { toast } = useToast();

  if (!alert) {
    notFound();
  }

  const requester = findUser(alert.requesterId) ?? { uid: 'user-5', name: 'Unknown User', phone: 'N/A', role: 'requester', skills: 'none', location: {lat:0, lng:0}, avatarUrl: getPlaceholderImage('user5')?.imageUrl ?? '' };
  const volunteer = alert.volunteerId ? findUser(alert.volunteerId) : null;
  const mapImage = getPlaceholderImage('map');

  // For demonstration, assume current user is the volunteer
  const currentUser = volunteer ?? requester; 

  const handleResolve = () => {
    resolveAlertInData(alert.alertId);
    const updatedAlert = findAlert(alert.alertId);
    setAlert(updatedAlert);
    toast({
      title: 'Alert Resolved',
      description: 'You have successfully marked the alert as resolved.',
    });
    // Redirect to volunteer dashboard after a short delay
    setTimeout(() => {
      router.push('/volunteer');
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-headline font-bold">Alert Details</h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {alert.location.address}
          </p>
        </div>
        <Badge variant={alert.status === 'resolved' ? 'secondary' : 'destructive'} className="capitalize text-lg">{alert.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="font-headline">Live Location</CardTitle>
            </CardHeader>
            <CardContent>
              {mapImage && (
                <Image
                  src={mapImage.imageUrl}
                  alt="Map showing location"
                  width={1200}
                  height={800}
                  className="rounded-md object-cover w-full h-[400px]"
                  data-ai-hint={mapImage.imageHint}
                />
              )}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                     <MapPin className="h-10 w-10 text-primary drop-shadow-lg"/>
                     <div className="absolute -top-8 -left-5 bg-card text-card-foreground px-2 py-1 rounded text-sm shadow">Requester</div>
                  </div>
               </div>
               {volunteer && (
                <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <MapPin className="h-10 w-10 text-accent drop-shadow-lg"/>
                        <div className="absolute -top-8 -left-5 bg-card text-card-foreground px-2 py-1 rounded text-sm shadow">Volunteer</div>
                    </div>
                </div>
               )}
            </CardContent>
          </Card>
          
          <div className="h-[600px]">
            <ChatInterface messages={chatMessages} currentUser={currentUser} otherUser={requester}/>
          </div>
        </div>

        <div className="space-y-8">
          <UserCard user={requester} type="Requester" />
          {volunteer && <UserCard user={volunteer} type="Volunteer" />}
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleResolve}
                disabled={alert.status === 'resolved'}
              >
                {alert.status === 'resolved' ? 'Alert Resolved' : 'Resolve Alert'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
