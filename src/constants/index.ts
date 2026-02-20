export const API = {
  TIMEOUT: 10000,
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  TALK_LIST_SIZE: 6,
} as const;

export const VALIDATION = {
  TALK_MAX_LENGTH: 250,
} as const;

export const MESSAGES = {
  ERROR: {
    DEFAULT: '알 수 없는 오류가 발생했습니다.',
    API_REQUEST_FAILED: 'API 요청에 실패했습니다.',
    TALK_POST_FAILED: '톡 등록 중 오류가 발생했습니다.',
    REACTION_FAILED: '반응 처리 중 오류가 발생했습니다.',
    VOC_SEND_FAILED: '메시지 전송에 실패했습니다.',
    LOGIN_REQUIRED: '로그인이 필요한 기능입니다.',
    INPUT_REQUIRED: '메시지를 입력해주세요.',
  },
  SUCCESS: {
    VOC_SENT: '소중한 의견 감사합니다!',
  },
} as const;
