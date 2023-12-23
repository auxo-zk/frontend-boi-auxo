import { Dashboard } from "@mui/icons-material";
import { IconCommittee, IconInvestor, IconMenuExplorer, IconOrganizer, IconUser } from "src/assets/svg/icon";

export const menu = [
    {
        icon: IconMenuExplorer,
        title: "Explorer",
        url: "/explorer",
        children: [
            { title: "Projects", url: "/explorer/projects" },
            { title: "Campaigns", url: "/explorer/campaigns" },
        ] as { title: string; url: string }[],
    },
    {
        icon: IconUser,
        title: "Profile",
        url: "/#",
        children: [] as { title: string; url: string }[],
    },
    {
        icon: Dashboard,
        title: "Dashboard",
        url: "/#",
        children: [] as { title: string; url: string }[],
    },
];
