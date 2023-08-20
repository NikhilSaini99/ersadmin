import React, { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MainCard from '../components/MainCard';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import useUpload from '../hooks/useUpload';
import { SubHeader } from '../layouts/MainLayout';

import {
	TextField,
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	Box,
	Divider,
	Grid,
	Typography
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const newsSchema = Yup.object().shape({
	formName: Yup.string().required('Form Name is required'),
	category: Yup.string().required('Category is required'),
	fileSize: Yup.string().optional(),
	fileType: Yup.string().optional(),
	description: Yup.string().required('Description is required'),
	fileUrl: Yup.string().optional(),
	uploadDate: Yup.date().required('Upload Date is required')
});

const AddFormData = () => {
	const { uploadPdfFile } = useUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const myRef = useRef({ fileName: '', fileUrl: '' });
	const upload_URL_FLAG_REF = useRef(false);
	const { callAPI } = useFetch('POST', '/form');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/form/${location?.state?.formdata?.id}`
	);
	const [selectedFile, setSelected] = useState();
	const updateformValues = location?.state?.formdata;

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
		myRef.current.fileName = event.target.files[0].name;
		myRef.current.fileUrl = URL.createObjectURL(event.target.files[0]);
		upload_URL_FLAG_REF.current= true;
	};

	console.log(selectedFile)

	const uploadDate = updateformValues?.uploadDate.split('T')[0];

	const initialValues = {
		formName: location?.state?.status ? updateformValues.formName : '',
		category: location?.state?.status ? updateformValues.category : '',
		fileSize: location?.state?.status ? updateformValues.fileSize : '',
		fileType: location?.state?.status ? updateformValues.fileType : '',
		description: location?.state?.status ? updateformValues.description : '',
		fileUrl: location?.state?.status ? updateformValues.fileUrl : '',
		uploadDate: location?.state?.status ? dayjs(uploadDate) : null,
	};

	const categories = ['VAT', 'Income Tax', 'Customs & Excise'];

	const handleSubmit = async (values,{resetForm}) => {
		// Handle form submission logic here
			const updatepdfURL = !upload_URL_FLAG_REF.current ? updateformValues?.fileUrl: await uploadPdfFile(
			'/files/form-files',
			selectedFile
		);
		
		if (updatepdfURL.success || updateformValues.fileUrl) {
			location?.state?.status
				? updateformAPI({
							...values,
							fileUrl:  upload_URL_FLAG_REF.current ? updatepdfURL.data.url.toString() : updateformValues?.fileUrl,
					}) : callAPI({
						...values,
						fileUrl: updatepdfURL.data.url.toString(),
						fileSize: updatepdfURL.data.size.toString()
				});
			// Reset the form after successful submission
			resetForm();
			navigate('/List-Form-Data');
		} else {
			console.log('tender submit error');
		}
	};
	return (
		<>
		<SubHeader title="Add Form Data" />
			<MainCard
				// title="Add Form Data"
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
					<Box sx={{ p: '2rem 4rem 6rem 6rem' }}>
						<Form>
							<Grid container direction="column">
								<Grid item xs={12}>
									<Field
										as={TextField}
										name="formName"
										label="Form Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="formName">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>

								<Grid item xs={12}>
									<FormControl fullWidth variant="outlined" margin="normal">
										<InputLabel>Category</InputLabel>
										<Field as={Select} name="category" label="Category">
											{categories.map((category) => (
												<MenuItem key={category} value={category}>
													{category}
												</MenuItem>
											))}
										</Field>
										<ErrorMessage name="category">
											{(errorMsg) => (
												<FormHelperText style={{ color: 'red' }}>
													{errorMsg}
												</FormHelperText>
											)}
										</ErrorMessage>
									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<Field
										as={TextField}
										name="description"
										label="Description"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="description">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>

								{/* Use MUI Date Picker for the uploadDate field */}
								<Grid item xs={12} sx={{ mt: '1rem' }}>
									<Field name="uploadDate">
										{({ field }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker
													{...field}
													label="Upload Date"
													inputFormat="MM/dd/yyyy"
													slotProps={{ textField: { fullWidth: true } }}
													value={field.value || null}
													defaultValue={dayjs()}
													onChange={(value) => {
														const event = {
															target: {
																name: 'uploadDate',
																value: dayjs(value).toISOString()
															}
														};
														field.onChange(event);
													}}
												/>
											</LocalizationProvider>
										)}
									</Field>
									<ErrorMessage name="uploadDate">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>

								<Grid item xs={12}>
									<Box
										sx={{
											display: 'flex',
											gap: '0.5rem',
											flexDirection: { xs: 'column', sm: 'row' },
											alignItems: 'center',
											mt:"1rem",
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
							</Grid>
							<Divider sx={{ my: '1.8rem' }}/>

								<Box sx={{ textAlign: 'center' }}>
								<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={
											location?.state?.status
												? false
												: !selectedFile
												? true
												: false
										}
									>
										{location?.state?.status ? 'Update' : 'Submit'}
									</Button>
							</Box>
						</Form>
					</Box>
				</Formik>
			</MainCard>
		</>
	);
};

export default AddFormData;
