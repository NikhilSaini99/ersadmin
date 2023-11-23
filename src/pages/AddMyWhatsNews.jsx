import { Box, Button, CardActions, Divider, FormHelperText, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import MainCard from '../components/MainCard'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import useUpload from '../hooks/useUpload';
import { useLocation } from 'react-router-dom';
import { RequestLoader } from '../components/Spinner';


const AddMyWhatsNews = () => {
    const { uploadPdfFile } = useUpload();
    const { callAPI } = useFetch('POST', '/whateNew')
    const location = useLocation();
    const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/tender/${location?.state?.formdata?.id}`
	);
    const navigate = useNavigate();

    const myRef = useRef({ fileName: '', fileUrl: '' });
	const upload_URL_FLAG_REF = useRef(false);
	const [selectedFile, setSelected] = useState();
    const [loading , setLoading] = useState();
    const updateformValues = location?.state?.formdata;

    const whatsNewsSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().max(500, "Maximum 500 characters are allowed").required('Description is required'),
		documentName: Yup.string().required('Document Name is required'),
	});

    const formik = useFormik({
        initialValues: {
            name: location?.state?.status ? updateformValues.name : '',
            description: location?.state?.status ? updateformValues.description : '',
            documentName: location?.state?.status ? updateformValues.documentName : '',
            documentUrl: location?.state?.status ? updateformValues.documentUrl : null
        },
        onSubmit: addMyNews,
        validationSchema: whatsNewsSchema,
    })

    const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
		myRef.current.fileName = event.target.files[0].name;
		myRef.current.fileUrl = URL.createObjectURL(event.target.files[0]);
		upload_URL_FLAG_REF.current= true;
	};


  async function addMyNews() {

     try  
       { setLoading(true);
         const updatepdfURL = !upload_URL_FLAG_REF.current ? updateformValues?.documentUrl: await uploadPdfFile(
			'/files/whats-new-files',
			selectedFile
		);
        if (updatepdfURL.success || updateformValues.documentUrl) {
			location?.state?.status
				? updateformAPI({
                            ...formik.values,
							documentUrl:  upload_URL_FLAG_REF.current ? updatepdfURL.data.url.toString() : updateformValues?.documentUrl
					}) : callAPI({
						...formik.values,
						documentUrl: updatepdfURL.data.url.toString()
				});
			// Reset the form after successful submission
            formik.handleReset();
            navigate('/MyWhatsNew');
		} else {
			console.log('submit error');
		}}catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <>
            <SubHeader title={location?.state?.status ? 'Update Whats News' : 'Add Whats News'} />
            <MainCard
                border={false}
                elevation={16}
                content={false}
                boxShadow
            >
                <Box sx={{ p: '1em 3rem 3rem 3rem' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container direction="column" spacing={2} padding={4}>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Enter Name"
                                    id="fullWidth"
                                    name='name'
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                   error={!!formik.errors.name}
                                />
                                         <FormHelperText style={{ color: 'red' }}>
                                             {formik.errors.name}
                                         </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Enter Description"
                                    id="fullWidth"
                                    name='description'
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    error={!!formik.errors.description}
                                />
                                 <FormHelperText style={{ color: 'red' }}>
                                             {formik.errors.description}
                                         </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Enter Document Name"
                                    id="fullWidth"
                                    name='documentName'
                            
                                    onChange={formik.handleChange}
                                    value={formik.values.documentName}
                                    error={!!formik.errors.documentName}
                                />
                                 <FormHelperText style={{ color: 'red' }}>
                                             {formik.errors.documentName}
                                         </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
									<Box
										sx={{
											display: 'flex',
											gap: '0.5rem',
											flexDirection: { xs: 'column', sm: 'row' },
											alignItems: 'center'
										}}
									>
										<Button variant="outlined" component="label" disabled={loading}>
											<AiOutlineCloudUpload size={30} className="mr-2" />
											Upload File
											<input
												type="file"
												hidden
												name="file"
												onChange={handleChange}
												accept=".*pdf"
											/>
										</Button>

										<Typography
											variant="body1"
											component="a"
											href={myRef.current.fileUrl}
											target="_blank"
										>
											{myRef.current.fileName}
										</Typography>
									</Box>
								</Grid>
                            <Divider sx={{ p: 2 }} />

                            <Box
									sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}
								>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={
											(location?.state?.status
												? false
												: !selectedFile
												? true
												: false) || loading
										}
									>
									{loading ? <RequestLoader/>	: location?.state?.status ? 'Update' : 'Submit'}
									</Button>
								</Box>
                        </Grid>
                    </form>
                </Box>
            </MainCard>

        </>
    )
}

export default AddMyWhatsNews
