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
    http.get('/api/v1/books/:bookId', (info: any) => {
        const { bookId } = info.params;
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
    // Mock Naver Login (force signup flow)
    http.post('/api/v1/auth/login/naver', async () => {
        // To trigger the signup modal, we must return isRegistered: false
        return HttpResponse.json({
            isRegistered: false,
            registerToken: 'mock-signup-token-12345',
            tempNickname: 'NewQuietUser',
        });
    }),
    // Mock Naver Signup
    http.post('/api/v1/auth/signup/naver', async () => {
        return HttpResponse.json({}, { status: 200 });
    }),
    // Mock Reactivate
    http.post('/api/v1/auth/reactivate', async () => {
        return HttpResponse.json({}, { status: 200 });
    }),
    // Mock My Talks
    http.get('/api/v1/me/talks', () => {
        return HttpResponse.json({
            content: [
                {
                    id: 'mock-talk-1',
                    content: 'This is my mock talk about a great book.',
                    bookId: 'mock-book-1',
                    memberId: 'mock-user-123',
                    nickname: 'MockUser',
                    like_count: 5,
                    support_count: 2,
                    didILike: true,
                    didISupport: false,
                    is_modified: false,
                    createdAt: new Date().toISOString(),
                    book: {
                        id: 'mock-book-1',
                        title: 'Mock Book Title',
                        author: 'Mock Author',
                        cover: 'https://via.placeholder.com/150'
                    }
                }
            ],
            page: {
                first: true,
                last: true,
                number: 0,
                totalPages: 1
            }
        });
    }),
    // Mock Profile Update
    http.put('/api/v1/me/profile', async () => {
        return HttpResponse.json({}, { status: 204 });
    }),
    // Mock Delete Account
    http.delete('/api/v1/me', async () => {
        return HttpResponse.json({}, { status: 204 });
    }),
];
