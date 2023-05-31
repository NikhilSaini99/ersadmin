import { Button, CardActions, Divider, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import MainCard from '../components/MainCard';

export function AddCorporateResponsibility() {
	return (
		<>
			<MainCard
				title="Add Corporate Responsibility "
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<Grid container direction="column" spacing={2} padding={4}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label=" Name"
							id="fullWidth"
							helperText="Please enter name"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Description"
							id="fullWidth"
							helperText="Please enter Description"
						/>
					</Grid>
					<Grid item xs={12}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								slotProps={{ textField: { fullWidth: true } }}
								fullWidth
								name="uploadDate"
								label="Upload Date"
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={12}>
						<Button variant="outlined" component="label" fullWidth>
							<AiOutlineCloudUpload size={30} className="mr-2" />
							Upload File
							<input type="file" hidden />
						</Button>
					</Grid>
				</Grid>
				<Divider />
				<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
					<Button size="large" variant="contained" fullWidth>
						Save
					</Button>
				</CardActions>
			</MainCard>
		</>
	);
}
