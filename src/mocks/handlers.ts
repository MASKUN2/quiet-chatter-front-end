import { http, HttpResponse } from 'msw';

export const handlers = [
    // Mock Logged-in User
    http.get('/api/v1/auth/me', () => {
        return HttpResponse.json({
            role: 'REGULAR',
            nickname: 'MockUser',
            isLoggedIn: true,
            id: 'mock-user-123'
        });
    }),
    // Mock Book Details
    http.get('/api/v1/books/:bookId', (req) => {
        const { bookId } = req.params;
        return HttpResponse.json({
            id: bookId,
            title: 'Mock Book Title',
            author: 'Mock Author',
            isbn: '1234567890',
            description: 'This is a mock book description used for testing.',
            thumbnailImageUrl: 'https://via.placeholder.com/150',
            externalLinkUrl: 'https://example.com'
        });
    }),
    // Mock Talks List
    http.get('/api/v1/talks', () => {
        return HttpResponse.json({
            content: [],
            empty: true,
            first: true,
            last: true,
            number: 0,
            numberOfElements: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            pageable: "INSTANCE"
        });
    }),
    // Mock Recommended Talks
    http.get('/api/v1/talks/recommend', () => {
        return HttpResponse.json([]);
    }),
];
