import type { Book, PageResponse, SliceResponse, Talk, User } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function handleJsonResponse(response: Response) {
  if (!response.ok) {
    return response.json().then(err => {
      throw new Error(err.message || 'API request failed.');
    }).catch(() => {
      throw new Error(`HTTP ${response.status}: API request failed.`);
    });
  }
  return response.json();
}

export async function getMe(): Promise<User> {
  return fetch(`${BASE_URL}/api/v1/auth/me`).then(handleJsonResponse);
}

export async function searchBooks(keyword: string, page: number = 0): Promise<SliceResponse<Book>> {
  return fetch(`${BASE_URL}/api/v1/books?keyword=${keyword}&page=${page}&sort=title,asc`)
    .then(handleJsonResponse);
}

export async function getBookDetails(bookId: string): Promise<Book> {
  return fetch(`${BASE_URL}/api/v1/books/${bookId}`)
    .then(handleJsonResponse);
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return Promise.resolve([]);
  }
  return fetch(`${BASE_URL}/api/v1/books?id=${bookIds.join(',')}`)
    .then(handleJsonResponse);
}

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  return fetch(`${BASE_URL}/api/v1/talks?bookId=${bookId}&page=${page}&size=6&sort=createdAt,desc`)
    .then(handleJsonResponse);
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  return fetch(`${BASE_URL}/api/v1/talks/recommend`)
    .then(handleJsonResponse);
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  const now = new Date();
  now.setUTCMonth(now.getUTCMonth() + 12);
  const hiddenTimestamp = now.toISOString();

  return fetch(`${BASE_URL}/api/v1/talks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId, content, hidden: hiddenTimestamp })
  })
    .then(handleJsonResponse);
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<Response> {
  const method = hasReacted ? 'DELETE' : 'POST';
  return fetch(`${BASE_URL}/api/v1/reactions`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: reactionType, talkId: talkId })
  });
}

export async function sendVocMessage(content: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/v1/customer/messages`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: content})
    });

    if (!response.ok) {
        throw new Error('Failed to send message.');
    }
}

export async function updateTalk(talkId: string, content: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/talks/${talkId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: `HTTP ${response.status}: API request failed.` }));
    throw new Error(err.message || 'API request failed.');
  }
}

export async function deleteTalk(talkId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/talks/${talkId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: `HTTP ${response.status}: API request failed.` }));
    throw new Error(err.message || 'API request failed.');
  }
}