import React, { useState, Link } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MainCard from '../components/MainCard';

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
import { SubHeader } from '../layouts/MainLayout';

export function AddTextCalenderData() {
	return (
		<>
		<SubHeader title="Add Tax Calender Data"/>	
			<MainCard
				border={false}
				elevation={16}
				content={false}
				boxShadow
			>
				<Grid container direction="column" spacing={2} padding={4}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label=" Heading Name"
							id="fullWidth"
							helperText="Please enter name"
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField fullWidth label="Details" id="fullWidth" helperText="Please enter Details" />
						{/* <TextareaAutosize
							aria-label="minimum height"
							minRows={3}
							placeholder="Details"
							style={{ width: 1170 , padding:4 }}
						/> */}
					</Grid>
				</Grid>
				<Divider />
				<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
					<Button size="large" variant="contained" >
						Save
					</Button>
				</CardActions>
			</MainCard>
		</>
	);
}
