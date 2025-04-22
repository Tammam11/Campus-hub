export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'sports' | 'gym';
  capacity: number;
  available: boolean;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'faculty' | 'student' | 'external';
  email: string;
}