import React from 'react';

export default function useDashboardState() {
    const [fetching, setFetching] = React.useState(true);
    const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

    return { fetching, selectedProjectId };
}
