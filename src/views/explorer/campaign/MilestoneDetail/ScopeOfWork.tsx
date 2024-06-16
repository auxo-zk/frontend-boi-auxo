import { Typography, Paper, Box, Button, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';
import { useMilestoneData, useMilestoneFunctions } from './state';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { IconTrash } from 'src/assets/svg/icon';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });

export default function ScopeOfWork() {
    const { addScopeOfWork, deleteScopeOfWork, editScopeOfWork, setMilestoneData } = useMilestoneFunctions();
    const { scopeOfWorks } = useMilestoneData();

    const handleAddScopeOfWork = () => {
        addScopeOfWork({
            id: Date.now().toString(),
            information: '',
            milestone: '',
            raisingAmount: '',
            deadline: Date.now().toLocaleString(),
        });
    };

    return (
        <>
            {scopeOfWorks.map((item, index) => {
                return (
                    <Box key={item.id + index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }} my={2}>
                            <Typography variant="h6" mr={1}>
                                Scope of work {index + 1}
                            </Typography>
                            <IconButton onClick={() => deleteScopeOfWork(index)}>
                                <IconTrash />
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
                                    editScopeOfWork(index, {
                                        information: v,
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
                                    editScopeOfWork(index, {
                                        milestone: v,
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
                                            editScopeOfWork(index, {
                                                raisingAmount: e.target.value,
                                            })
                                        }
                                        InputProps={{
                                            endAdornment: 'Mina',
                                        }}
                                        sx={{ mr: 1 }}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label="Deadline"
                                            sx={{ ml: 1 }}
                                            onChange={(value: Dayjs | null, _: any) => {
                                                editScopeOfWork(index, { deadline: value?.toDate().toISOString() || '' });
                                            }}
                                        />
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
