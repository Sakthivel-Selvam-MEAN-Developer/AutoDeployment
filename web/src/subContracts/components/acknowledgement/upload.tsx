import React, { ChangeEvent } from 'react'
import { Button, Box, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { VisuallyHiddenInput, trip } from '../../types/acknowledgementTypes'
const ImageUpload: React.FC<trip> = ({ selectedFile, setSelectedFile }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (event.target.files[0].size < 2 * 1024 * 1024) {
                setSelectedFile(event.target.files[0])
            } else {
                return alert('File size should not exceed 2MB')
            }
        }
    }
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
                gap: 2,
                padding: 2
            }}
        >
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Typography>{selectedFile ? selectedFile.name : ''}</Typography>
        </Box>
    )
}
export default ImageUpload
