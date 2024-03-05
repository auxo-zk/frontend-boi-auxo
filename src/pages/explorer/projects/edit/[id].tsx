import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getDraftProjectDetail } from 'src/services/project/api';
import { useCreateProjectFunctions } from 'src/views/explorer/project/CreateProject/state';

const CreateProject = dynamic(() => import('src/views/explorer/project/CreateProject'), { ssr: false });

export default function EditProjectPage() {
    const router = useRouter();
    const draftId = router.query.id;
    console.log('🚀 ~ EditProjectPage ~ draftId:', draftId);
    useEffect(() => {
        const fetchDraft = async () => {
            if (draftId) {
                try {
                    const draftData = await getDraftProjectDetail(String(draftId));
                    setProjectData(draftData || {});
                } catch (error) {}
            }
        };
        fetchDraft();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draftId]);
    const { setProjectData } = useCreateProjectFunctions();
    return <CreateProject />;
}
