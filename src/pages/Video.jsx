import { Button, CardActions, Divider, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';


export function Video() {
	const { callAPI } = useFetch('POST', '/videos');
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			name: '',
			url: '',
			description: '',
			uploadDate: ''
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: Yup.object().shape({
			name: Yup.string().required(` Name is required`),
			url: Yup.string().required(`Url is required`),
			description: Yup.string().required(`Description  is required`),
			uploadDate: Yup.string().required(`Upload date is required`)
		}),
		onSubmit: createVideo
	});

	return (
		<>
			<SubHeader title="Create Video"/>

			<MainCard
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<form onSubmit={formik.handleSubmit}>
					<Grid container direction="column" spacing={2} padding={6}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Video Name"
								id="fullWidth"
								name="name"
								error={Boolean(formik.errors.name)}
								helperText={formik.errors.name}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Description"
								id="fullWidth"
								name="description"
								error={Boolean(formik.errors.description)}
								helperText={formik.errors.description}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.description}
							/>
						</Grid>

						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									slotProps={{ textField: { fullWidth: true } }}
									fullWidth
									id="fullWidth"
									value={formik.uploadDate}
									error={Boolean(formik.errors.uploadDate)}
									name="uploadDate"
									// onBlur={formik.handleBlur}
									onChange={(date) =>
										formik.setFieldValue('uploadDate', dayjs(date).toISOString())
									}
									helperText={formik.errors.uploadDate}
									label="Upload Date"
								/>
							</LocalizationProvider>
						</Grid>

						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Youtube Video Link"
								id="fullWidth"
								name="url"
								error={Boolean(formik.errors.url)}
								helperText={formik.errors.url}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.url}
							/>
						</Grid>
					</Grid>

					<Divider />

					<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
						<Button
							size="large"
							variant="contained"
							type="submit"
							disabled={!formik.values.uploadDate || formik.isSubmitting}
						>
							Save
						</Button>
					</CardActions>
				</form>
			</MainCard>
		</>
	);
	async function createVideo(values) {
		if (formik.isValid)
			callAPI({
				...values, yearofupload : dayjs(values.uploadDate).format('YYYY'),
			});
		formik.handleReset();
		navigate("/Upload-Video")
	}
}
