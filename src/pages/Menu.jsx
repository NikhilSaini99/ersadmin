
import { Box, Typography,Button, Grid, Paper } from '@mui/material';
import React from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import LoaderContainer from '../components/LoaderContainer';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';

export function Menu() {

    const { loading, error, data: newsData,
        callAPI } = useFetch('GET', '/menuService')

    useEffect(() => {
        callAPI();
    }, [])



    const myBox = {
        display: 'flex',
        justifyContent: 'space-between',
        color: "#72b8bf"
    }

    return (

        <>
         <Box sx={myBox}>
                <Typography variant='h4'>Menu List</Typography>
                <Link to="/AddMenu"> 
                <Button
					variant="contained"
					size="large"
					sx={{ fontWeight: 600, py: 2 }}
					startIcon={<BiAddToQueue size={25} />}
				>
					{' '}
					Add Menu Items
				</Button>
                </Link>
            </Box>

            <LoaderContainer {...{ loading, error }}>
            <Grid container spacing={2} mt={2}>
                {newsData?.data?.map((item,key) => (
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
const AllMenuList = ({ names, subMenu, refresh, id })=>{
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

    return(
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