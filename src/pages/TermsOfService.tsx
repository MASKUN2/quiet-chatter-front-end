import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LATEST_TERMS } from '../constants/terms';

const TermsOfService: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                이전으로 돌아가기
            </Button>

            <Paper elevation={1} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                    이용약관 및 개인정보처리방침
                </Typography>

                {LATEST_TERMS.sections.map((section, idx) => (
                    <Box key={idx} sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
                            {section.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={section.isImportant ? 'text.primary' : 'text.secondary'}
                            paragraph
                            sx={section.isImportant ? { fontWeight: 'medium', bgcolor: 'grey.50', p: 2, borderRadius: 1 } : {}}
                        >
                            {section.isImportant && <strong>중요: </strong>}
                            {section.content}
                        </Typography>
                    </Box>
                ))}

                <Typography variant="caption" color="text.secondary" display="block" align="center" sx={{ mt: 5 }}>
                    시행일자: {LATEST_TERMS.date} (버전 {LATEST_TERMS.version})
                </Typography>
            </Paper>
        </Container>
    );
};

export default TermsOfService;
