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
    CardActions
} from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SubHeader } from '../../layouts/MainLayout';

const AddTaxItemCode = () => {
    const location = useLocation();
	const navigate = useNavigate();
	const updateformValues = location?.state?.formdata;
    console.log(updateformValues)

	const { callAPI } = useFetch('POST', '/textIteamCode');
	const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/textIteamCode/${location?.state?.formdata?.id}`
	);
	const initialValues = {
		text_type: location?.state?.status ? updateformValues.text_type : '',
		text_type_two: location?.state?.status ? updateformValues.text_type_two : '',
		item_name: location?.state?.status ? updateformValues.item_name : '',
		item_code: location?.state?.status ? updateformValues.item_code : '',
	};

	const validationSchema = Yup.object().shape({
		text_type: Yup.string().required('Tax Type is required'),
		text_type_two: Yup.string().required('Tax Type Two is required'),
		item_name: Yup.string().required('Tax Item is required'),
		item_code: Yup.string().required('Tax Code is required'),
	});

	const handleSubmit = (values, { resetForm }) => {
		// Handle form submission logic here
		location?.state?.status ? updateformAPI(values) : callAPI(values);

		// Reset the form after successful submission
		resetForm();
		navigate('/List-Tax-Item-Code');
	};


  return (
   <>
	<SubHeader title={
					location?.state?.status
					? 'Update Tax Item Code'
					: 'Add Tax Item Code'
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
								name="text_type"
								label="Enter Tax Type"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<ErrorMessage name="text_type">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>

							<Field
								as={TextField}
								name="text_type_two"
								label="Enter Tax Type Two"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<ErrorMessage name="text_type_two">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>

							<Field
								as={TextField}
								name="item_name"
								label="Tax Item"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<ErrorMessage name="item_name">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>
                            <Field
								as={TextField}
								name="item_code"
								label="Tax Code"
								fullWidth
								variant="outlined"
								margin="normal"
							/>
							<ErrorMessage name="item_code">
								{(errorMsg) => (
									<FormHelperText style={{ color: 'red' }}>
										{errorMsg}
									</FormHelperText>
								)}
							</ErrorMessage>

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
  )
}

export default AddTaxItemCode