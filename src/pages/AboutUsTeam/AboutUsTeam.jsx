import React, { useEffect, useRef } from 'react';
import MainCard from '../../components/MainCard';
import {
	Box,
	Divider,
	FormHelperText,
	Grid,
	TextField,
	Button,
	Typography
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
import { RequestLoader } from '../../components/Spinner';

const AboutUsTeam = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
    const { uploadCover } = UsePdfCover();
	const { callAPI } = useFetch('POST', '/aboutus');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/aboutus/${location?.state?.formdata?.id}`
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
		name: Yup.string().required('Team Member Name is required'),
		description: Yup.string().required('Description is required'),
	});

	const initialValues = {
		name: location?.state?.status ? updateformValues.name : '',
		possition: location?.state?.status ? updateformValues.possition : '',
		description: location?.state?.status ? updateformValues.description : '',
		url: location?.state?.status ? updateformValues.url : ""
	};
	const handleSubmit = async (values, { resetForm }) => {
		try{
			setLoading(true);
			const uploadCoverUrl = !upload_IMG_FLAG_REF.current ? updateformValues?.url : await uploadCover(
			'/files/about-team-image',
			selectedCover?.serverImgUrl
		);
		if (uploadCoverUrl) {
			location?.state?.status
				? updateformAPI({
						...values,
						url: upload_IMG_FLAG_REF.current ? uploadCoverUrl.data.urls[0].toString() : updateformValues?.url,
				}):
				callAPI({
				...values,
				url: uploadCoverUrl.data.urls[0].toString()
			});
			// Reset the form after successful submission 
			resetForm();
			navigate('/List-Team-Data');
		} else {
			console.log('error');
		}}catch(err){
			console.log(err);
			setLoading(false);
		}finally{
			setLoading(false);
		}
	};

  return (
    <>
	<SubHeader title={
					location?.state?.status ? 'Update Team Data' : 'Add Team Data'
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
										name="name"
										label="Team Member Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="name" component={FormHelperText} />
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

                                <Grid item xs={12}>
									<Field
										as={TextField}
										name="possition"
										label="Enter Position"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="possition" component={FormHelperText} />
								</Grid>

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


								<Divider sx={{ my: '1.8rem' }} />

								<Box
									sx={{ p: 1.25, display: 'flex', justifyContent: 'center' }}
								>
									<Button
										disabled={loading}
										type="submit"
										variant="contained"
										color="primary"
									>
										{loading? <RequestLoader/>	: location?.state?.status ? 'Update' : 'Submit'}
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

export default AboutUsTeam