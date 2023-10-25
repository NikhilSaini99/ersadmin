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
import { SubHeader } from '../layouts/MainLayout';
import { useRef } from 'react';


const newsSchema = Yup.object().shape({
	news: Yup.string().required('News Name is required'),
	uploadDate: Yup.date().required('Upload Date is required')
});



export function AddNews() {

	const location = useLocation()
	const navigate = useNavigate()
	console.log(location)
	const MuiTextField = ({ field, form, ...props }) => {
		return <TextField  {...field} {...props} />;
	};
	const upload_IMG_FLAG_REF = useRef(false);
	const { UploadFile } = useFile();
	const [text, setText] = useState('');
	const [images, setImages] = useState([]);
	const { loading, data, error, callAPI } = useFetch('POST', '/news');

	const { callAPI: updateformAPI, loading: updateLoading } = useFetch(
		'PUT',
		`/news/${location?.state?.id}`
	);

	const [htmlData, setHtmlData] = useState({});
	const [htmlContent, setHtmlContent] = useState('sss');


	//filling my texeditor
	

	function gettingHtmlData(recvHtml) {
		console.log(recvHtml)
		setHtmlData({ body: recvHtml })
	}

	const handleChange = (content) => {
		setText(content);
	};

	const uploadDate = location?.state?.date.split('T')[0];

	async function createNews({ news: newsName, uploadDate, body: description }) {
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

	return (
		<Formik
			initialValues={{
					news: location?.state?.status ? location?.state?.title : '',
				uploadDate: location?.state?.status ? dayjs(uploadDate) : null,
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
					<SubHeader title={location?.state?.status ? "Update News":"Add News"} />
					<MainCard
						border={false}
						elevation={16}
						content={false}
						boxShadow
					>
						<Grid container spacing={2} padding={6}>
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
										disablePast
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

								<TextEditor initialContent={location?.state?.status ? location?.state?.description: ""} {...{ text, setText }} htmlContent={htmlContent} gettingHtmlData={gettingHtmlData} />
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

}
