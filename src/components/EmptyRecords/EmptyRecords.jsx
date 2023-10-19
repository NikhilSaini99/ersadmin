import React from 'react';
import emptyRecords from '../../assets/images/emptyRecords.jpg';
import '../../App.css';
import { Box, Grid } from '@mui/material';

export const EmptyRecords = () => {
	return (
		<Grid
			container
			spacing={2}
			justifyContent={'center'}
			direction={'column'}
			alignContent={'center'}
			minHeight="40vh"
		>
			<Grid item xs={12}>
				<img src={emptyRecords} width={500} height={500} />
			</Grid>
			<Grid item xs={12}>
                <Box sx={{display:'flex', justifyContent:'center', fontWeight:'bold', flexDirection:'column', gap:'10px', alignItems:'center'}}>
				<div className="empty-state-message">
					No records has been added yet.
				</div>
				<div className="empty-state-help">
					Add a new record by simply clicking the button &quot;Add New &quot;.
				</div>
                </Box>
			</Grid>
		</Grid>
	);
};

export default EmptyRecords;
