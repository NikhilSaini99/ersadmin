import React, { useState, Link, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Box, Stack, Typography, Avatar, Paper, Grid } from '@mui/material';
import { Button } from '@mui/base';
import LoaderContainer from '../components/LoaderContainer';

export function UserFeedBacks() {
    const { data: feedbackData, loading, error,
        callAPI } = useFetch('GET', '/userFeedback')

    useEffect(() => {
        callAPI();
    }, [])


    const myBox = {
        color: "#72b8bf"
    }
    console.log(feedbackData)

    return (

        <>
            <Box sx={myBox}>
                <Typography variant='h4'>User Feedback</Typography>
                <LoaderContainer {...{ loading, error }}>
                    <Grid container spacing={2} my={5}>
                        {feedbackData?.data.map((item, index) => (
                            <FeedBackPrint key={index}
                                id={item.id}
                                name={item.name}
                                email={item.email}
                                phoneNo={item.phone_number}
                                feedbacktype={item.feedbacktype}
                                feedbackDesc={item.feedback_description}
                                createddate={item.createdAt}
                            />
                        ))}
                    </Grid>
                </LoaderContainer>
            </Box>

        </>

    );
}


const FeedBackPrint = ({ id, name, email, phoneNo, feedbacktype, feedbackDesc, createddate }) => {

    const stackStyling = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }


    const newDate = new Date(createddate).toISOString().split('T')[0]
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ border: '1px solid #72b8bf', p:{lg:'1rem',xl: '2rem'} }}>
                    <Stack sx={stackStyling} >
                        <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
                            <Box sx={stackStyling}>
                                <Avatar sx={{ backgroundColor: 'orange' }}>{name.charAt(0).toUpperCase()}</Avatar>
                                <Typography variant='body1' fontWeight='bold'>{feedbacktype.toUpperCase()}</Typography>
                            </Box>
                            <Stack sx={{ display: 'flex', gap: {xs:'0.6rem',md:'1rem',lg:'2rem'}, flexDirection: 'row' }}>
                                <Typography variant='body1'>{newDate}</Typography>
                            </Stack>
                        </Stack>    

                        <Stack sx={stackStyling}>
                            <Stack>
                                <Typography variant='body1' fontWeight='bold'>{name}</Typography>
                                <Typography variant='body1' sx={{ color: 'gray', fontSize: '1rem' }}>{email}</Typography>
                            </Stack>

                            <Typography variant='body1' fontWeight='bold'>{feedbackDesc}</Typography>

                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
        </>
    )
}