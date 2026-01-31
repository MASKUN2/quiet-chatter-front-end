import axios from 'axios';
import type { Book, PageResponse, SliceResponse, Talk, User } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터: 공통 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버에서 내려준 에러 메시지 우선 사용, 없으면 기본 메시지
    const message = error.response?.data?.message || error.message || 'API request failed.';
    return Promise.reject(new Error(message));
  }
);

export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>('/api/v1/auth/me');
  return response.data;
}

export async function searchBooks(keyword: string, page: number = 0): Promise<SliceResponse<Book>> {
  const response = await apiClient.get<SliceResponse<Book>>(`/api/v1/books`, {
    params: { keyword, page, sort: 'title,asc' }
  });
  return response.data;
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const response = await apiClient.get<Book>(`/api/v1/books/${bookId}`);
  return response.data;
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return [];
  }
  const response = await apiClient.get<Book[]>('/api/v1/books', {
    params: { id: bookIds.join(',') }
  });
  return response.data;
}

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  const response = await apiClient.get<PageResponse<Talk>>('/api/v1/talks', {
    params: { bookId, page, size: 6, sort: 'createdAt,desc' }
  });
  return response.data;
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  const response = await apiClient.get<Talk[]>('/api/v1/talks/recommend');
  return response.data;
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  const now = new Date();
  now.setUTCMonth(now.getUTCMonth() + 12);
  const hiddenTimestamp = now.toISOString();

  const response = await apiClient.post<Talk>('/api/v1/talks', {
    bookId,
    content,
    hidden: hiddenTimestamp
  });
  return response.data;
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<void> {
  // DELETE 요청 시 body 전송을 위해 data 옵션 사용
  if (hasReacted) {
    await apiClient.delete('/api/v1/reactions', {
      data: { type: reactionType, talkId: talkId }
    });
  } else {
    await apiClient.post('/api/v1/reactions', {
      type: reactionType,
      talkId: talkId
    });
  }
}

export async function sendVocMessage(content: string): Promise<void> {
  await apiClient.post('/api/v1/customer/messages', { content });
}

export async function updateTalk(talkId: string, content: string): Promise<void> {
  await apiClient.put(`/api/v1/talks/${talkId}`, { content });
}

export async function deleteTalk(talkId: string): Promise<void> {
  await apiClient.delete(`/api/v1/talks/${talkId}`);
}