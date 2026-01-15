import type { User, Alert, ChatMessage } from './types';
import { getPlaceholderImage } from './placeholder-images';

export const users: User[] = [
  {
    uid: 'user-1',
    name: 'Jane Doe',
    phone: '555-0101',
    role: 'requester',
    skills: 'none',
    location: { lat: 34.0522, lng: -118.2437 },
    avatarUrl: getPlaceholderImage('user1')?.imageUrl ?? '',
  },
  {
    uid: 'user-2',
    name: 'Dr. John Smith',
    phone: '555-0102',
    role: 'volunteer',
    skills: 'doctor',
    location: { lat: 34.055, lng: -118.245 },
    avatarUrl: getPlaceholderImage('user2')?.imageUrl ?? '',
    isAvailable: true,
  },
  {
    uid: 'user-3',
    name: 'Maria Garcia',
    phone: '555-0103',
    role: 'volunteer',
    skills: 'nurse',
    location: { lat: 34.05, lng: -118.25 },
    avatarUrl: getPlaceholderImage('user3')?.imageUrl ?? '',
    isAvailable: true,
  },
  {
    uid: 'user-4',
    name: 'Chen Wang',
    phone: '555-0104',
    role: 'volunteer',
    skills: 'basic',
    location: { lat: 34.04, lng: -118.23 },
    avatarUrl: getPlaceholderImage('user4')?.imageUrl ?? '',
    isAvailable: false,
  },
];

export let alerts: Alert[] = [
  {
    alertId: 'alert-1',
    requesterId: 'user-1',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: '123 Main St, Los Angeles, CA',
    },
    status: 'active',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    volunteerId: 'user-2',
  },
  {
    alertId: 'alert-2',
    requesterId: 'user-5', // A user not in our list
    location: {
      lat: 34.06,
      lng: -118.25,
      address: '456 Oak Ave, Los Angeles, CA',
    },
    status: 'pending',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
];

export const chatMessages: ChatMessage[] = [
    {
        id: 'msg-1',
        senderId: 'user-1',
        text: "I'm near the entrance of the park.",
        timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    },
    {
        id: 'msg-2',
        senderId: 'user-2',
        text: "On my way, I'm about 5 minutes out.",
        timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    },
    {
        id: 'msg-3',
        senderId: 'user-1',
        text: "Okay, thank you!",
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
        id: 'msg-4',
        senderId: 'user-2',
        voiceNoteUrl: '/placeholder.mp3', // Placeholder, won't actually play
        timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    }
];

export function findUser(uid: string) {
  return users.find(u => u.uid === uid);
}

export function findAlert(alertId: string) {
  return alerts.find(a => a.alertId === alertId);
}

export function resolveAlert(alertId: string) {
    const alertIndex = alerts.findIndex(a => a.alertId === alertId);
    if (alertIndex !== -1) {
        alerts[alertIndex].status = 'resolved';
    }
}
