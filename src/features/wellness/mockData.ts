import type { Article } from "./types";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Managing Exam Stress: A Guide for Engineering Students",
    excerpt:
      "Exams at BiT can be intense. Here are 5 scientifically proven ways to manage cortisol levels during finals week.",
    content:
      "Full article content about breathing exercises, pomodoro technique, and sleep hygiene...",
    category: "Mental Health",
    author: "Dr. Almaz T.",
    date: "Dec 1, 2025",
    readTime: "5 min read",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Affordable Nutrition Around Campus",
    excerpt:
      "Eating healthy on a student budget is possible. We review the best spots in Bahir Dar for fresh fruits and balanced meals.",
    content:
      "Full content about local markets, cafeteria hacks, and hydration...",
    category: "Nutrition",
    author: "Campus Nutritionist",
    date: "Nov 28, 2025",
    readTime: "3 min read",
  },
  {
    id: "3",
    title: "Morning Jogging Routes: Lake Tana Shore",
    excerpt:
      "Start your day with fresh air. Here are the safest and most scenic jogging paths near the campus.",
    content: "Map details, best times to go, and running groups...",
    category: "Fitness",
    author: "Sports Club",
    date: "Nov 20, 2025",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "Balancing Social Life and Academics",
    excerpt:
      "How to maintain friendships without sacrificing your GPA. Tips from senior students.",
    content: "Time blocking advice and setting boundaries...",
    category: "Campus Life",
    author: "Student Council",
    date: "Oct 15, 2025",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "The Importance of Sleep for Coding",
    excerpt:
      "Why pulling all-nighters might actually be hurting your programming skills.",
    content: "Neuroscience of memory consolidation during sleep...",
    category: "Mental Health",
    author: "Dr. Abebe K.",
    date: "Sept 10, 2025",
    readTime: "5 min read",
  },
];
