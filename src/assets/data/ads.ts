// assets/data/ads.ts
export const adsData = [
  {
    id: "ad1",
    title: "📣 New Course Alert!",
    publishedAt: "2 days ago",
    body: "Mastering Python: From Basics to Advanced is now live. Start learning today and boost your ...",
    category: "Programming",
    imageUrl: "https://i.pravatar.cc/100", // 44x44 image
  },
];

export type Ad = {
  id: string;
  title: string;
  publishedAt: string;
  body: string;
  category: string;
  imageUrl: string;
  // Add these if you want to support more filters
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  language?: string;
  isFree?: boolean;
};

