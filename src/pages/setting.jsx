import React, { useState, Link } from 'react';
import { Card, CardHeader } from "@mui/material";
import DashBoard from "../components/DashBoard"
import MainCard from "../components/MainCard";
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Container, } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const socialMediaFields = [
    { name: 'Facebook', id: 'facebook' },
    { name: 'Instagram', id: 'instagram' },
    { name: 'LinkedIn', id: 'linkedin' },
    { name: 'YouTube', id: 'youtube' },
    { name: 'Twitter', id: 'twitter' },
    { name: 'Gmail', id: 'gmail' },
];

export function Setting() {

    const [formData, setFormData] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleCancelEditMode = (id) => {
        setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: false }));
    };


    return (
        <>
            <MainCard title="Social Media" border={false} elevation={16} content={false} boxShadow >

                <Grid container direction="column" spacing={2} padding={4} >
                    {socialMediaFields.map((field) => (
                        <Grid xs={12} key={field.id} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                            <TextField
                                id={field.id}
                                label={field.id}
                                value={formData[field.id] || ''}
                                required
                                variant="outlined"
                                size="medium"
                                fullWidth
                                helperText={`Please Enter your ${field.id}`}
                            />
                        </Grid>
                    ))}





                </Grid>

                <Divider />

                <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="large" variant='contained' >
                        Save
                    </Button>
                </CardActions>

            </MainCard>

            <MainCard title="Opening Time" sx={{ marginTop: "20px" }} border={false} elevation={16} content={false} boxShadow >
                <Grid container direction="column" spacing={2} padding={4} >

                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            id="Mon-Fri"
                            label="Monday - Friday"
                            required
                            variant="outlined"
                            size="medium"
                            fullWidth
                            helperText="opening hours(Mon-Fri)"
                        />
                    </Grid>
                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            id="Sat-Sun"
                            label="Saturday - Sunday"
                            required
                            variant="outlined"
                            size="medium"
                            fullWidth
                            helperText="opening hours(Sat-Sun)"
                        />
                    </Grid>
                </Grid>

                <Divider />
                <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="large" variant='contained'  >
                        Save
                    </Button>
                </CardActions>

            </MainCard>


            <MainCard title="Contact Details" sx={{ marginTop: "20px" }} border={false} elevation={16} content={false} boxShadow >

                <Grid container direction="column" spacing={2} padding={4} >

                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            label="Address"
                            required
                            variant='outlined'
                            size='medium'
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            label="Email"
                            required
                            variant='outlined'
                            size='medium'
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            label="Contact-1"
                            required
                            variant="outlined"
                            size="medium"
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={12} sx={{ display: "", marginBottom: "16px" }} alignItems="center">
                        <TextField
                            label="Contact-2"
                            required
                            variant="outlined"
                            size="medium"
                            fullWidth
                        />
                    </Grid>

                </Grid>

                <Divider />

                <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="large" variant='contained'  >
                        Save
                    </Button>
                </CardActions>

            </MainCard>
        </>
    );
}

