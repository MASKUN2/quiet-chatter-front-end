import React from 'react';
import { Typography, Paper, Box, Stack, useTheme, useMediaQuery, Divider, Grid } from '@mui/material';
import { ABOUT_INTRO, ABOUT_FEATURES, HISTORY_TIMELINE, SERVICE_PHILOSOPHY } from '../constants/about';
import CircleIcon from '@mui/icons-material/Circle';
import SecurityIcon from '@mui/icons-material/Security';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimerIcon from '@mui/icons-material/Timer';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
            <Stack spacing={{ xs: 4, md: 8 }}>
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', py: { xs: 2, md: 4 } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: 'primary.main',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        "You Belong Here"
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 500 }}>
                        수줍음이 많은 사람들을 위한 조용한 독서 공간
                    </Typography>
                    <Box sx={{
                        maxWidth: '700px',
                        mx: 'auto',
                        p: 3,
                        bgcolor: 'rgba(92, 45, 145, 0.03)',
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'primary.light',
                        opacity: 0.9
                    }}>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: 'text.primary', fontStyle: 'italic' }}>
                            {ABOUT_INTRO}
                        </Typography>
                    </Box>
                </Box>

                {/* Philosophy Section */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                        우리의 철학
                    </Typography>
                    <Grid container spacing={4}>
                        {SERVICE_PHILOSOPHY.map((phil, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Box sx={{ textAlign: 'center', px: 2 }}>
                                    <FavoriteIcon color="primary" sx={{ fontSize: 40, mb: 2, opacity: 0.8 }} />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                                        {phil.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                        {phil.content}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Features Section */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                        주요 기능
                    </Typography>
                    <Grid container spacing={3}>
                        {ABOUT_FEATURES.map((feature, index) => {
                            const IconComponent = iconMap[feature.icon];
                            return (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        bgcolor: 'background.paper',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 24px rgba(92, 45, 145, 0.08)',
                                            borderColor: 'primary.light'
                                        }
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                display: 'flex',
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: 'primary.light',
                                                color: 'primary.main',
                                                mr: 2,
                                                opacity: 0.8
                                            }}>
                                                {IconComponent && <IconComponent />}
                                            </Box>
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
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 5, textAlign: 'center' }}>
                        Quiet Chatter의 여정
                    </Typography>
                    <Stack spacing={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
                        {HISTORY_TIMELINE.map((event, index) => (
                            <Box key={index} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 4 } }}>
                                <Box sx={{ minWidth: 120, pt: { xs: 0, sm: 0.5 } }}>
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
