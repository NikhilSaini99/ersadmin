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
	CircularProgress
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
import { MdDelete } from 'react-icons/md';
import UsePdfCover from '../RecentlyApproved/UsePdfCover';
import { SubHeader } from '../../layouts/MainLayout';

const PublicMeeting = () => {
	const location = useLocation();
	const navigate = useNavigate();
    const { uploadCover } = UsePdfCover();
	const { callAPI, loading } = useFetch('POST', '/publicMeeting');
	const { callAPI: updateformAPI, loading: updateLoading } = useFetch(
		'PUT',
		`/publicMeeting/${location?.state?.formdata?.id}`
	);
	const upload_IMG_FLAG_REF = useRef(false);
	const updateformValues = location?.state?.formdata;
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

    

	const newsSchema = Yup.object().shape({
		publicMeetingName: Yup.string().required('Public Meeting Name is required'),
		description: Yup.string().required('Description is required'),
		uploadDate: Yup.date().required('Upload Date Date is required'),
	});

	const uploadDate = updateformValues?.uploadDate.split('T')[0];

	const initialValues = {
		publicMeetingName: location?.state?.status ? updateformValues.publicMeetingName : '',
		uploadDate: location?.state?.status ? dayjs(uploadDate) : null,
		description: location?.state?.status ? updateformValues.description : '',
		url: location?.state?.status ? updateformValues.url : ""
	};
	const handleSubmit = async (values, { resetForm }) => {
		const uploadCoverUrl = !upload_IMG_FLAG_REF.current ? updateformValues?.url: await uploadCover(
			'/files/publicmeeting-image',
			selectedCover?.serverImgUrl
		);
		if (uploadCoverUrl) {
			location?.state?.status
				? updateformAPI({
						...values,
						url: upload_IMG_FLAG_REF.current ? uploadCoverUrl.data.url.toString() : updateformValues?.url,
				}):
				callAPI({
				...values,
				url: uploadCoverUrl.data.urls[0].toString()
			});
			// Reset the form after successful submission 
			resetForm();
			navigate('/List-Public-Meetings');
		} else {
			console.log('error');
		}
	};

  return (
    <>
	<SubHeader title={
					location?.state?.status ? 'Update Public Meeting Data' : 'Add Public Meeting Data'
				}/>
     <MainCard
				
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
					<Box sx={{ p: '0 2rem 2rem 2rem', mt:"2rem" }}>
						<Form>
							<Grid container direction="column">
								<Grid item xs={12}>
									<Field
										as={TextField}
										name="publicMeetingName"
										label="Public Meeting Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="publicMeetingName" component={FormHelperText} />
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

                                <Grid item xs={12} mb={1.5}>
									<Field name="uploadDate">
										{({ field }) => (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker
													{...field}
													label="Upload Date"
													inputFormat="MM-dd-yyyy"
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
								</Grid>


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


								<Divider sx={{ my: '1.8rem' }} />

								<Box
									sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}
								>
									<Button
										type="submit"
										variant="contained"
										color="primary"
									>
										{loading ?  <CircularProgress /> : location?.state?.status ? 'Update' : 'Submit'}
									</Button>
								</Box>
							</Grid>
						</Form>
					</Box>
				</Formik>
			</MainCard>
    </>
  )
}

export default PublicMeeting