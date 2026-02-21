export const HISTORY_INTRO = `조용한 사람들을 위한 독서 공간, Quiet Chatter.

동네 독립 서점 책장 위, 작은 종이 메모들에 남겨져 있던 누군가의 따뜻한 추천과 감상에서 영감을 받았습니다.
내 글이 인터넷에 영원히 박제될까 두려운 분들을 위해, 수줍음 많은 사람들도 편안하게 책에 대한 이야기를 나눌 수 있는 익명 기반의 소셜 네트워크로 시작되었습니다.`;

export interface HistoryEvent {
    date: string;
    items: string[];
}

export const HISTORY_TIMELINE: HistoryEvent[] = [
    {
        date: '2026년 2월',
        items: [
            '완전한 익명성을 보장하는 네이버 간편 로그인(OAuth2) 도입',
            '홈 화면 대시보드 개편 및 실시간 업데이트 연동',
            '전체적인 타이포그래피 및 UI 여백 최적화 적용',
        ],
    },
    {
        date: '2026년 1월',
        items: [
            '빠르고 매끄러운 사용자 경험을 위한 프론트엔드 분리 론칭',
            '내가 작성한 북톡(독후감) 수정 및 삭제 기능 오픈',
            '무한 스크롤(Infinite-Scrolling) 적용으로 끊김 없는 탐색 지원',
        ],
    },
    {
        date: '2025년 11월',
        items: [
            'Quiet Chatter 첫 서비스 공식 론칭',
            '사용자가 책을 공유하고 공감할 수 있는 익명 북톡 작성 기능',
            '즉각적인 반응형 "좋아요/공감해요" 기능 신설',
            '우연한 발견을 돕는 추천 북톡 알고리즘 최초 적용',
        ],
    },
    {
        date: '2025년 10월',
        items: [
            '"Quiet Chatter: You Belong Here" 컨셉 기획',
            '나를 숨기고 진솔한 생각을 말할 수 있는 안전한 책 공간 구상',
        ],
    },
];
