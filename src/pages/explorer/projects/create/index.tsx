import dynamic from 'next/dynamic';

const CreateProject = dynamic(() => import('src/views/project/CreateProject'), { ssr: false });

export default function CreateProjectPage() {
    return <CreateProject />;
}
