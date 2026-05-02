import { apiClient } from './client';
import type { Book, SliceResponse } from '../types';

export async function searchBooks(keyword: string, page: number = 0): Promise<SliceResponse<Book>> {
  const response = await apiClient.get<SliceResponse<Book>>('/api/books', {
    params: { keyword, page, sort: 'title,asc' }
  });
  return response.data;
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const response = await apiClient.get<Book>(`/api/books/${bookId}`);
  return response.data;
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return [];
  }
  const response = await apiClient.get<Book[]>('/api/books', {
    params: { id: bookIds.join(',') }
  });
  return response.data;
}
