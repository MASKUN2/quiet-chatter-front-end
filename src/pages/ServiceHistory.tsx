import React from 'react';
import { Typography, Paper, Box, Stack, useTheme, useMediaQuery, Divider } from '@mui/material';
import { HISTORY_INTRO, HISTORY_TIMELINE } from '../constants/history';
import CircleIcon from '@mui/icons-material/Circle';

const ServiceHistory: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper elevation={isMobile ? 0 : 1} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
            <Stack spacing={{ xs: 2, md: 4 }}> {/* This stack manages spacing between intro, divider, and timeline */}
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    서비스 연혁
                </Typography>

                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: 'text.secondary' }}>
                    {HISTORY_INTRO}
                </Typography>

                <Divider />

                <Stack spacing={4}>
                    {HISTORY_TIMELINE.map((event, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 4 } }}>
                            {/* Date Side */}
                            <Box sx={{ minWidth: 120, pt: { xs: 0, sm: 0.5 }, pb: { xs: 1, sm: 0 } }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {event.date}
                                </Typography>
                            </Box>

                            {/* Content Side with Timeline Dot */}
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
            </Stack>
        </Paper>
    );
};

export default ServiceHistory;
