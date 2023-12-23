import { Typography } from "@mui/material";
import React from "react";
import Card from "src/components/Card/Card";
import { TCampaignData } from "src/services/campaign/api";

export default function CardCampaign({ data }: { data: TCampaignData }) {
    return (
        <Card>
            <Typography variant="h6" fontWeight={600} mb={4}>
                {data.name}
            </Typography>

            <Typography>
                <Typography component={"span"} fontWeight={600}>
                    Type:
                </Typography>{" "}
                {data.type}
            </Typography>
            <Typography>
                <Typography component={"span"} fontWeight={600}>
                    Capacity:
                </Typography>{" "}
                {data.capacity}
            </Typography>
        </Card>
    );
}
