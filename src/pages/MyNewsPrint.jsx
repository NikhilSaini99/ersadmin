import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base';
import CustomModal from '../components/Modal/Modal';
import { useState } from 'react';

const MyNewsPrint = ({ names, description, refresh, id,item }) => {
    const [OpenModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const myBox = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: "#72b8bf",
        gap: '1rem',
        padding: '1rem',
        height: '280px', // Specify the desired height
        overflow: 'auto'
    }


    const { data, callAPI } = useFetch('DELETE', `/whateNew/${id}`);

    
    useEffect(() => {
        if (data?.success) refresh();
    }, [data])

   
    function handleModal() {
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false);
	};

    function handleUpdate() {
		navigate('/AddMyWhatsNews', { state: { formdata: item, status: true } });
	}

    return (
        <>
            <Grid item xs={4}>
                <Paper elevation={20}>
                    <Box sx={myBox} >
                        <Box>
                            <Typography sx={{ fontSize: 14, color: 'black', fontWeight: 'bold' }} gutterBottom>
                                {names}
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem', lineClamp: 2 }}
                            >
                                {description}
                            </Typography>
                        </Box>
                        <Box sx={{display:"flex", gap:"1rem"}}>
                            <Button variant="contained" onClick={handleModal}>Delete</Button>
                            <Button variant="contained"  onClick={handleUpdate}>Update</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <CustomModal isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI}/>
        </>
    );

}

export default MyNewsPrint
