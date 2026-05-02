import React from 'react';
import type { ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useToastStore } from '../store/useToastStore';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { open, message, severity, hideToast } = useToastStore();

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        hideToast();
    };

    return (
        <>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
