import React, { useEffect } from 'react';
import MainCard from '../../components/MainCard';
import {
	Box,
	Divider,
	FormHelperText,
	Grid,
	TextField,
	Button
} from '@mui/material';
import dayjs from 'dayjs';
import useFetch from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import useUpload from '../../hooks/useUpload';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddTender = () => {
	const { uploadPdfFile } = useUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const { callAPI } = useFetch('POST', '/tender');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/tender/${location?.state?.formdata?.id}`
	);
	const [selectedFile, setSelected] = useState();
	console.log(location?.state?.status);

	const updateformValues = location?.state?.formdata;

	const newsSchema = Yup.object().shape({
		tenderName: Yup.string().required('Name is required'),
		reference: Yup.string().required('Reference is required'),
		deadline: Yup.date().required('Upload Date is required'),
		publishedDate: Yup.date().required('Published Date is required')
	});

	const deadline = updateformValues?.deadline.split('T')[0];
	const publishedDate = updateformValues?.publishedDate.split('T')[0];

	const initialValues = {
		tenderName: location?.state?.status ? updateformValues.tenderName : '',
		deadline: location?.state?.status ? dayjs(deadline) : null,
		publishedDate: location?.state?.status ? dayjs(publishedDate) : null,
		reference: location?.state?.status ? updateformValues.reference : '',
		documentUrl: ''
	};

	const handleSubmit = async (values, { resetForm }) => {
		console.log(values);

		const uploadURL = await uploadPdfFile(
			'/files/publication-files',
			selectedFile
		);
		console.log(uploadURL)
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
			navigate('/Tender-List');
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
					location?.state?.status ? 'Update Tender Data' : 'Add Tender Data'
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
									<Field
										as={TextField}
										name="tenderName"
										label="Enter Tender Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="tenderName" component={FormHelperText} />
								</Grid>

								<Grid item xs={12} mb={1.5}>
									<Field name="publishedDate">
										{({ field }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker
													{...field}
													label="Published Date"
													inputFormat="MM/dd/yyyy"
													slotProps={{ textField: { fullWidth: true } }}
													value={field.value || null}
													defaultValue={dayjs()}
													onChange={(value) => {
														const event = {
															target: {
																name: 'publishedDate',
																value: dayjs(value).toISOString()
															}
														};
														field.onChange(event);
													}}
												/>
											</LocalizationProvider>
										)}
									</Field>
									<ErrorMessage name="publishedDate">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>

								<Grid item xs={12}>
									<Field name="deadline">
										{({ field }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker
													{...field}
													label="Deadline Date"
													inputFormat="MM/dd/yyyy"
													slotProps={{ textField: { fullWidth: true } }}
													value={field.value || null}
													defaultValue={dayjs()}
													onChange={(value) => {
														const event = {
															target: {
																name: 'deadline',
																value: dayjs(value).toISOString()
															}
														};
														field.onChange(event);
													}}
												/>
											</LocalizationProvider>
										)}
									</Field>
									<ErrorMessage name="deadline">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>

								<Grid item xs={12}>
									<Field
										as={TextField}
										name="reference"
										label="Enter Reference"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="reference" component={FormHelperText} />
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

export default AddTender;
