import { Typography, Box } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Timeline() {
    return (
        <>
            <Typography variant="h6" mt={2} mb={4}>
                Time line
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ disay: 'flex' }}>
                    <Box className="timeline-dot" />
                    <Box className="timeline-dot" />
                    <Box className="timeline-dot" />
                </Box>
                <Box>
                    <Box className="timeline-row">
                        <Typography width={'180px'} variant="body1">
                            Application Period
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="From" sx={{ mr: 3 }} />
                            <DateTimePicker label="To" />
                        </LocalizationProvider>
                    </Box>
                    <Box className="timeline-row">
                        <Typography width={'180px'} variant="body1">
                            Application Period
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="From" sx={{ mr: 3 }} />
                            <DateTimePicker label="To" />
                        </LocalizationProvider>
                    </Box>
                    <Box className="timeline-row">
                        <Typography width={'180px'} variant="body1">
                            Application Period
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label="From" sx={{ mr: 3 }} />
                            <DateTimePicker label="To" />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
