
import { Box, Typography, Button, Paper, Card, CardContent, CardActions, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import LoaderContainer from '../components/LoaderContainer'
import MyNewsPrint from './MyNewsPrint'

const MyWhatsNew = () => {

    const { loading, error, data: newsData,
        callAPI } = useFetch('GET', '/whateNew')

    useEffect(() => {
        callAPI();
    }, [])

    // console.log(newsData?.data[0].name)

    const myBox = {
        display: 'flex',
        justifyContent: 'space-between',
        color: "#72b8bf"
    }


    return (
        <>
            <Box sx={myBox}>
                <Typography variant='h4'>Whats New</Typography>
                <Link to="/AddMyWhatsNews"> <Button variant='contained' sx={{ fontWeight: 'bold' }} >Add News </Button></Link>
            </Box>
            
            <LoaderContainer {...{ loading, error }}>
            <Grid container spacing={2} mt={2}>
                {newsData?.data?.map((item,key) => (
                    <MyNewsPrint 
                        key={key}
                        names={item.name}
                        description={item.description}
                        docName={item.documentName}
                        docURL={item.documentURL}
                        id={item.id}
                        refresh={callAPI}
                    />
                   
                ))}
                </Grid>
            </LoaderContainer>
        </>
    )
}

export default MyWhatsNew


