import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import MainCard from '../components/MainCard';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import * as Yup from 'yup';
import {
	TextField,
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	Box,
	Divider,
	Grid,
	FormControlLabel,
	Radio,
	RadioGroup,
    Stack,
    FormLabel
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../layouts/MainLayout';

const AddContactBranch = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const updateformValues = location?.state?.formdata;
	const {callAPI} = useFetch('POST','/contact')
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/contact/${location?.state?.formdata?.id}`
	);
	const initialValues = {
		branchName: location?.state?.status ? updateformValues.branchName :'',
		branchLocation:location?.state?.status ? updateformValues.branchLocation : '',
		branchCity: location?.state?.status ? updateformValues.branchCity :'',
		branchState: location?.state?.status ? updateformValues.branchState :'',
		contactNo: location?.state?.status ? updateformValues.contactNo :'',
		lat: location?.state?.status ? updateformValues.lat :'',
		long: location?.state?.status ? updateformValues.long :'',
		isHeadQuater: location?.state?.status ? updateformValues.isHeadQuater :''
	};

	const validationSchema = Yup.object().shape({
		branchName: Yup.string().required('Branch Name is required'),
		branchLocation: Yup.string().required('Branch Location is required'),
		branchCity: Yup.string().required('Branch City is required'),
		branchState: Yup.string().required('Branch State is required'),
		contactNo: Yup.string().required('Contact Number is required'),
		lat: Yup.string().required('Latitude is required'),
		long: Yup.string().required('Longitude is required'),
		isHeadQuater: Yup.string().required('Is Headquarter is required')
	});

	const handleSubmit = (values, {resetForm}) => {
		// Handle form submission logic here
		resetForm();
			navigate('/ListContactBranch');
			location?.state?.status ? updateformAPI(values) : callAPI(values)
	};

	return (
		<>
		<SubHeader title={
					location?.state?.status?"Update Contact Branch Data": "Add Contact Branch"
				} />
			<MainCard
				// title={location?.state?.status?"Update Contact Branch Data": "Add Contact Branch"}
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
					<Box sx={{ p: '2rem 4rem 6rem 6rem' }}>
						<Form>
							<Field
								as={TextField}
								name="branchName"
								label="Branch Name"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter branch name"
							/>
							<ErrorMessage name="branchName" component={FormHelperText} />

							<Field
								as={TextField}
								name="branchLocation"
								label="Branch Location"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter branch location"
							/>
							<ErrorMessage name="branchLocation" component={FormHelperText} />

							<Field
								as={TextField}
								name="branchCity"
								label="Branch City"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter branch city"
							/>
							<ErrorMessage name="branchLocation" component={FormHelperText} />

							<Field
								as={TextField}
								name="branchState"
								label="Branch State"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter branch state"
							/>
							<ErrorMessage name="branchState" component={FormHelperText} />

							<Field
								as={TextField}
								name="contactNo"
								label="Contact Number"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter contact number"
								type="number"
							/>
							<ErrorMessage name="contactNo" component={FormHelperText} />

							<Field
								as={TextField}
								name="lat"
								label="Latitude"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter latitude"
								type="number"
							/>
							<ErrorMessage name="lat" component={FormHelperText} />

							<Field
								as={TextField}
								name="long"
								label="Longitude"
								fullWidth
								variant="outlined"
								margin="normal"
								helperText="Enter longitude"
								type="number"
							/>
							<ErrorMessage name="long" component={FormHelperText} />

							<FormControl component="fieldset" margin="normal" fullWidth> 
								<FormLabel>Is Headquarter?</FormLabel >
								<Field as={RadioGroup} name="isHeadQuater" >
                                    <Stack direction="row" spacing={1}>
									<FormControlLabel value="1" control={<Radio />} label="Yes" />
									<FormControlLabel value="0" control={<Radio />} label="No" />
                                    </Stack>
								</Field>
							</FormControl>
							<ErrorMessage name="isHeadQuater" component={FormHelperText} />

							<Divider sx={{ my: '1.8rem' }} />

							<Box sx={{ textAlign: 'center' }}>
								<Button type="submit" variant="contained" color="primary">
									{location?.state?.status?"Update":"Submit"}
								</Button>
							</Box>
						</Form>
					</Box>
				</Formik>
			</MainCard>
		</>
	);
};

export default AddContactBranch;
