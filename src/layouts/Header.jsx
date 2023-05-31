import React, { useState, forwardRef } from "react";
// eslint-disable-next-line no-unused-vars
import { Link as RouterLink } from "react-router-dom";
// import styled from "styled-components";

import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  experimentalStyled,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  IconButton,
  Slide,
  Toolbar,
  styled
} from "@mui/material";
import { TfiMenuAlt, TfiGallery } from 'react-icons/tfi'

// import MenuIcon from "@material-ui/icons/Menu";
// import InputIcon from "@material-ui/icons/Input";


// const MenuBtn = ({ children }) => (
//   <div style={{
//     ":hover": {
//       boxShadow: '0 0 0 2px rgb(63 63 68 / 5%), 0 3px 3px 0 rgb(63 63 68 / 15%)',
//       background: 'white !important'
//     },
//   }} >
//     {children}
//   </div>
// )

const MenuBtn = experimentalStyled('div')(() => ({
  cursor: 'pointer',
  padding: '15px',
  borderRadius: '50%',
  "&:hover": {
    boxShadow: '0 0 0 2px rgb(63 63 68 / 5%), 0 3px 3px 0 rgb(63 63 68 / 15%)',
    background: 'white !important'
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [logoutOp, setLogoutOp] = useState(false);
  //   const [, , logout] = useContext(UserContext);
  return (
    <AppBar
      style={{ backgroundColor: "transparent", color: "#6C62FC" }}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Hidden lgUp>
          <MenuBtn
            className="menu-icon"
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <TfiMenuAlt size={20} />
          </MenuBtn>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleOpen} color="inherit">
          <TfiGallery size={20} />
        </IconButton>
      </Toolbar>
      <Dialog
        open={logoutOp}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to logout.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={logoutOp} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );

  function handleOpen() {
    setLogoutOp(true);
  }
  function handleClose() {
    setLogoutOp(false);
  }
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
