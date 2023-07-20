// import React from "react"
import {
	Autocomplete,
	Button,
	CardActions,
	CircularProgress,
	Divider,
	Grid,
	TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import MainCard from '../components/MainCard';
import UploadImage from '../components/UploadImage';
import useFetch from '../hooks/useFetch';
import useFile from '../hooks/useFile';
import { useNavigate } from 'react-router-dom';

export function Image() {
	const navigate = useNavigate();
	const { UploadFile } = useFile();
	const {
		loading,
		data: groups,
		callAPI: getGroups
	} = useFetch('GET', '/gallery-images/');
	const { callAPI } = useFetch('POST', '/gallery-images/');
	const [images, setImages] = useState([]);
	const [value, setValue] = useState('');
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = React.useState('');

	const formik = useFormik({
		initialValues: {
			imageName: ''

		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: Yup.object().shape({
			imageName: Yup.string().required(`Image name is required`)
		}),
		onSubmit: createGallery
	});

	useEffect(() => getGroups(), []);
	useEffect(() => {
		if (groups?.length > 0) setOptions(groups);
		else setOptions([]);
	}, [groups]);
	return (
		<>
			<MainCard
				title=" Create Image "
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<form onSubmit={formik.handleSubmit}>
					<Grid container direction="column" spacing={2} padding={4}>
						<Grid item xs={12}>
							<Autocomplete
								id="asynchronous-demo"
								isOptionEqualToValue={(option, value) =>
									option?.title === value?.title
								}
								inputValue={inputValue}
								onInputChange={(event, value, reason) => {
									if (event && event.type === 'blur') {
										setInputValue('');
									} else if (reason !== 'reset') {
										setInputValue(value);
										setValue('');
									}
								}}
								clearOnBlur={false}
								getOptionLabel={(option) => option?.title || ""}
								options={options}
								value={inputValue ? inputValue : value}
								onChange={(event, newValue) => {
									setValue(newValue);
									setInputValue('');
								}}
								loading={loading}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Group Name"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<React.Fragment>
													{loading ? (
														<CircularProgress color="inherit" size={20} />
													) : null}
													{params.InputProps.endAdornment}
												</React.Fragment>
											)
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Image Name"
								id="fullWidth"
								name="imageName"
								error={Boolean(formik.errors.imageName)}
								helperText={formik.errors.imageName}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.imageName}
							/>
						</Grid>
						<Grid item xs={12}>
							<UploadImage maxImg={15} {...{ images, setImages }} />
						</Grid>
					</Grid>
					<Divider />
					<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
						<Button
							size="large"
							variant="contained"
							
							type="submit"
							disabled={
								(images.length >= 1 ? false : true) || formik.isSubmitting
							}
						>
							Save
						</Button>
					</CardActions>
				</form>
			</MainCard>
		</>
	);
	async function createGallery(values) {
		const result = await UploadFile('/files/gallery-image', images);
		console.log(result);
		if (result.success)
			callAPI({
				groupName: value ? value : inputValue,
				...values,
				url: result.data.urls.toString()
			});
		formik.handleReset();
		navigate("/Upload-Gallery-Image")
	}
}
