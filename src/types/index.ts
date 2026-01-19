export interface PageInfo {
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}

export interface PageResponse<T> {
  content: T[];
  page: PageInfo;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  thumbnailImageUrl: string | null;
  externalLinkUrl: string | null;
}

export interface Talk {
  id: string;
  bookId: string;
  content: string;
  createdAt: string;
  like_count: number;
  support_count: number;
  didILike: boolean;
  didISupport: boolean;
}
