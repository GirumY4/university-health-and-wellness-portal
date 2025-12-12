export type Category =
  | "All"
  | "Mental Health"
  | "Nutrition"
  | "Fitness"
  | "Campus Life";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // The full article text
  category: Category;
  author: string;
  date: string;
  readTime: string;
  isFeatured?: boolean; // To highlight important news
}
