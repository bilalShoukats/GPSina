import React from 'react';
import { Box } from '@material-ui/core';

export default function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ color: '#000' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
