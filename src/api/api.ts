import type { Book, PageResponse, Talk } from '../types';

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

export async function searchBooks(keyword: string, page: number = 0): Promise<PageResponse<Book>> {
  return fetch(`/api/books?keyword=${keyword}&page=${page}&sort=title,asc`)
    .then(handleJsonResponse);
}

export async function getBookDetails(bookId: string): Promise<Book> {
  return fetch(`/api/books/${bookId}`)
    .then(handleJsonResponse);
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return Promise.resolve([]);
  }
  return fetch(`/api/books?id=${bookIds.join(',')}`)
    .then(handleJsonResponse);
}

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  return fetch(`/api/talks?bookId=${bookId}&page=${page}&size=6&sort=createdAt,desc`)
    .then(handleJsonResponse);
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  return fetch('/api/talks/recommend')
    .then(handleJsonResponse);
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  const now = new Date();
  now.setUTCMonth(now.getUTCMonth() + 12);
  const hiddenTimestamp = now.toISOString();

  return fetch('/api/talks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookId, content, hidden: hiddenTimestamp })
  })
    .then(handleJsonResponse);
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<Response> {
  const method = hasReacted ? 'DELETE' : 'POST';
  return fetch(`/api/reactions`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: reactionType, talkId: talkId })
  });
}

export async function sendVocMessage(content: string): Promise<void> {
    const response = await fetch('/api/customer/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: content})
    });

    if (!response.ok) {
        throw new Error('Failed to send message.');
    }
}
