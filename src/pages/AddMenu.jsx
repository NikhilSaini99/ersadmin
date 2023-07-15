import React from 'react'
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import MainCard from '../components/MainCard';
import { Button, CardActions, Divider, Grid, TextField } from '@mui/material';

const AddMenu = () => {
    const { callAPI } = useFetch('POST', '/menuService')

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            menuId: '',
            menuName: '',
            subMenuName: '',
        },
        onSubmit: addMyNews
    })


    function addMyNews() {
        console.log(formik.values);
        callAPI(formik.values)
        navigate('/Menu')
        formik.handleReset();
    }
    return (
        <>
            <MainCard
                title="Add Menu List"
                border={false}
                elevation={16}
                content={false}
                boxShadow
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" spacing={2} padding={2}>

                        <Grid item xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                label="Menu Id"
                                id="fullWidth"
                                name='menuId'
                                helperText="Please enter menu id"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Menu Name"
                                id="fullWidth"
                                name='menuName'
                                helperText="Please enter menu name"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="SubMenu Name"
                                id="fullWidth"
                                name='subMenuName'
                                helperText="Please enter sub menu name"
                                onChange={formik.handleChange}
                                value={formik.values.documentName}
                            />
                        </Grid>
                        <Divider sx={{ p: 2 }} />
                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                            <Button type="submit" size="large" variant="contained" >
                                Save
                            </Button>
                        </CardActions>
                    </Grid>
                </form>
            </MainCard>
        </>
    )
}

export default AddMenu
