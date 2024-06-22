import React from 'react';
import { useDashboardPageData, useDashboardPageFunction } from '../state/state';
import { Autocomplete, TextField } from '@mui/material';
import { ExpandMoreRounded } from '@mui/icons-material';

export default function AutoCompleteSearchProject() {
    const { listProject, selectedProject } = useDashboardPageData();
    const { setDashboardPageData } = useDashboardPageFunction();
    // const options = listCommittee.map((option) => {
    //     const firstLetter = option.name[0].toUpperCase();
    //     return {
    //         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //         ...option,
    //     };
    // });

    return (
        <Autocomplete
            value={selectedProject}
            onChange={(e, value) => {
                // console.log(value);
                setDashboardPageData({ selectedProject: value ? value : null });
            }}
            options={listProject.sort((a, b) => -b.name.localeCompare(a.name))}
            // groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => `ID ${option.idProject}: ${option.name}`}
            popupIcon={<ExpandMoreRounded sx={{ color: 'secondary.main' }} />}
            sx={{ width: 300, mt: 2.5 }}
            renderInput={(params) => <TextField type="text" name="auto_complete_search_committe" {...params} label="Search project" color="secondary" />}
        />
    );
}
