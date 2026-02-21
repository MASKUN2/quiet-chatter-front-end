export const ABOUT_INTRO = `조용한 사람들을 위한 독서 공간, Quiet Chatter.

동네 독립 서점 책장 위, 작은 종이 메모들에 남겨져 있던 누군가의 따뜻한 추천과 감상에서 영감을 받았습니다.
내 글이 인터넷에 영원히 박제될까 두려운 분들을 위해, 수줍음 많은 사람들도 편안하게 책에 대한 이야기를 나눌 수 있는 익명 기반의 소셜 네트워크로 시작되었습니다.`;

export interface ServiceFeature {
    title: string;
    description: string;
    icon: string;
}

export const ABOUT_FEATURES: ServiceFeature[] = [
    {
        title: '완전한 익명성',
        description: '이름도, 프로필 사진도 필요 없습니다. 오직 당신의 생각과 감상만으로 소통하세요.',
        icon: 'Security',
    },
    {
        title: '부담 없는 북톡',
        description: '전문적인 리뷰가 아니어도 괜찮습니다. 책 한 구절, 짧은 느낌 하나도 소중한 기록이 됩니다.',
        icon: 'ChatBubbleOutline',
    },
    {
        title: '휘발성 기록',
        description: '일정 시간이 지나면 북톡이 자동으로 숨겨집니다. 지금 이 순간의 생각에 더 집중할 수 있는 환경을 만듭니다.',
        icon: 'Timer',
    },
    {
        title: '우연한 발견',
        description: '다른 이들의 조용한 목소리를 통해, 당신의 인생 책을 새롭게 발견하는 즐거움을 누리세요.',
        icon: 'AutoAwesome',
    },
    {
        title: '기록의 보존',
        description: '언제든 내가 남긴 북톡을 다시 보며 과거의 생각들과 마주할 수 있습니다.',
        icon: 'MenuBook',
    },
];

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
