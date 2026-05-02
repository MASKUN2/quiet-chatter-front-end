import { apiClient } from './client';

export async function sendVocMessage(content: string): Promise<void> {
  await apiClient.post('/api/support/messages', { content });
}
