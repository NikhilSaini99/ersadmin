import { ThemeProvider, colors, createTheme } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import routes  from './routes/Router';
import {useEffect } from 'react';
import './App';
import SignInSide from './pages/Login/Login';

function App() {
	const navigate = useNavigate()
	const token = localStorage.getItem('token');
	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token]);
	

	const baseTheme = createTheme({
		palette: {
			primary: {
				main: '#72B8BF',
				contrastText: '#fff' //button text white instead of black
			},
			background: {
				default: '#FFFFFF',
				paper: colors.common.white
			}
		},
		typography: {
			fontFamily: `"Arial","system-ui", "Helvetica", sans-serif`
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0
			},
			styleOverrides: {
				root: {
					backgroundImage: 'none'
				},
				rounded: {
					borderRadius: '12px'
				}
			}
		},

		MuiCardHeader: {
			styleOverrides: {
				root: {
					// color: theme.colors?.textDark,
					padding: '24px'
				},
				title: {
					fontSize: '1.125rem'
				}
			}
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '24px'
				}
			}
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					padding: '24px'
				}
			}
		}
	});

	// eslint-disable-next-line react/react-in-jsx-scope
	const routing = useRoutes(!token ? [{path: "/login", element:<SignInSide/>}, {path:"*", element:<SignInSide/>}] : routes);
	
	// eslint-disable-next-line react/react-in-jsx-scope
	return  <ThemeProvider theme={baseTheme}>
		{routing}
		</ThemeProvider>;
}

export default App;
