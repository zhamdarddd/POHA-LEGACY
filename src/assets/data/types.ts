export type Course = {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  enrolled: number;
  price: number;
  oldPrice?: number;
  progress?: number;
  status?: string;
  isBestSeller?: boolean;
  isFavorite?: boolean;
  // For downloaded course card
  downloadProgress?: number;
  // Add these missing fields:
  description?: string;
  difficulty?: string;
  language?: string;
  isFree?: boolean;
  state?: "downloading" | "completed";
};
