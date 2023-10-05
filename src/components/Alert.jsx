import React from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
const AlertComp = (prop) => {
  const { message, severity, color, handleClose, open } = prop;
  return (
    <Snackbar
      open={open} onClose={handleClose} autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity} color={color} onClose={handleClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComp;
