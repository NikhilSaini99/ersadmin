/* eslint-disable react/react-in-jsx-scope */
import { ThemeProvider, colors, createTheme } from '@mui/material';
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import routes, { RouterConfig } from './routes/Router';
import { useEffect } from 'react';
import './App';
import SignInSide from './pages/Login/Login';

export const App = () => {
	// const navigate = useNavigate();
	// const token = localStorage.getItem('token');
	// useEffect(() => {
	// 	if (!token) {
	// 		navigate('/login');
	// 	}
	// }, [token]);

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
	// const routing = useRoutes(
	// 	!token ? [{ path: '/login', element: <SignInSide /> }] : routes
	// );
	return (
		<>
			<ThemeProvider theme={baseTheme}>
				{/* {routing} */}
				<RouterConfig />
			</ThemeProvider>
		</>
	);

	// return (
	// 	<>
	// 	<BrowserRouter>
	// 	<RouterConfig/>
	// 	</BrowserRouter>
	// 	</>
	// )
};

export default App;
