import React, { useEffect, useRef } from 'react';
import MainCard from '../../components/MainCard';
import {
	Box,
	Divider,
	FormHelperText,
	Grid,
	TextField,
	Button,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem
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
import { SubHeader } from '../../layouts/MainLayout';


const AddNoticeBoard = () => {
	const { uploadPdfFile } = useUpload();
	const location = useLocation();
	const navigate = useNavigate();
	const { callAPI } = useFetch('POST', '/noticeBoard');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/noticeBoard/${location?.state?.formdata?.id}`
	);
	const myRef = useRef({ fileName: '', fileUrl: '' });
	const upload_URL_FLAG_REF = useRef(false);
	const [selectedFile, setSelected] = useState();
	const updateformValues = location?.state?.formdata;
	const date = updateformValues?.date.split('T')[0];

	const newsSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		date: Yup.date().required('Published Date is required'),
		notice: Yup.string().required('Notice is required'),
		description: Yup.string().required('Description is required'),
		documentName: Yup.string().required('Document Name is required'),
	});

	
	const initialValues = {
		name: location?.state?.status ? updateformValues.name :'',
		documentName: location?.state?.status ? updateformValues.documentName :'',
		description: location?.state?.status ? updateformValues.description :'',
		date: location?.state?.status ? dayjs(date) : null,
		notice: location?.state?.status ?  updateformValues.notice : "",
		documentUrl: location?.state?.status ? updateformValues.documentUrl : null
	};

	console.log(updateformValues?.documentUrl)
	const handleSubmit = async (values, { resetForm }) => {
		console.log("hekki");
		
       const updatepdfURL = !upload_URL_FLAG_REF.current ? updateformValues?.documentUrl: await uploadPdfFile(
			'/files/noticeboard-files',
			selectedFile
		);

	
		console.log('yo', updatepdfURL);
		if (updatepdfURL.success || updateformValues.documentUrl) {
			location?.state?.status
				? updateformAPI({
							...values,
							documentUrl:  upload_URL_FLAG_REF.current ? updatepdfURL.data.url.toString() : updateformValues?.documentUrl
					}) : callAPI({
						...values,
						documentUrl: updatepdfURL.data.url.toString()
				});
			// Reset the form after successful submission
			resetForm();
			navigate('/List-Public-Board');
		} else {
			console.log('submit error');
		}
	};


	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
		myRef.current.fileName = event.target.files[0].name;
		myRef.current.fileUrl = URL.createObjectURL(event.target.files[0]);
		upload_URL_FLAG_REF.current= true;
	};

	console.log(upload_URL_FLAG_REF.current)
	return (
		<>
			<SubHeader title={
					location?.state?.status ? 'Update Notice Board Data' : 'Add Notice Board Data'
				} />
			<MainCard
				// title={
				// 	location?.state?.status ? 'Update Notice Board Data' : 'Add Notice Board Data'
				// }
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
					<Box sx={{ p: '2em 4rem 6rem 6rem' }}>
						<Form>
							<Grid container direction="column">
							
							<Grid item xs={12}>
									<Field
										as={TextField}
										name="name"
										label="Enter Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="name" component={FormHelperText} />
								</Grid>

								<Grid item xs={12}>
									<Field
										as={TextField}
										name="documentName"
										label="Enter Document Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="documentName" component={FormHelperText} />
								</Grid>


								<Grid item xs={12}>
									<Field
										as={TextField}
										name="description"
										label="Enter Description"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="description" component={FormHelperText} />
								</Grid>

								<Grid container direction="column">
								<Grid item xs={12}>
									<Field
										as={TextField}
										name="notice"
										label="Enter Notice"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="notice" component={FormHelperText} />
								</Grid>
								</Grid>
								<Grid item xs={12} mb={1.5} mt={1.5}>
									<Field name="date">
										{({ field }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker
													{...field}
													label="Date"
													inputFormat="MM/dd/yyyy"
													slotProps={{ textField: { fullWidth: true } }}
													value={field.value || null}
													defaultValue={dayjs()}
													onChange={(value) => {
														const event = {
															target: {
																name: 'date',
																value: dayjs(value).toISOString()
															}
														};
														field.onChange(event);
													}}
												/>
											</LocalizationProvider>
										)}
									</Field>
									<ErrorMessage name="date">
										{(errorMsg) => (
											<FormHelperText style={{ color: 'red' }}>
												{errorMsg}
											</FormHelperText>
										)}
									</ErrorMessage>
								</Grid>


								<Grid item xs={12}>
									<Box
										sx={{
											display: 'flex',
											gap: '0.5rem',
											flexDirection: { xs: 'column', sm: 'row' },
											alignItems: 'center'
										}}
									>
										<Button variant="outlined" component="label">
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

										<Typography
											variant="body1"
											component="a"
											href={myRef.current.fileUrl}
											target="_blank"
										>
											{myRef.current.fileName}
										</Typography>
									</Box>
								</Grid>
								<Divider sx={{ my: '1.8rem' }} />

								<Box
									sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}
								>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={
											location?.state?.status
												? false
												: !selectedFile
												? true
												: false
										}
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

export default AddNoticeBoard;
