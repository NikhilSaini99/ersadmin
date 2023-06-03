import { Box, Button, CardActions, Divider, Grid, Paper, TextField } from '@mui/material'
import React from 'react'
import MainCard from '../components/MainCard'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const AddMyWhatsNews = () => {
    const {callAPI} = useFetch('POST', '/whateNew')

    const navigate = useNavigate();
   

    const formik = useFormik({
        initialValues:{
            name:'',
            description:'',
            documentName:'',
            documentUrl:''
        },
        onSubmit:addMyNews
    })


    function addMyNews(){
        console.log(formik.values);
        callAPI(formik.values)
        navigate('/MyWhatsNew')
        formik.handleReset();
    }

    return (
        <>
            <MainCard
                title="Add What New"
                border={false}
                elevation={16}
                content={false}
                boxShadow
            >
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction="column" spacing={2} padding={4}>
                
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            id="fullWidth"
                            name='name'
                            helperText="Please enter name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            id="fullWidth"
                            name='description'
                            helperText="Please enter Description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Document Name"
                            id="fullWidth"
                            name='documentName'
                            helperText="Please enter Document Name"
                            onChange={formik.handleChange}
                            value={formik.values.documentName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Document Url"
                            id="fullWidth"
                            name='documentUrl'
                            helperText="Please enter Document URL"
                            onChange={formik.handleChange}
                            value={formik.values.documentUrl}
                        />
                    </Grid>
                    <Divider sx={{p:2}}/>
                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                        <Button type="submit" size="large" variant="contained" fullWidth>
                            Save
                        </Button>
                    </CardActions>
                </Grid>
                </form>
            </MainCard>

        </>
    )
}

export default AddMyWhatsNews
