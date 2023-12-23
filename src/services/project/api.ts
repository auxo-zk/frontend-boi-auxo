import axios from "axios";

export type TProjectData = { name: string; date: string; desc: string };
export const apiGetTopProject = "";
export async function getTopProject(): Promise<TProjectData[]> {
    // const response = await axios.get(apiGetTopProject)

    return [
        { name: "Watcher.Guru", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...", date: "2023/12/1" },
        { name: "Watcher.Guru", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...", date: "2023/12/1" },
        { name: "Watcher.Guru", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...", date: "2023/12/1" },
    ];
}
