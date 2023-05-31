import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const PageHeader = ({ heading, buttonText, link }) => {
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			mb={4}
		>
			<Typography variant="h4">{heading}</Typography>
			<Link to={link}>
				<Button
					variant="contained"
					size="large"
					sx={{ fontWeight: 600, py: 2 }}
					startIcon={<BiAddToQueue size={25} />}
				>
					{' '}
					{buttonText}
				</Button>
			</Link>
		</Stack>
	);
};

export default PageHeader;
