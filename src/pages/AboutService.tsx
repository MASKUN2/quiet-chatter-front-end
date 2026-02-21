import React from 'react';
import { Typography, Paper, Box, Stack, useTheme, useMediaQuery, Divider, Grid } from '@mui/material';
import { ABOUT_INTRO, ABOUT_FEATURES, HISTORY_TIMELINE } from '../constants/history';
import CircleIcon from '@mui/icons-material/Circle';
import SecurityIcon from '@mui/icons-material/Security';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimerIcon from '@mui/icons-material/Timer';

const iconMap: { [key: string]: React.ElementType } = {
    Security: SecurityIcon,
    ChatBubbleOutline: ChatBubbleOutlineIcon,
    AutoAwesome: AutoAwesomeIcon,
    MenuBook: MenuBookIcon,
    Timer: TimerIcon,
};

const AboutService: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper elevation={isMobile ? 0 : 1} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
            <Stack spacing={{ xs: 4, md: 6 }}>
                {/* Intro Section */}
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                        서비스 소개
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: 'text.primary', fontSize: '1.1rem' }}>
                        {ABOUT_INTRO}
                    </Typography>
                </Box>

                {/* Features Section */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                        주요 기능
                    </Typography>
                    <Grid container spacing={3}>
                        {ABOUT_FEATURES.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon];
                            return (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box sx={{
                                        p: 3,
                                        height: '100%',
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        bgcolor: 'rgba(92, 45, 145, 0.02)',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'translateY(-4px)', bgcolor: 'rgba(92, 45, 145, 0.05)' }
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                            {IconComponent && <IconComponent color="primary" sx={{ mr: 1 }} />}
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                {feature.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                <Divider />

                {/* History Timeline Section */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
                        서비스 연혁
                    </Typography>
                    <Stack spacing={4}>
                        {HISTORY_TIMELINE.map((event, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 4 } }}>
                                <Box sx={{ minWidth: 120, pt: { xs: 0, sm: 0.5 }, pb: { xs: 1, sm: 0 } }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                        {event.date}
                                    </Typography>
                                </Box>
                                <Box sx={{ position: 'relative', flex: 1, pl: { xs: 2, sm: 3 }, borderLeft: '2px solid', borderColor: 'divider' }}>
                                    <CircleIcon
                                        sx={{
                                            position: 'absolute',
                                            left: -7,
                                            top: 6,
                                            fontSize: 12,
                                            color: 'primary.main',
                                            bgcolor: 'background.paper'
                                        }}
                                    />
                                    <Stack spacing={1.5}>
                                        {event.items.map((item, itemIdx) => (
                                            <Typography key={itemIdx} variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                                • {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    );
};

export default AboutService;
