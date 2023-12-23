import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { TProjectData } from "src/services/project/api";
import CardProject from "./components/CardProject";

export default function TopProject({ topProjects }: { topProjects: TProjectData[] }) {
    return (
        <Box mt={5}>
            <Box sx={{ display: "flex", placeItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6">Top Project</Typography>
                <Button variant="contained">More Projects</Button>
            </Box>

            <Box mt={2.5}>
                <Grid container spacing={3.5}>
                    {topProjects.map((item, index) => {
                        return (
                            <Grid key={"topproject" + index + item.name} item xs={12} xsm={6} md={4}>
                                <CardProject data={item}></CardProject>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}
