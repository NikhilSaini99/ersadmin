
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import React from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import LoaderContainer from '../components/LoaderContainer';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import { SubHeader } from '../layouts/MainLayout';

export function Menu() {

    const { loading, error, data: newsData,
        callAPI } = useFetch('GET', '/menuService')

    useEffect(() => {
        callAPI();
    }, [])



    const myBox = {
        display: 'flex',
        justifyContent: 'flex-end',
        color: '#72b8bf',
        pb: "1rem",
        mt:"1rem",
        mr:"3rem"
    }

    return (

        <>
            <SubHeader title={'Menu List'} />

            <LoaderContainer {...{ loading, error }}>
            <Box sx={myBox}>
                <Link to="/AddMenu">
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ fontWeight: 600, py: 1.5 }}
                        startIcon={<BiAddToQueue size={25} />}
                    >
                        {' '}
                        Add Menu Items
                    </Button>
                </Link>
            </Box>
                <Grid container spacing={2} mt={1} ml={4}>
                    {newsData?.data?.map((item, key) => (
                        <AllMenuList
                            key={key}
                            names={item.menuName}
                            subMenu={item.sumMenuName}
                            id={item.id}
                            refresh={callAPI}
                        />

                    ))}
                </Grid>
            </LoaderContainer>

        </>

    );
}


//Printing Menu List on Menu Page
const AllMenuList = ({ names, subMenu, refresh, id }) => {
    const { loading, data, error, callAPI } = useFetch('DELETE', `/menuService/${id}`);


    useEffect(() => {
        if (data?.success) refresh();
    }, [data])

    function handleDelete() {
        callAPI();
    }

    const myBox = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: "#72b8bf",
        gap: '1rem',
        padding: '2rem',
        height: '12rem', // Specify the desired height

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
                                {subMenu}
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handleDelete}>Delete</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}