import { Box, Container, TextField, Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import React from "react";
import { imagePath } from "src/constants/imagePath";
import { getTopProject } from "src/services/project/api";
import LatestProject from "src/views/explorer/LatestProject/LatestProject";
import TopProject from "src/views/explorer/TopProject/TopProject";

export default function Projects({ topProjects }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container sx={{ py: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h1" textTransform={"uppercase"} maxWidth={"614px"}>
                        Explore project
                    </Typography>

                    <TextField label="Search..." type="text" name="search_committee" color="secondary" sx={{ mt: 3, maxWidth: "479px" }} fullWidth></TextField>
                </Box>

                <Box sx={{ display: { xs: "none", xsm: "block" } }}>
                    <Image src={imagePath.THUMBNAIL1} alt="auxo thumbnail" style={{ maxWidth: "256px", height: "auto", width: "100%" }} />
                </Box>
            </Box>

            <TopProject topProjects={topProjects} showButtonMoreProjects={false} />
            <br />
            <LatestProject latestProject={topProjects} />
        </Container>
    );
}

export const getStaticProps = (async (context) => {
    const res = await Promise.all([getTopProject()]);
    const topProjects = res[0];

    return {
        props: {
            topProjects,
        },

        revalidate: 60, // In seconds
    };
}) satisfies GetStaticProps;
