import {
	Button,
	CardActions,
	Divider,
	Grid,
	TextField,
	Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import TextEditor from '../components/TextEditor';
import UploadImage from '../components/UploadImage';
import useFetch from '../hooks/useFetch';
import useFile from '../hooks/useFile';


const newsSchema = Yup.object().shape({
	news: Yup.string().required('News Name is required'),
	uploadDate: Yup.date().required('Upload Date is required')
});



export function AddNews() {
	const MuiTextField = ({ field, form, ...props }) => {
		return <TextField  {...field} {...props} />;
	};

	const { UploadFile } = useFile();
	const [text, setText] = useState('');
	const [images, setImages] = useState([]);
	const { loading, data, error, callAPI } = useFetch('POST', '/news-images');
	const [htmlData, setHtmlData] = useState({});

	function gettingHtmlData(recvHtml) {
		setHtmlData({ body: recvHtml })
	}
	
	return (
		<Formik
			initialValues={{
				news: '',
				uploadDate: '',
				
			}}
			validationSchema={newsSchema}
			// onSubmit={(values, { resetForm }) => {
			// 	createNews(values);
			// 	resetForm();
			// 	setText('');
			// 	setImages([]);
			// }}
			onSubmit={(values, { resetForm }) => {
				resetForm();
				console.log({...values,htmlData})
			}}
		>
			{({
				errors,
				values,
				handleReset,
				handleChange,
				handleBlur,
				setFieldValue,
				isSubmitting
			}) => (
				<Form>
					<MainCard
						title="Add News"
						border={false}
						elevation={16}
						content={false}
						boxShadow
					>
						<Grid container spacing={2} padding={4}>
							<Grid item xs={6} md={6}>
								<Field
									fullWidth
									component={MuiTextField}
									label="News Name"
									id="fullWidth"
									name="news"
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.news)}
									helperText={errors.news}
								></Field>
							</Grid>

							<Grid item xs={6} md={6}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										slotProps={{ textField: { fullWidth: true } }}
										fullWidth
										value={values.uploadDate}
										error={Boolean(errors.uploadDate)}
										name="uploadDate"
										onChange={(val) =>
											setFieldValue('uploadDate', dayjs(val).toISOString())
										}
										helperText={errors.uploadDate}
										label="Upload Date"
										defaultValue={dayjs()}
									/>
								</LocalizationProvider>
							</Grid>

							<Grid item xs={12} style={{ height: 'auto', overflowY: 'auto' }}>
								{/* <TextField fullWidth label="Description" id="fullWidth" helperText="Please enter Description" /> */}
								<TextEditor {...{ text, setText }} gettingHtmlData={gettingHtmlData} />
								{!text && (
									<Typography variant="body2" className="text-red-500">
										{errors.description}
									</Typography>
								)}
							</Grid>

							<Grid item xs={12} sx={{ mt: 6 }} textAlign={'center'}>
								<UploadImage maxImg={4} {...{ images, setImages }} />
							</Grid>
						</Grid>

						<Divider />

						<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
							<Button
								size="large"
								// disabled={(images.length == 4 ? false : true) || isSubmitting}
								type="submit"
								variant="contained"
							// fullWidth
							>
								Save
							</Button>
						</CardActions>
					</MainCard>
				</Form>
			)}
		</Formik>
	);

	async function createNews(values) {
		const result = await UploadFile('/files/news-image', images);
		if (result.success)
			callAPI({
				newsName: values.news,
				...values,
				description: text,
				url: result.data.urls.toString()
			});
	}
}
