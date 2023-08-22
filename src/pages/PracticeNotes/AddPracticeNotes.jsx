import React from 'react';
import MainCard from '../../components/MainCard';
import {
	Box,
	Divider,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	FormControl,
	Button,
    Typography
} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import useUpload from '../../hooks/useUpload';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../../layouts/MainLayout';
import { useRef } from 'react';


const AddPracticeNotes = () => {
    const { uploadPdfFile } = useUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const { callAPI } = useFetch('POST', '/practiceNote');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/practiceNote/${location?.state?.formdata?.id}`
	);
    const myRef = useRef({ fileName: '', fileUrl: '' });
    const upload_URL_FLAG_REF = useRef(false);
	const [selectedFile, setSelected] = useState();
	console.log(location)
	const updateformValues = location?.state?.formdata;
	const newsSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		documentName: Yup.string().required('Document Name is required')
	});

	const initialValues = {
		type: location?.state?.status ? updateformValues.type : '',
		name: location?.state?.status ? updateformValues.name : '',
		documentName: location?.state?.status ? updateformValues.documentName : '',
		documentUrl: ''
	};

	const handleSubmit = async (values, { resetForm }) => {
		console.log(values);

		const uploadURL = await uploadPdfFile(
			'/files/practicenote-files',
			selectedFile
		);
		if (uploadURL.success) {
			// console.log(uploadURL)
			location?.state?.status
				? updateformAPI({
					...values,
					documentUrl: uploadURL.data.url.toString()
				})
				: callAPI({
					...values,
					documentUrl: uploadURL.data.url.toString()
				});
			// Reset the form after successful submission
			resetForm();
			navigate('/Practice-Notes-List');
		} else {
			console.log('error');
		}
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
        myRef.current.fileName = event.target.files[0].name;
		myRef.current.fileUrl = URL.createObjectURL(event.target.files[0]);
		upload_URL_FLAG_REF.current= true;
	};
    
  return (
   <>
   <SubHeader title={
				location?.state?.status
					? 'Update Practice Notes'
					: 'Add Practice Notes'} />
			<MainCard
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={newsSchema}
				>
					<Box sx={{ p: '2em 4rem 6rem 6rem'  }}>
						<Form>
							<Grid container direction="column">
								<Grid item xs={12}>
									<FormControl margin="normal" fullWidth variant="outlined">
										<InputLabel>Practice Notes</InputLabel>
										<Field as={Select} name="type" label="Notice Board">
											<MenuItem value="PRACTICE NOTES">
                                            PRACTICE NOTES
											</MenuItem>
											<MenuItem value="DOMESTIC TAXES">
                                            DOMESTIC TAXES
											</MenuItem>
											<MenuItem value="CUSTOMS & EXCISE">CUSTOMS & EXCISE</MenuItem>
										</Field>
									</FormControl>
									<ErrorMessage name="type" component={FormHelperText} />
								</Grid>

								<Grid item xs={12}>
									<Field
										as={TextField}
										name="name"
										label="Enter Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="name" component={FormHelperText} />
								</Grid>

								<Grid item xs={12}>
									<Field
										as={TextField}
										name="documentName"
										label="Enter Document Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage
										name="documentName"
										component={FormHelperText}
									/>
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
										<Button variant="outlined" component="label">
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

								<Divider sx={{ my: '1.8rem' }} />

								<Box
									sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}
								>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={!selectedFile}
									>
										{location?.state?.status ? 'Update' : 'Submit'}
									</Button>
								</Box>
							</Grid>
						</Form>
					</Box>
				</Formik>
			</MainCard>
   </>
  )
}

export default AddPracticeNotes