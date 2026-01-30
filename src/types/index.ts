import type { components } from './api-schema';

export type Schemas = components['schemas'];

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

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  thumbnailImageUrl: string | null;
  externalLinkUrl: string | null;
};

// Talk 타입은 생성된 스키마 중 TalkListResponse에서 단일 항목을 추출하여 정의할 수도 있습니다.
export type Talk = NonNullable<Schemas['TalkListResponse']>[number];

export type User = Schemas['AuthMeResponse'];
