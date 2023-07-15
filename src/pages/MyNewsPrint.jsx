import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { Box, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material';
import { Button } from '@mui/base';

const MyNewsPrint = ({ names, description, docName, docURL, refresh, id }) => {

    const myBox = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: "#72b8bf",
        gap: '1rem',
        padding: '2rem',
        height: '280px', // Specify the desired height

    }


    const { loading, data, error, callAPI } = useFetch('DELETE', `/whateNew/${id}`);

    
    useEffect(() => {
        if (data?.success) refresh();
    }, [data])

    function handleDelete() {
        callAPI();
    }


    return (
        <>
            <Grid item xs={3}>
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
                        <Box>
                            <Button variant="contained" onClick={handleDelete}>Delete</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </>
    );

}

export default MyNewsPrint
