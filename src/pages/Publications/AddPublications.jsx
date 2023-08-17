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
	Button
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

const AddPublications = () => {
	const { uploadPdfFile } = useUpload();
	const navigate = useNavigate();
	const location = useLocation();
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/publication/${location?.state?.formdata?.id}`
	);
	const { uploadCover } = UsePdfCover();
	const { callAPI } = useFetch('POST', '/publication');
	const [selectedFile, setSelected] = useState();
	const updateformValues = location?.state?.formdata;
	const [selectedCover, setselectedCover] = useState({
		onPageUrl: undefined,
		serverImgUrl: undefined
	});

	console.log(updateformValues)

	const newsSchema = Yup.object().shape({
		// name: Yup.string().required('Name is required'),
		description: Yup.string().required('Description is required'),
		documentName: Yup.string().required('Document Name is required')
	});

	const initialValues = {
		type: location?.state?.status ? updateformValues.type :'',
		// name: location?.state?.status ? updateformValues.name :'',
		documentName: location?.state?.status ? updateformValues.documentName :'',
		description: location?.state?.status ? updateformValues.description :'',
		documentUrl: '',
		coverPhoto: ''
	};

	const handleChangeCover = (event) => {
		const file = event.target.files[0];
		const imgURL = URL.createObjectURL(file);
		setselectedCover({ onPageUrl: imgURL, serverImgUrl: file });
	};


	const handleSubmit = async (values, { resetForm }) => {

		if(!selectedFile){
			return
		}
		
		const uploadURL = await uploadPdfFile(
			'/files/publication-files',
			selectedFile
		);

		if (!(selectedCover.serverImgUrl&&selectedCover.onPageUrl)) {
			return;
		}
		const uploadCoverUrl = await uploadCover(
			'/files/publication-image',
			selectedCover.serverImgUrl
		);


		if (uploadURL.success) {
			location?.state?.status
				? updateformAPI({
						...values,
						documentUrl: uploadURL.data.url.toString(),
						coverPhoto: uploadCoverUrl.data.url.toString()
				}):
				callAPI({
				...values,
				documentUrl: uploadURL.data.url.toString(),
				coverPhoto: uploadCoverUrl.data.url.toString()
			});
			// Reset the form after successful submission
			resetForm();
			navigate('/Publications-List');
		} else {
			console.log('error');
		}
	};

	const handleChange = (event) => {
		const file = event.target.files[0];
		setSelected(file);
	};


console.log(selectedCover)
	return (
		<>
			<MainCard
				title={location?.state?.status?"Update Publications":"Add Publications"}
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
					<Box sx={{ p: '0 2rem 2rem 2rem' }}>
						<Form>
							<Grid container direction="column">
							

								{/* <Grid item xs={12}>
									<Field
										as={TextField}
										name="name"
										label="Enter Name"
										fullWidth
										variant="outlined"
										margin="normal"
									/>
									<ErrorMessage name="name" component={FormHelperText} />
								</Grid> */}

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
									<Button
										variant="outlined"
										component="label"
										sx={{ mt: '1.5rem' }}
									>
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
										disabled={!(selectedFile && selectedCover)}
									>
										{location?.state?.status?"Update":"Submit"}
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
