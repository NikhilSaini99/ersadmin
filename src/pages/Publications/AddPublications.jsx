import React from 'react';
import MainCard from '../../components/MainCard';
import { MdDelete } from 'react-icons/md';
import {
	Box,
	Divider,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	FormControl,
	Button,
	Typography
} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import useUpload from '../../hooks/useUpload';
import UsePdfCover from '../RecentlyApproved/UsePdfCover';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SubHeader } from '../../layouts/MainLayout';
import { useRef } from 'react';

const AddPublications = () => {
	const { uploadPdfFile } = useUpload();
	const navigate = useNavigate();
	const location = useLocation();
	const upload_URL_FLAG_REF = useRef(false);
	const upload_IMG_FLAG_REF = useRef(false);
	const updateformValues = location?.state?.formdata;
	const myRef = useRef({ fileName: '', fileUrl: '' });
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/publication/${location?.state?.formdata?.id}`
	);
	const { uploadCover } = UsePdfCover();
	const { callAPI } = useFetch('POST', '/publication');
	const [selectedFile, setSelected] = useState();
	
	const [selectedCover, setselectedCover] = useState({
		onPageUrl: undefined,
		serverImgUrl: undefined
	});

	console.log("updated valeu",updateformValues?.coverPhoto);

	const newsSchema = Yup.object().shape({
		// name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		documentName: Yup.string().required('Document Name is required')
	});

	console.log(location)
	const initialValues = {
		type: location?.state?.status ? updateformValues.type : '',
		documentName: location?.state?.status ? updateformValues.documentName : '',
		description: location?.state?.status ? updateformValues.description : '',
		documentUrl: location?.state?.status ? updateformValues.documentUrl : null,
		coverPhoto: location?.state?.status ? updateformValues?.coverPhoto : null
	};

	const handleSubmit = async (values, { resetForm }) => {
		
		const updatepdfURL = !upload_URL_FLAG_REF.current ? updateformValues?.documentUrl: await uploadPdfFile(
			'/files/publication-files',
			selectedFile
		);

		const uploadCoverUrl = !upload_IMG_FLAG_REF.current ? updateformValues?.coverPhoto: await uploadCover(
			'/files/publication-image',
			selectedCover?.serverImgUrl
		);

		console.log("udpate img url retun", uploadCoverUrl)
		if (updatepdfURL.success || updateformValues.documentUrl || updateformValues?.coverPhoto) {
			location?.state?.status
				? updateformAPI({
						...values,
						documentUrl:  upload_URL_FLAG_REF.current ? updatepdfURL.data.url.toString() : updateformValues?.documentUrl,
						coverPhoto:  upload_IMG_FLAG_REF.current ? uploadCoverUrl.data.url.toString() : updateformValues?.coverPhoto,
				})
				: callAPI({
						...values,
						documentUrl: updatepdfURL.data.url.toString(),
						coverPhoto: uploadCoverUrl.data.url.toString()
				});
			// Reset the form after successful submission
			resetForm();
			navigate('/Publications-List');
		} else {
			console.log('error');
		}
	};

	const handleChangeCover = (event) => {
		const file = event.target.files[0];
		const imgURL = URL.createObjectURL(file);
		setselectedCover({ onPageUrl: imgURL, serverImgUrl: file });
		upload_IMG_FLAG_REF.current= true;
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
		myRef.current.fileName = event.target.files[0].name;
		myRef.current.fileUrl = URL.createObjectURL(event.target.files[0]);
		upload_URL_FLAG_REF.current= true;
	};

	console.log(selectedCover);
	return (
		<>
			<SubHeader
				title={
					location?.state?.status ? 'Update Publications' : 'Add Publications'
				}
			/>
			<MainCard border={false} elevation={16} content={false} boxShadow>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={newsSchema}
				>
					<Box sx={{ p: '2rem 4rem 6rem 6rem' }}>
						<Form>
							<Grid container direction="column">
								<Grid item xs={12}>
									<FormControl margin="normal" fullWidth variant="outlined">
										<InputLabel>Type</InputLabel>
										<Field as={Select} name="type" label="Type">
											<MenuItem value="Strategic Plans">
												Strategic Plans
											</MenuItem>
											<MenuItem value="Annual Reports">Annual Reports</MenuItem>
										</Field>
									</FormControl>
									<ErrorMessage name="type" component={FormHelperText} />
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
										name="documentName"
										label="Enter Document Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage
										name="documentName"
										component={FormHelperText}
									/>
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

								<Grid item xs={12} sx={{ mt: '1.5rem' }}>
									<Button
										variant="outlined"
										component="label"
										sx={{ mt: '1.5rem' }}
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
								{(selectedCover?.onPageUrl) &&(
									<Grid item xs={12} sx={{ mt: '1.5rem' }}>
										<Grid container direction="row" spacing={2} padding={2}>
											<Grid item xs={3}>
												{!upload_IMG_FLAG_REF.current ?<img
													src={location?.state?.uploadCover}
													style={{ height: '156px' }}
												/> :  <img
													src={selectedCover?.onPageUrl}
													style={{ height: '156px' }}
												/>}
												{selectedCover?.onPageUrl && (
													<Button
														variant="outlined"
														onClick={() =>
															setselectedCover({
																...selectedCover,
																onPageUrl: '',
																serverImgUrl: ''
															})
														}
														size="small"
														sx={{ mt: 1 }}
														startIcon={<MdDelete size={20} />}
													>
														Delete
													</Button>
												)}
											</Grid>
										</Grid>
									</Grid>
								)}

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
												: (!selectedFile ||(!(selectedCover.serverImgUrl&&selectedCover.onPageUrl)))
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

export default AddPublications;
