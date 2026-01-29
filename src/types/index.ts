export interface PageInfo {
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}

export interface SliceInfo {
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: PageInfo;
}

export interface SliceResponse<T> extends SliceInfo {
  content: T[];
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
  dateToHidden: string;
  like_count: number;
  support_count: number;
  didILike: boolean;
  didISupport: boolean;
  is_modified: boolean;
}
