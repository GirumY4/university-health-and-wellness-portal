// src/types/dashboard.ts
import type { IconName } from "src/icons";

export type StatValue = string | number;

export interface StatItem {
  id: string;
  value: StatValue;
  label: string;
  color: string; // hex
  iconName: IconName;
  status?: string;
  link?: string;
}

export interface ActionItem {
  id: string;
  name: string;
  description: string;
  iconName: IconName;
  color: string;
  path: string;
}

export interface TipItem {
  id: string;
  text: string;
  iconName: IconName;
}

export type ReminderType = "reminder" | "alert" | "urgent";

export interface ReminderItem {
  id: string;
  text: string;
  type: ReminderType;
}

export interface DashboardData {
  hero: {
    title?: string;
    subtitle?: string;
    reminders: ReminderItem[];
  };
  stats: StatItem[];
  actions: ActionItem[];
  tips: TipItem[];
  contact: {
    label: string;
    phone: string;
  };
  lastUpdated?: string; // ISO date
}
