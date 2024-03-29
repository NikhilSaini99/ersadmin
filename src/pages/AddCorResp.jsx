import React from 'react';
import {
	Box,
	Button,
	CardActions,
	Divider,
	FormHelperText,
	Grid,
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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../layouts/MainLayout';
import UsePdfCover from './RecentlyApproved/UsePdfCover';
import { useRef } from 'react';
import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';


export default function AddCorporateResponsibility() {
	const location = useLocation();
	const navigate = useNavigate();
	const { uploadCover } = UsePdfCover();
	const updateformValues = location?.state?.formdata;
	const uploadDate = updateformValues?.uploadDate.split('T')[0];
	const upload_IMG_FLAG_REF = useRef(false);
	const { callAPI } = useFetch('POST', '/csr');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/csr/${location?.state?.formdata?.id}`
	);
	const [selectedCover, setselectedCover] = useState({
		onPageUrl: undefined,
		serverImgUrl: undefined
	});

	const handleChangeCover = (event) => {
		const file = event.target.files[0];
		const imgURL = URL.createObjectURL(file);
		setselectedCover({ onPageUrl: imgURL, serverImgUrl: file });
		upload_IMG_FLAG_REF.current= true;
	};
	
	const initialValues = {
		name: location?.state?.status ? updateformValues.name : '',
		description: location?.state?.status ? updateformValues.description : '',
		uploadDate: location?.state?.status ? dayjs(uploadDate) : null,
		url:location?.state?.status ? updateformValues.url : ""
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		uploadDate: Yup.date().required('Upload Date is required'),
	});

	const handleSubmit = async (values, { resetForm }) => {
		const uploadCoverUrl = !upload_IMG_FLAG_REF.current ? updateformValues?.url: await uploadCover(
			'/files/csr-image',
			selectedCover?.serverImgUrl
		);
		// Handle form submission logic here
		location?.state?.status ? updateformAPI(values) : callAPI(values);

		// Reset the form after successful submission
		
		if (updateformValues?.url || selectedCover) {
			location?.state?.status
				? updateformAPI({
						...values,
						url: upload_IMG_FLAG_REF.current ? uploadCoverUrl.data.url.toString() : updateformValues?.url,
				}):
				callAPI({
				...values,
				url: uploadCoverUrl.data.url.toString()
			});
			// Reset the form after successful submission 
			resetForm();
		navigate('/CorporateResponsibility');
		} else {
			console.log('error');
		}
	};

	return (
		<>
		<SubHeader title={
					location?.state?.status
					? 'Update Corporate Responsibility'
					: 'Add Corporate Responsibility'
				} />
			<MainCard
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
					<Box sx={{ p: '2em 4rem 6rem 6rem' }}>
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

							
							<Grid item xs={12} >
									<Button
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


							<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
								<Button size="large" variant="contained" type="submit">
									{location?.state?.status ? 'Update' : 'Submit'}
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
