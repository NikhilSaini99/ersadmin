import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { SubHeader } from '../layouts/MainLayout';
import {
	Box,
} from '@mui/material';

const myBox = {
	display: 'flex',
	justifyContent: 'flex-end',
	color: '#72b8bf',
	pb: "1rem",
};

const PageHeader = ({ heading, buttonText, link }) => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			mb={4}>
			<SubHeader title={heading} />
			{/* <Box
				sx={{
					width: '100%',
					margin: { xs: '0 auto', lg: '0  auto' },
					px: { md: '3rem', lg: '5rem,', xl: '10rem' },
					py: '1rem'
				}}>

			</Box> */}
			{/* <Typography variant="h4">{heading}</Typography> */}
			<Box sx={myBox}>
				<Link to={link}>
					<Button
						variant="contained"
						size="large"
						sx={{ fontWeight: 600, py: 1.5 }}
						startIcon={<BiAddToQueue size={25} />}
					>
						{' '}
						{buttonText}
					</Button>
				</Link>
			</Box>
		</Stack>
	);
};

export default PageHeader;
