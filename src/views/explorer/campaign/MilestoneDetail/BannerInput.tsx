import { Box, Button, CardMedia, Typography, alpha } from '@mui/material';
import { ChangeEvent, LegacyRef, useEffect, useRef, useState } from 'react';
import Img from 'src/components/Img/Img';
import { useCreateProjectFunctions } from './state';

export default function BannerInput({ img }: { img?: string }) {
    const { setProjectData } = useCreateProjectFunctions();
    const [previewImage, setPreviewImage] = useState<string>();
    const [uploadedFile, setUploadedFile] = useState<Blob | MediaSource>();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files![0]) {
            setUploadedFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };

    const handleRemove = () => {
        setUploadedFile(undefined);
        setPreviewImage('');
    };

    useEffect(() => {
        // create the preview
        if (uploadedFile) {
            const objectUrl = URL.createObjectURL(uploadedFile);
            setPreviewImage(objectUrl);
            setProjectData({ bannerFile: uploadedFile });
            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile]);
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', aspectRatio: 978 / 260, position: 'relative', overflow: 'hidden', borderRadius: 3 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Img src={previewImage || img || ''} alt="banner project" sx={{ width: '100%', height: 'auto', aspectRatio: '370/100', borderRadius: '0px 0px 12px 12px' }} />
                <input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onImageChange} />
                <Box
                    sx={{
                        opacity: 0,
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        ':hover': { opacity: 1 },
                        backgroundColor: alpha('#001714', 0.8),
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'opacity ease-in-out 0.2s',
                    }}
                >
                    <Typography variant="h5" color="#FFFFFF" fontWeight={600}>
                        Replace Banner Image
                    </Typography>
                    <Typography variant="h4" mt={1} color="#FFFFFF" fontWeight={300}>
                        Otimal dimesions 978 x 260px{' '}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#FFFFFF',
                                ':hover': {
                                    borderColor: '#FFFFFF',
                                },
                                mr: 1,
                            }}
                            onClick={handleRemove}
                        >
                            Remove
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ color: '#FFFFFF', border: 'none', backgroundColor: '#043E35' }}
                            onClick={() => {
                                imageInputRef.current?.click();
                            }}
                        >
                            Replace image
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
