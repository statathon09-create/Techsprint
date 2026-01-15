export type User = {
  uid: string;
  name: string;
  phone: string;
  role: 'volunteer' | 'requester';
  skills: 'doctor' | 'nurse' | 'basic' | 'none';
  location: {
    lat: number;
    lng: number;
  };
  avatarUrl: string;
  isAvailable?: boolean;
};

export type Alert = {
  alertId: string;
  requesterId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'pending' | 'resolved';
  timestamp: string;
  volunteerId?: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text?: string;
  voiceNoteUrl?: string;
  timestamp: string;
};
