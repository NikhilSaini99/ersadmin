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
	Button
} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import useUpload from '../../hooks/useUpload';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddRecentlyApproved = () => {	
	const { uploadPdfFile } = useUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const { callAPI } = useFetch('POST', '/recentlyApproved');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/recentlyApproved/${location?.state?.formdata?.id}`
	);
	const [selectedFile, setSelected] = useState();
	console.log(location)
	const updateformValues = location?.state?.formdata;
	const newsSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		documentName: Yup.string().required('Document Name is required')
	});

	const initialValues = {
		type: location?.state?.status ? updateformValues.type : '',
		name:  location?.state?.status ? updateformValues.name : '',
		documentName:  location?.state?.status ? updateformValues.documentName : '',
		description:  location?.state?.status ? updateformValues.description : '',
		documentUrl: ''
	};

	const handleSubmit = async (values, { resetForm }) => {
		console.log(values);

		const uploadURL = await uploadPdfFile(
			'/files/recentapproved-files',
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
			navigate('/Recently-Approved-List');
		} else {
			console.log('error');
		}
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
	};
	return (
		<>
			<MainCard
				title={
					location?.state?.status
						? 'Update Recently Approved'
						: 'Add Recently Approved'
				}
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
					<Box sx={{ p: '0 2rem 2rem 2rem' }}>
						<Form>
							<Grid container direction="column">
								<Grid item xs={12}>
									<FormControl margin="normal" fullWidth variant="outlined">
										<InputLabel>Recently Approved</InputLabel>
										<Field as={Select} name="type" label="Notice Board">
											<MenuItem value="Approved Guidelines">
												Approved Guidelines
											</MenuItem>
											<MenuItem value="Approved Practice Notes">
												Approved Practice Notes
											</MenuItem>
											<MenuItem value="Recently Approved Forms">
												Recently Approved Forms
											</MenuItem>
											<MenuItem value="Publications">Publications</MenuItem>
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
										name="description"
										label="Enter Description"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="description" component={FormHelperText} />
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
									<Button
										variant="outlined"
										component="label"
										sx={{ mt: '1.5rem' }}
									>
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
	);
};

export default AddRecentlyApproved;
