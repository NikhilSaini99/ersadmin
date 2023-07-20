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
import {
	TextField,
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	Box,
	Divider,
	Grid
} from '@mui/material';
import useFetch from '../hooks/useFetch';

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
	const { callAPI } = useFetch('POST', '/form');
	const [selectedFile, setSelected] = useState();

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
	};

	const initialValues = {
		formName: '',
		category: '',
		fileSize: '',
		fileType: '',
		description: '',
		fileUrl: '',
		uploadDate: null
	};

	const categories = ['Category 1', 'Category 2', 'Category 3'];

	const handleSubmit = async (values,{resetForm}) => {
		// Handle form submission logic here
		// const file = URL.createObjectURL(selectedFile).toString();
		// console.log(selectedFile);

		const uploadURL = await uploadPdfFile('/files/form-files', selectedFile);
		if (uploadURL.success) {
			// console.log(uploadURL)
			callAPI({
				...values,
				fileUrl: uploadURL.data.url.toString(),
				fileSize: uploadURL.data.size.toString()
			});
			// Reset the form after successful submission
			resetForm();
		} else {
			console.log('error');
		}
	};
	return (
		<>
			<MainCard
				title="Add Form Data"
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
									<Field
										as={TextField}
										name="formName"
										label="Form Name"
										fullWidth
										variant="outlined"
										margin="normal"
										helperText="Enter form name"
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
										<FormHelperText>Select category</FormHelperText>
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
										helperText="Enter description"
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
								<Grid item xs={12}>
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
							</Grid>
							<Divider />

							<Box sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}>
								<Button type="submit" variant="contained" color="primary">
									Submit
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
