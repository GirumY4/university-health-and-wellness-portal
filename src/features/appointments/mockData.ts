import type { Doctor, TimeSlot } from "./types";

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    specialty: "General Physician",
    department: "General Medicine",
    image: "https://i.pravatar.cc/150?u=dr_sarah",
    experience: "8 Years",
    rating: 4.8,
    availableDays: ["Mon", "Wed", "Fri"],
    isAvailableToday: true,
  },
  {
    id: "2",
    name: "Dr. Alemayehu Tadesse",
    specialty: "Dentist",
    department: "Dental Clinic",
    image: "https://i.pravatar.cc/150?u=dr_alem",
    experience: "12 Years",
    rating: 4.9,
    availableDays: ["Tue", "Thu"],
    isAvailableToday: false,
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Nutritionist",
    department: "Wellness Center",
    image: "https://i.pravatar.cc/150?u=dr_emily",
    experience: "5 Years",
    rating: 4.7,
    availableDays: ["Mon", "Thu"],
    isAvailableToday: true,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Psychiatrist",
    department: "Mental Health",
    image: "https://i.pravatar.cc/150?u=dr_james",
    experience: "15 Years",
    rating: 5.0,
    availableDays: ["Wed", "Fri"],
    isAvailableToday: true,
  },
];

export const generateSlots = (): TimeSlot[] => [
  { id: "s1", time: "09:00 AM", isAvailable: true },
  { id: "s2", time: "10:00 AM", isAvailable: false },
  { id: "s3", time: "11:00 AM", isAvailable: true },
  { id: "s4", time: "02:00 PM", isAvailable: true },
  { id: "s5", time: "03:00 PM", isAvailable: false },
  { id: "s6", time: "04:30 PM", isAvailable: true },
];
