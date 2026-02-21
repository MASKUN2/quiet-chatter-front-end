import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const updates = [
  '홈 화면 "당신을 위한 북톡" 영역에 부드러운 45초 타이머 자동 갱신 기능을 도입했습니다',
  '추천 북톡을 불러올 때 화면이 덜컹거리는 현상을 막기 위해 초기 뼈대(Skeleton) UI를 개선했습니다',
  '네이버 로그인 혹은 회원가입 완료 시, 홈으로 튕기지 않고 보던 페이지로 바로 돌아가도록 UX를 개선했습니다',
  '책 상세 페이지에서 비로그인 사용자도 쉽게 네이버 로그인을 띄울 수 있도록 전용 버튼을 추가했습니다',
  '로그아웃 시에도 현재 보고 있던 페이지 흐름이 끊기지 않도록 직관적인 알림(Toast) 메시지를 추가했습니다',
  '데이터를 비동기로 불러오는 중 발생하는 작은 화면 깜빡임(Flickering) 문제들을 근본적으로 해결했습니다',
];

const UpdateLog: React.FC = () => {
  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        최근 업데이트 내용
      </Typography>
      <List dense>
        {updates.map((text, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`- ${text}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UpdateLog;
