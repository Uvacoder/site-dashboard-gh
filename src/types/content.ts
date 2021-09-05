export interface Content {
  slug: string;
  views: number;
  likes: number;
  likesByUser: number;
  devtoViews: number | null;
}

export type LikePerDate = { date: string; data: Array<Content> };
