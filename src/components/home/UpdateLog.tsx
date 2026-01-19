import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const updates = [
    '이제부터 시간을 두고 랜덤으로 북톡이 추천됩니다',
    '일부 ui가 깨지는 현상을 수정했습니다',
    '보호를 위해 API rate limit를 설정했습니다',
    '홈 화면의 사용법 안내가 이제 동영상으로 표시되어 더 빠르게 보여집니다',
    '데이터를 불러오는 중의 화면 깜빡임 문제를 해결했습니다',
    '최근 북톡의 좋아요, 응원해요 개수가 화면에 더 잘 보이도록 수정했습니다',
    '북톡에 반응을 남기는 버튼 디자인을 개선했습니다',
    '북톡의 줄바꿈 표시가 가능해졌습니다'
];

const UpdateLog: React.FC = () => {
  return (
    <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
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
