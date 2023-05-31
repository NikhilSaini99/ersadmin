import React, { useState, useEffect, Link } from 'react';
import { Card, CardHeader } from '@mui/material';
import DashBoard from '../components/DashBoard';
import MainCard from '../components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {
	Avatar,
	Box,
	Button,
	ButtonBase,
	CardActions,
	Chip,
	ClickAwayListener,
	Divider,
	Grid,
	Paper,
	Popper,
	Stack,
	TextField,
	Typography,
	useMediaQuery
} from '@mui/material';

export function CreateVideo() {
	const [value, setValue] = useState({
		name: '',
		description: '',
		date: '',
		link: ''
	});

	return (
		<MainCard
			title="Create Video"
			border={false}
			elevation={16}
			content={false}
			boxShadow
		>
			<Grid container direction="column" spacing={2} padding={4}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Video Name"
						id="fullWidth"
						helperText="Please enter Video name"
						value={value.name}
						onChange={(event) =>
							setValue((prev) => ({
								...prev,
								name: event.target.value
							}))
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Description"
						id="fullWidth"
						helperText="Please enter Description"
						value={value.description}
						onChange={(event) =>
							setValue((prev) => ({
								...prev,
								name: event.target.value
							}))
						}
					/>
				</Grid>

				<Grid item xs={12}>
					{/* <TextField fullWidth label="Upload Date" id="fullWidth" /> */}

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							slotProps={{ textField: { fullWidth: true } }}
							fullWidth
							value={value.date}
							// error={Boolean(formik.errors.uploadDate)}
							name="uploadDate"
							onChange={(event) =>
								setValue((prev) => ({
									...prev,
									name: event.target.value
								}))
							}
							helperText="Please enter Date"
							label="Upload Date"
						/>
					</LocalizationProvider>
				</Grid>

				<Grid item xs={12}>
					<TextField
						fullWidth
						label="You tube Video Link"
						id="fullWidth"
						helperText="Please enter Video Link"
						value={value.link}
						onChange={(event) =>
							setValue((prev) => ({
								...prev,
								name: event.target.value
							}))
						}
					/>
				</Grid>
			</Grid>

			<Divider />

			<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
				<Button  size="large" variant="contained" fullWidth>
					Save
				</Button>
			</CardActions>
		</MainCard>
	);
}
