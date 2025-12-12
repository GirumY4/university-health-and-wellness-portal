export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  image: string; // URL for avatar
  experience: string;
  rating: number;
  availableDays: string[];
  isAvailableToday: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}
