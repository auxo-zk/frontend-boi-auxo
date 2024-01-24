import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Container, Paper, Switch, TextField, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });
import { useCreateProjectData, useCreateProjectFunctions } from './state';
import TeamMember from './TeamMembers';
import AdditionalDoc from './AdditionalDoc';
import { useEffect, useState } from 'react';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { useRouter } from 'next/router';
import BannerInput from './BannerInput';
import { imagePath } from 'src/constants/imagePath';
import Link from 'next/link';
import Avatar from 'src/components/Avatar/Avatar';

export default function CreateProject() {
    const { overViewDescription, challengeAndRisk, problemStatement, solution, name, publicKey } = useCreateProjectData();
    const { setProjectData, handleCreateProject, handleSubmitProject } = useCreateProjectFunctions();
    const [loading, setLoading] = useState<boolean>(false);
    const [submiting, setSubmiting] = useState<boolean>(false);
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string>();
    const [uploadedFile, setUploadedFile] = useState<File>();
    const handleSaveButton = async () => {
        try {
            setLoading(true);
            await handleCreateProject();
            setLoading(false);
            router.push('/profile');
        } catch (error) {
            setLoading(false);
        }
    };

    const handleSubmitClick = async () => {
        setSubmiting(true);
        await handleSubmitProject();
        setSubmiting(false);
    };
    return (
        <Container
            sx={(theme) => ({
                pb: 5,
                '& .timeline-row': {
                    display: 'flex',
                    alignItems: 'center',
                    my: 4,
                },
                '& .timeline-dot': { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'background.primary', border: '2px solid ' + theme.palette.primary.light, mr: 1.5 },
            })}
        >
            <Box sx={{ position: 'relative', mb: 9 }}>
                <BannerInput img={imagePath.DEFAULT_BANNER.src} />
                <Box sx={{ position: 'absolute', left: '20px', bottom: '-50px', backgroundColor: '#041315', borderRadius: '50%', border: '4px solid #FFFFFF' }}>
                    <Avatar
                        size={100}
                        onChange={(files) => {
                            setProjectData({ avatarFile: files![0] });
                            setUploadedFile(files![0]);
                        }}
                    />
                </Box>
            </Box>
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/profile" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>Builder Profile</Typography>
                    </Box>
                </Link>
                <Typography color={'primary.main'} fontWeight={600}>
                    {"Project's Information Editor"}
                </Typography>
            </Breadcrumbs>
            <Typography variant="h1">{"Project's Information Editor"}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
                <TextField
                    fullWidth
                    label="Project's name"
                    type="text"
                    name="project_name"
                    sx={{ mr: 3 }}
                    value={name}
                    onChange={(e) => {
                        setProjectData({ name: e.target.value });
                    }}
                />
                <TextField
                    fullWidth
                    label="Public key"
                    type="text"
                    name="project_name"
                    sx={{ ml: 3 }}
                    value={publicKey}
                    onChange={(e) => {
                        setProjectData({ publicKey: e.target.value });
                    }}
                />
            </Box>
            <Typography variant="h6" mt={6} mb={1}>
                Overview description
            </Typography>
            <CustomEditor
                value={overViewDescription}
                onChange={(v: string) => {
                    setProjectData({ overViewDescription: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Problem Statement*
            </Typography>
            <CustomEditor
                value={problemStatement}
                onChange={(v: string) => {
                    setProjectData({ problemStatement: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Solution*
            </Typography>
            <CustomEditor
                value={solution}
                onChange={(v: string) => {
                    setProjectData({ solution: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Challenges & Risks*
            </Typography>
            <CustomEditor
                value={challengeAndRisk}
                onChange={(v: string) => {
                    setProjectData({ challengeAndRisk: v });
                }}
            />
            {/* <ApplicationForm /> */}
            <Box sx={{ mt: 5 }}>
                <TeamMember />
            </Box>
            <Box sx={{ mt: 5 }}>
                <AdditionalDoc />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ButtonLoading muiProps={{ variant: 'contained', onClick: handleSaveButton, sx: { mr: 1 } }} isLoading={loading}>
                    Save
                </ButtonLoading>
                <ButtonLoading isLoading={submiting} muiProps={{ variant: 'contained', onClick: handleSubmitClick }}>
                    Submit
                </ButtonLoading>
            </Box>
        </Container>
    );
}
