import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userData from "./user.json"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../hooks/useContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { login } from './auth';
import { useState } from 'react';
import Toast from '../../components/Alert';
import { Alert } from '@mui/material';
import AlertComp from '../../components/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        ERS Admin Panel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


export default function SignInSide() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') || null)
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    await login(loginData)
      .then((res) => {
        if (res.success) {
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('token', res.data.token);
          setAlertMessage("LoggedIn Successfully")
          setAlert(true);
          setLoginAlert(true)
          setTimeout(()=>{
            setIsAuthenticated(true)
          },1500)
          
        }
        else {
          setAlertMessage(res.error)
          setLoginAlert(false)
          setAlert(true);
        }
      }).catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    const localData = localStorage.getItem("token")
    if (localData) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [isAuthenticated])
  return (
    <ThemeProvider theme={defaultTheme}>
      {alert && <AlertComp message={alertMessage} severity={loginAlert ? "success" : "error"} color={loginAlert ? "success" : "error"} open={alert} handleClose={handleAlertClose} />}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/banner-HIRES.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}