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
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import TextEditor from '../components/TextEditor';
import UploadImage from '../components/UploadImage';
import useFetch from '../hooks/useFetch';
import useFile from '../hooks/useFile';
import { useLocation, useNavigate } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import "suneditor/dist/css/suneditor.min.css";

const newsSchema = Yup.object().shape({
	news: Yup.string().required('News Name is required'),
	uploadDate: Yup.date().required('Upload Date is required')
});



export function AddNews() {

	const location = useLocation()
	const navigate = useNavigate()

	const MuiTextField = ({ field, form, ...props }) => {
		return <TextField  {...field} {...props} />;
	};

	const { UploadFile } = useFile();
	const [text, setText] = useState('');
	const [images, setImages] = useState([]);
	const { loading, data, error, callAPI } = useFetch('POST', '/news');
	const [htmlData, setHtmlData] = useState({});
	const [htmlContent, setHtmlContent] = useState('');


	//filling my texeditor
	useEffect(() => {
		if (location.state && location.state.description)
			setHtmlContent(location.state.description)
	}, [location.state])


	function gettingHtmlData(recvHtml) {
		setHtmlData({ body: recvHtml })
	}

	const handleChange = (content) => {
		setText(content);
	};

	// console.log(location.state.description)


	return (
		<Formik
			initialValues={{
				news: '',
				uploadDate: '',

			}}
			validationSchema={newsSchema}
			onSubmit={(values, { resetForm }) => {
				createNews({ ...values, ...htmlData })
				setImages([])
				resetForm();
				console.log({...values,...htmlData})
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

								{/* <SunEditor
									setContents={htmlContent}
									onChange={handleChange}
									onBlur={handleBlur}
								/> */}

								<TextEditor {...{ text, setText }} htmlContent={htmlContent} gettingHtmlData={gettingHtmlData} />
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
								disabled={(images.length ? false : true) || isSubmitting}
								type="submit"
								variant="contained"
							>
								Save
							</Button>
						</CardActions>
					</MainCard>
				</Form>
			)}
		</Formik>
	);

	async function createNews({ news: newsName, uploadDate, body: description }) {
		// const result = await UploadFile('/files/news-image', images);
		// if (result.success)
		// 	callAPI({
		// 		newsName: values.news,
		// 		...values,
		// 		description: text,
		// 		url: result.data.urls.toString()
		// 	});

		const result = await UploadFile('/files/news-image', images);
		console.log(result)
		if (result.success) {
			console.log(result)
			callAPI({
				newsName: newsName,
				uploadDate: uploadDate,
				description: description,
				url: result.data.urls.toString()
			})
		}
		navigate('/News')
	}
}
