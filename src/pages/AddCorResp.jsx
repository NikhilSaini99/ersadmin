import React from 'react';
import {
	Box,
	Button,
	CardActions,
	Divider,
	FormHelperText,
	TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MainCard from '../components/MainCard';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import dayjs from 'dayjs';
import useFetch from '../hooks/useFetch';

export function AddCorporateResponsibility() {
	const {callAPI} = useFetch("POST",'/csr')
	const initialValues = {
		name: '',
		description: '',
		uploadDate: null,
		url: ''
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		uploadDate: Yup.date().required('Upload Date is required'),
		url: Yup.string().required('URL is required'),
	});

	const handleSubmit = (values) => {
		// Handle form submission logic here
		callAPI(values);
	};

	return (
		<>
			<MainCard
				title="Add Corporate Responsibility "
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<Box sx={{ p: '0 2rem 2rem 2rem' }}>
						<Form>
							<Field
								as={TextField}
								name="name"
								label="Name"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter name"
							/>
							<ErrorMessage name="name">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>

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

							<Field
								as={TextField}
								name="url"
								label="URL"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter url"
							/>
							<ErrorMessage name="url">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>

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

							<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
								<Button size="large" variant="contained" type="submit">
									Save
								</Button>
							</CardActions>
						</Form>
					</Box>
				</Formik>
				<Divider />
			</MainCard>
		</>
	);
}
