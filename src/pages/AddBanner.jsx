import { Button, CardActions, Divider, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import UploadImage from '../components/UploadImage';
import useFetch from '../hooks/useFetch';
import useFile from '../hooks/useFile';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../layouts/MainLayout';
import UsePdfCover from './RecentlyApproved/UsePdfCover';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { RequestLoader } from '../components/Spinner';


export default function AddBanner() {
	const { UploadFile } = useFile();
	const { uploadCover } = UsePdfCover();
	const [loading, setLoading] = useState(false);
	const upload_IMG_FLAG_REF = useRef(false);
	const { callAPI } = useFetch('POST', '/banner-images');
	const [selectedCover, setselectedCover] = useState({
		onPageUrl: undefined,
		serverImgUrl: undefined
	});
	const navigate = useNavigate();

	const [images, setImages] = useState([]);
	const updateformValues = location?.state?.formdata;
	const initialValues = {
		name: '',
		possition: '',
		description:  '',
		uploadDate: dayjs('2022-04-17'),
	};

	const formik = useFormik({
		initialValues: initialValues,
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: Yup.object().shape({
			imageName: Yup.string().required(`Image name is required`),
			link: Yup.string().required(`Link is required`),
			description: Yup.string().required(`Description  is required`),
			uploadDate: Yup.string().required(`Upload date is required`)
		}),
		onSubmit: handleSubmit
	});

	const handleChangeCover = (event) => {
		const file = event.target.files[0];
		const imgURL = URL.createObjectURL(file);
		setselectedCover({ onPageUrl: imgURL, serverImgUrl: file });
		upload_IMG_FLAG_REF.current= true;
	};



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

					{/* <Grid item xs={12}>
						<UploadImage maxImg={1} {...{ images, setImages }} />
					</Grid> */}
					<Grid item xs={12} >
									<Button
										disabled={loading}
										variant="outlined"
										component="label"
									>
										<AiOutlineCloudUpload size={30} className="mr-2" />
										Upload Image
										<input
											type="file"
											hidden
											name="file"
											onChange={handleChangeCover}
											accept="image/*"
										/>
									</Button>
								</Grid>
								{selectedCover?.onPageUrl && <Grid item xs={12} sx={{ mt: '1.5rem' }}>
									<Grid container direction="row" spacing={2} padding={2}>
										<Grid item xs={3}>
											<img
												src={selectedCover?.onPageUrl}
												style={{ height: '156px' }}
											/>
											{selectedCover?.onPageUrl&&<Button
												disabled={loading}
												variant="outlined"
												onClick={() => 
													setselectedCover({ ...selectedCover, onPageUrl: "", serverImgUrl:"" })}
												size="small"
												sx={{ mt: 1 }}
												startIcon={<MdDelete size={20} />}
											>
												Delete
											</Button>}
										</Grid>
									</Grid>
								</Grid>}
				</Grid>

				<Divider />

				<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
					<Button
						size="large"
						variant="contained"
						type="submit"
						disabled={loading}
					>
						{loading? <RequestLoader/> : 'Submit'}
					</Button>
				</CardActions>
			</form>
		</MainCard>
		</>
	);
	async function handleSubmit (values, { resetForm }) {
		try{
			setLoading(true);
			const uploadCoverUrl = !upload_IMG_FLAG_REF.current ? updateformValues?.url : await uploadCover(
			'/files/banner-image',
			selectedCover?.serverImgUrl
		);
		if (uploadCoverUrl) {
			console.log("inside upload cover", uploadCoverUrl?.data?.url)
				callAPI({
				...values,
				imageurl: uploadCoverUrl?.data?.url.toString()
			});
			resetForm();
			navigate('/banner');
		} else {
			console.log('error');
		}}catch(err){
			console.log(err);
			setLoading(false);
		}finally{
			setLoading(false);
		}
	}
	// async function createBanner(values) {
	// 	const result = await uploadCover('/files/banner-image', images);
	// 	console.log(result);
	// 	if (result.success) {
	// 		callAPI({
	// 			...values,
	// 			imageurl: result.data.url.toString()
	// 		});
	// 		formik.handleReset();
	// 		navigate('/banner')
	// 	}
	// }
}
