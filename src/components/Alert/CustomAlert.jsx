import React from 'react'
import { Alert, Snackbar } from '@mui/material';

const CustomAlert = ({isOpen,AlertMessage,handleClose}) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      {AlertMessage}
    </Alert>
  </Snackbar>
  )
}

export default CustomAlert