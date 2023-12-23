import { Typography } from "@mui/material";
import React from "react";
import Card from "src/components/Card/Card";
import { TProjectData } from "src/services/project/api";
import { formatDate } from "src/utils/format";

export default function CardProject({ data }: { data: TProjectData }) {
    return (
        <Card>
            <Typography variant="h6" fontWeight={600}>
                {data.name}
            </Typography>
            <Typography variant="body3" mb={1}>
                {formatDate(data.date, "dd MMM yyyy")}
            </Typography>

            <Typography variant="h6" color={"secondary.main"}>
                $870.975.003
            </Typography>
            <Typography variant="body3" mb={1} color={"secondary.main"}>
                $1.870.975.003
            </Typography>
            <Typography>{data.desc}</Typography>
        </Card>
    );
}
