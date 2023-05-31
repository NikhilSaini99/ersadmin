import React from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import errorImg from '../assets/images/error.jpg'

const LoaderContainer = ({ loading, error, children }) => {
    return (
        <>
            {loading ?
                (
                    <Grid container
                        spacing={2}
                        justifyContent={"center"}
                        direction={"column"}
                        alignContent={"center"} minHeight="60vh" >
                        <Grid item xs={12} >
                            <CircularProgress />
                        </Grid>
                    </Grid>
                )
                :
                (error ?
                    (<Grid container
                        spacing={2}
                        justifyContent={"center"}
                        direction={"column"}
                        alignContent={"center"} minHeight="60vh" >
                        <Grid item xs={12} >
                            <img src={errorImg} width={1000} height={1000} />
                        </Grid>
                    </Grid>
                    ) : children)
            }

        </>
    )
}

export default LoaderContainer