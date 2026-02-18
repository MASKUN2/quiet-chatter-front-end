import axios from 'axios';
import type { Book, PageResponse, SliceResponse, Talk, Member } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.response?.data?.message || error.message || 'API 요청에 실패했습니다.';
    return Promise.reject(new Error(message));
  }
);

export async function getMe(): Promise<Member> {
  const response = await apiClient.get<Member>('/v1/auth/me');
  return response.data;
}

export async function loginWithNaver(code: string, state: string): Promise<void> {
  await apiClient.post('/v1/auth/login/naver', { code, state });
}

export async function logout(): Promise<void> {
  await apiClient.post('/v1/auth/logout');
}

export async function searchBooks(keyword: string, page: number = 0): Promise<SliceResponse<Book>> {
  const response = await apiClient.get<SliceResponse<Book>>('/v1/books', {
    params: { keyword, page, sort: 'title,asc' }
  });
  return response.data;
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const response = await apiClient.get<Book>(`/v1/books/${bookId}`);
  return response.data;
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return [];
  }
  const response = await apiClient.get<Book[]>('/v1/books', {
    params: { id: bookIds.join(',') }
  });
  return response.data;
}

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  const response = await apiClient.get<PageResponse<Talk>>('/v1/talks', {
    params: { bookId, page, size: 6, sort: 'createdAt,desc' }
  });
  return response.data;
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  const response = await apiClient.get<Talk[]>('/v1/talks/recommend');
  return response.data;
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  const now = new Date();
  now.setUTCMonth(now.getUTCMonth() + 12);
  const hiddenTimestamp = now.toISOString();

  const response = await apiClient.post<Talk>('/v1/talks', {
    bookId,
    content,
    hidden: hiddenTimestamp
  });
  return response.data;
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<void> {
  if (hasReacted) {
    await apiClient.delete('/v1/reactions', {
      data: { type: reactionType, talkId: talkId }
    });
  } else {
    await apiClient.post('/v1/reactions', {
      type: reactionType,
      talkId: talkId
    });
  }
}

export async function sendVocMessage(content: string): Promise<void> {
  await apiClient.post('/v1/customer/messages', { content });
}

export async function updateTalk(talkId: string, content: string): Promise<void> {
  await apiClient.put(`/v1/talks/${talkId}`, { content });
}

export async function deleteTalk(talkId: string): Promise<void> {
  await apiClient.delete(`/v1/talks/${talkId}`);
}
