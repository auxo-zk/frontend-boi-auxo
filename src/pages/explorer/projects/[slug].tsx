import { ChevronLeft } from "@mui/icons-material";
import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ButtonGroup from "src/components/ButtonGroup/ButtonGroup";
import Img from "src/components/Img/Img";
import OverviewProject from "src/views/explorer/DetailProject/OverviewProject/OverviewProject";

export default function DetailProject() {
    return (
        <Container sx={{ pb: 5 }}>
            <Img
                src="https://bitnews.sgp1.digitaloceanspaces.com/uploads/admin/R4LE00ioowv4m5dB_1690012540.jpg"
                alt="banner project"
                sx={{ width: "100%", height: "auto", aspectRatio: "370/100", borderRadius: "0px 0px 12px 12px" }}
            />
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/projects" style={{ textDecoration: "none", color: "unset" }}>
                    <Box sx={{ display: "flex", placeItems: "center" }}>
                        <ChevronLeft color="primary" sx={{ fontSize: "24px" }} />
                        <Typography color={"primary.main"}>All Projects</Typography>
                    </Box>
                </Link>
                <Link color="inherit" href="#" style={{ textDecoration: "none", color: "unset" }}>
                    <Typography color={"primary.main"} fontWeight={600}>
                        Project Name
                    </Typography>
                </Link>
            </Breadcrumbs>

            <Box sx={{ position: "sticky", top: "64px", bgcolor: "background.default", pb: 2 }}>
                <Box sx={{ display: "flex", placeItems: "center", gap: 1, mt: 2 }}>
                    <Img src="https://pbs.twimg.com/profile_images/1732964434363248640/UtVeR8Io_200x200.jpg" alt="avatar project" sx={{ width: "66px", height: "66px", borderRadius: "50%" }}></Img>
                    <Box sx={{ display: "flex", placeItems: "baseline", gap: 1 }}>
                        <Typography variant="h3">HC Capital</Typography>
                        <Typography variant="body2">Joined 24/12/2023</Typography>
                    </Box>
                </Box>
                <ButtonGroup sx={{ mt: 3 }} options={["Overview", "Fundraising"]} selected={0} changeSelected={(val) => {}} fullWidth={true} />
            </Box>

            <OverviewProject />
        </Container>
    );
}
