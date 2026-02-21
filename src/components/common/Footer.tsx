import React from 'react';
import { Typography, Container, Link, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md" disableGutters={isMobile} sx={{ pb: isMobile ? 0 : 2 }}>
            <Paper
                component="footer"
                elevation={isMobile ? 0 : 1}
                sx={{
                    py: 2,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: isMobile ? 0 : 2,
                    backgroundColor: 'background.paper',
                    borderTop: isMobile ? '1px solid #eee' : 'none',
                    minHeight: '56px'
                }}
            >
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 0.5 }}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' Quiet Chatter. All rights reserved.'}
                </Typography>
                <Link component={RouterLink} to="/terms" color="primary" variant="caption" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    이용약관 및 개인정보처리방침
                </Link>
            </Paper>
        </Container>
    );
};

export default Footer;
