import { Button, CardActions, Divider, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import UploadImage from '../components/UploadImage';
import useFetch from '../hooks/useFetch';
import useFile from '../hooks/useFile';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../layouts/MainLayout';


export function AddBanner() {
	const { UploadFile } = useFile();
	const { callAPI } = useFetch('POST', '/banner-images');

	const navigate = useNavigate();

	const [images, setImages] = useState([]);

	const formik = useFormik({
		initialValues: {
			imageName: '',
			link: '',
			description: '',
			uploadDate: dayjs('2022-04-17')
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: Yup.object().shape({
			imageName: Yup.string().required(`Image name is required`),
			link: Yup.string().required(`Link is required`),
			description: Yup.string().required(`Description  is required`),
			uploadDate: Yup.string().required(`Upload date is required`)
		}),
		onSubmit: createBanner
	});

	return (
		<>
		<SubHeader title={'Add Banner'} />
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
							label="Image Name"
							id="fullWidth"
							// required
							name="imageName"
							error={Boolean(formik.errors.imageName)}
							helperText={formik.errors.imageName}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.imageName}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Link"
							id="fullWidth"
							// required
							name="link"
							error={Boolean(formik.errors.link)}
							helperText={formik.errors.link}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.link}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Description"
							id="fullWidth"
							name="description"
							// required
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
						<UploadImage maxImg={1} {...{ images, setImages }} />
					</Grid>
				</Grid>

				<Divider />

				<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
					<Button
						size="large"
						variant="contained"
						type="submit"
						disabled={
							(images.length == 1 ? false : true) || formik.isSubmitting
						}
					>
						Save
					</Button>
				</CardActions>
			</form>
		</MainCard>
		</>
	);
	async function createBanner(values) {
		const result = await UploadFile('/files/banner-image', images);
		console.log(result);
		if (result.success) {
			callAPI({
				...values,
				imageurl: result.data.url.toString()
			});
			formik.handleReset();
			navigate('/banner')
		}
	}
}
