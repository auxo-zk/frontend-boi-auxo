import { Typography, Paper, Box, Button, TextField, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';
import { useMilestoneData, useMilestoneFunctions } from './state';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });

export default function ScopeOfWork() {
    const { setScopeOfWorks, setMilestoneData } = useMilestoneFunctions();
    const { scopeOfWorks } = useMilestoneData();

    const handleAddScopeOfWork = () => {
        const newKey = Date.now();
        setScopeOfWorks({
            [newKey]: {
                information: '',
                milestone: '',
                raisingAmount: '',
            },
        });
    };
    const handleRemoveScopeOfWork = (key: string) => {
        let tempObj = { ...scopeOfWorks };
        if (Object.keys(tempObj).length === 1) {
            return;
        }
        try {
            delete tempObj[key];
        } catch (error) {}
        setMilestoneData({ scopeOfWorks: tempObj });
    };
    return (
        <>
            {Object.entries(scopeOfWorks || {}).map(([key, item], index) => {
                return (
                    <Box key={key} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" my={2}>
                                Scope Of Work {index}
                            </Typography>
                            <IconButton onClick={() => handleRemoveScopeOfWork(key)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Box>
                        <Paper sx={{ p: 3, backgroundColor: '#FFF8F6' }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" fontWeight={600}>
                                    Information
                                </Typography>
                                <Typography variant="body1" color={'text.primary'} fontWeight={400}>
                                    Provide information to explain the second scope of work
                                </Typography>
                            </Box>
                            <CustomEditor
                                value={item.information || ''}
                                onChange={(v) =>
                                    setScopeOfWorks({
                                        [key]: {
                                            ...item,
                                            information: v,
                                        },
                                    })
                                }
                            />

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" fontWeight={600} mt={3}>
                                    Milestone
                                </Typography>
                                <Typography variant="body1" color={'text.primary'} fontWeight={400}>
                                    Specify the expected results for this scope
                                </Typography>
                            </Box>
                            <CustomEditor
                                value={item.milestone || ''}
                                onChange={(v) =>
                                    setScopeOfWorks({
                                        [key]: {
                                            ...item,
                                            milestone: v,
                                        },
                                    })
                                }
                            />
                            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                        Raising Amount
                                    </Typography>
                                    <Typography variant="body2">Specify the required</Typography>
                                </Box>
                                <Box>
                                    <TextField
                                        label="Amount"
                                        type="number"
                                        onChange={(e) =>
                                            setScopeOfWorks({
                                                [key]: {
                                                    ...item,
                                                    raisingAmount: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        onChange={(e) =>
                                            setScopeOfWorks({
                                                [key]: {
                                                    ...item,
                                                    raisingAmount: e.target.value,
                                                },
                                            })
                                        }
                                    >
                                        <DateTimePicker label="Deadline" sx={{ mr: 3 }} />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                );
            })}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleAddScopeOfWork}>
                    <AddIcon fontSize="large" sx={{ mr: 1 }} /> Add a Scope Of Work
                </Button>
            </Box>
        </>
    );
}
