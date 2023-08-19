import { Box, Typography, Button,Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import LoaderContainer from '../components/LoaderContainer'
import MyNewsPrint from './MyNewsPrint'
import { BiAddToQueue } from 'react-icons/bi'
import { SubHeader } from '../layouts/MainLayout';


const MyWhatsNew = () => {

    const { loading, error, data: newsData,
        callAPI } = useFetch('GET', '/whateNew')

    useEffect(() => {
        callAPI();
    }, [])

    const myBox = {
        display: 'flex',
		justifyContent: 'flex-end',
		color: '#72b8bf',
		pb:"1rem",
        mt:"1rem",
        mr:"2rem"
    }


    return (
        <>
        	<SubHeader title={'Whats New'} />
            
            <LoaderContainer {...{ loading, error }}>
            <Box sx={myBox}>
                <Link to="/AddMyWhatsNews"> 
                <Button
					variant="contained"
					size="large"
					sx={{ fontWeight: 600, py: 1.5 }}
					startIcon={<BiAddToQueue size={25} />}
				>
					{' '}
					Add News
				</Button>
                </Link>
            </Box>
            <Grid container spacing={2} mt={1} ml={3}>
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


