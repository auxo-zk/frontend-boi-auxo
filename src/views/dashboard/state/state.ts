import { atom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { FetchStatus } from 'src/constants';
import { TCampaignData } from 'src/services/campaign/api';
import { ProjectMetaData, TProjectData, TProjectFundRaising, getFundRaisingProject, getUserProject } from 'src/services/project/api';

export type TDashboardPageData = {
    fetchProjectStatus: FetchStatus;
    listProject: ProjectMetaData[];
    selectedProject: ProjectMetaData | null;

    fetchCampaignStatus: FetchStatus;
    listCampaign: TProjectFundRaising[];
    selectedCampaign: TCampaignData | null;
};

const initData: TDashboardPageData = {
    fetchProjectStatus: FetchStatus.IDLE,
    listProject: [],
    selectedProject: null,

    fetchCampaignStatus: FetchStatus.IDLE,
    listCampaign: [],
    selectedCampaign: null,
};

const state = atom<TDashboardPageData>(initData);

export const useDashboardPageData = () => useAtomValue(state);

export const useDashboardPageFunction = () => {
    const _setData = useSetAtom(state);

    function setDashboardPageData(data: Partial<TDashboardPageData>) {
        _setData((prev) => {
            return { ...prev, ...data };
        });
    }

    async function getListProjectOptions(address: string, setStatus?: FetchStatus) {
        if (setStatus) {
            setDashboardPageData({ fetchProjectStatus: setStatus });
        }
        try {
            const response = await getUserProject(address);
            setDashboardPageData({
                fetchProjectStatus: FetchStatus.SUCCESS,
                listProject: response,
                selectedProject: null,
                fetchCampaignStatus: FetchStatus.IDLE,
                listCampaign: [],
                selectedCampaign: null,
            });
        } catch (error) {
            setDashboardPageData({ fetchProjectStatus: FetchStatus.FAILED, listProject: [], selectedProject: null, fetchCampaignStatus: FetchStatus.IDLE, listCampaign: [], selectedCampaign: null });
            console.log(error);
        }
    }

    async function getListCampaignOptions(projectId: string, setStatus?: FetchStatus) {
        if (setStatus) {
            setDashboardPageData({ fetchCampaignStatus: setStatus });
        }
        try {
            const response = await getFundRaisingProject(projectId);
            setDashboardPageData({
                fetchCampaignStatus: FetchStatus.SUCCESS,
                listCampaign: response,
                selectedCampaign: null,
            });
        } catch (error) {
            setDashboardPageData({ fetchCampaignStatus: FetchStatus.FAILED, listCampaign: [], selectedCampaign: null });
            console.log(error);
        }
    }

    return {
        setDashboardPageData,
        getListProjectOptions,
        getListCampaignOptions,
    };
};
