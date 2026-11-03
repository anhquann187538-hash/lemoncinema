export interface Character {
  id: string;
  name: string;
  avatarUrl?: string;
  detailAvatarUrl?: string;
  description?: string;
  story?: string;
  greeting?: string;
  tags?: string[];
  link?: string;
  linkBG?: string;
  linkBL?: string;
  linkComment?: string;
  saveCount: number;
  isNew?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CharacterInput = Omit<Character, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

export type CinemaGenre = string;

export const DEFAULT_CINEMA_GENRES: string[] = [
  'Tất cả',
  'Trinh thám & Noir',
  'Cyberpunk',
  'Khoa học viễn tưởng',
  'Kinh dị & Gothic',
  'Huyền huyễn',
  'Cổ trang',
  'Hành động',
  'Lãng mạn',
  'Kịch tính',
  'Giả tưởng'
];

export type SortOption = 'order' | 'likes' | 'newest' | 'name';
