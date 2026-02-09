// src/services/mockDashboardService.ts
import type { DashboardData } from "../dashboard";
import type { IconName } from "../../../icons";

/**
 * Simple mock service for dashboard data.
 * Replace implementation with an API call later.
 */

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const nowIso = () => new Date().toISOString();

const sampleIcon = (name: IconName) => name; // placeholder to keep type usage

export const mockDashboardData: DashboardData = {
  hero: {
    title: "Welcome back",
    subtitle:
      "Your central hub for campus health management. Track appointments, access records, and stay healthy with our wellness resources.",
    reminders: [
      {
        id: "r1",
        text: "Annual physical checkup due next month",
        type: "reminder",
      },
      { id: "r2", text: "Flu vaccine available at clinic", type: "alert" },
      {
        id: "r3",
        text: "Medication refill required by Friday",
        type: "urgent",
      },
    ],
  },
  stats: [
    {
      id: "s-pending-results",
      value: rand(0, 10),
      label: "Pending Lab Results",
      color: "#38A169",
      iconName: "Assignment",
      status: "Available within 24h",
      link: "/app/records",
    },
    {
      id: "s-next-appointment",
      value: "Today",
      label: "Next Appointment",
      color: "#4299E1",
      iconName: "Calendar",
      status: "2:30 PM · Dr. Smith",
      link: "/app/appointments",
    },
    {
      id: "s-new-posts",
      value: rand(0, 12),
      label: "New Wellness Posts",
      color: "#ED8936",
      iconName: "TrendingUp",
      status: "Updated this week",
      link: "/app/wellness",
    },
    {
      id: "s-active-prescriptions",
      value: rand(0, 20),
      label: "Active Prescriptions",
      color: "#9F7AEA",
      iconName: "Medication",
      status: "3 require renewal",
      link: "/app/records",
    },
  ],
  actions: [
    {
      id: "a-book",
      name: "Book Appointment",
      description:
        "Schedule your visit with a campus doctor or specialist. Choose from available time slots.",
      iconName: "Calendar",
      color: "#4299E1",
      path: "/app/appointments",
    },
    {
      id: "a-records",
      name: "View My Records",
      description:
        "Access your clinical history, prescriptions, lab results, and immunization records.",
      iconName: "Document",
      color: "#38A169",
      path: "/app/records",
    },
    {
      id: "a-wellness",
      name: "Wellness & Tips",
      description:
        "Read campus health guides, fitness tips, mental health resources, and wellness articles.",
      iconName: "Wellness",
      color: "#ED8936",
      path: "/app/wellness",
    },
    {
      id: "a-support",
      name: "Contact Support",
      description:
        "Get quick help, report issues, or contact IT support and clinic staff directly.",
      iconName: "Support",
      color: "#9F7AEA",
      path: "/app/support",
    },
  ],
  tips: [
    {
      id: "t1",
      text: "Stay hydrated - drink 8 glasses daily",
      iconName: "Health",
    },
    { id: "t2", text: "Get 7-8 hours of sleep each night", iconName: "Emoji" },
    {
      id: "t3",
      text: "Take regular study breaks every 45 mins",
      iconName: "AccessTime",
    },
    {
      id: "t4",
      text: "Practice mindfulness for stress relief",
      iconName: "Psychology",
    },
  ],
  contact: {
    label: "Campus Clinic",
    phone: "+251-911-234-567",
  },
  lastUpdated: nowIso(),
};

/**
 * Simulate network delay and return the mock payload.
 * Replace with fetch/axios call when backend available.
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate a short network latency
  await new Promise((r) => setTimeout(r, 350));
  // Return a clone so consumers can mutate safely if needed
  return JSON.parse(JSON.stringify(mockDashboardData)) as DashboardData;
};
