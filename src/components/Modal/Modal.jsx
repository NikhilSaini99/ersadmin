import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const CustomModal = ({ isOpen, handleClose, handleDelete }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				{"Are you sure you want to delete?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Your record will be deleted permanently
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus  onClick={handleClose} sx={{background:"#72B8BF", color:"white", "&:hover":{
                        background:"rgba(114, 184, 191, 0.6)", color:"white",
                }}}>
					Cancel
				</Button>
				<Button onClick={()=>handleDelete()} autoFocus sx={{background:"#72B8BF", color:"white", "&:hover":{
                     background:"rgba(114, 184, 191, 0.6)", color:"white",
                }}}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CustomModal;
