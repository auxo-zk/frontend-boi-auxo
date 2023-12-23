import { SaveAltRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { IconDownload, IconFolder } from "src/assets/svg/icon";

export default function RightBox() {
    return (
        <Box sx={{ borderRadius: "12px", bgcolor: "background.secondary", p: { xs: 2, xsm: 3 }, width: "390px" }}>
            <Box sx={{ display: "flex", placeItems: "baseline", justifyContent: "space-between" }}>
                <Typography variant="h6">Documents</Typography>
                <Box sx={{ display: "flex", placeItems: "end", gap: 0.5 }}>
                    <Typography variant="body3" color={"primary.main"}>
                        Download All
                    </Typography>
                    <IconFolder fontSize="small" color={"primary"} />
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", placeItems: "center", pt: 3 }}>
                <Typography variant="body2" color={"primary.light"}>
                    FileName.pdf
                </Typography>
                <SaveAltRounded sx={{ color: "primary.light" }} fontSize="small" />
            </Box>
        </Box>
    );
}
