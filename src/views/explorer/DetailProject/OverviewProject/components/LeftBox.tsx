import { Box, Typography } from "@mui/material";
import React from "react";
import { FontInter } from "src/assets/fonts";

export default function LeftBox() {
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6">Raising Amount</Typography>
                    <Typography variant="h1" sx={{ fontFamily: FontInter.style.fontFamily, mt: 1 }}>
                        $870.975.003
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Campaign Amount</Typography>
                    <Box sx={{ display: "flex", placeItems: "end", mt: 1 }}>
                        <Typography variant="h1" fontWeight={300} color={"secondary.main"}>
                            7
                        </Typography>
                        <Typography variant="h4" fontWeight={300} color={"secondary.main"}>
                            /13
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="h6" mt={6}>
                Description
            </Typography>
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>

            <Box sx={{ border: "1px solid", borderColor: "background.primary", borderRadius: "12px", p: 3, mt: 3 }}>
                <Typography variant="h4">Problem Statement</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Typography>
            </Box>
        </Box>
    );
}
