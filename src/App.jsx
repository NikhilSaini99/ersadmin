import { ThemeProvider, colors, createTheme } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import routes  from './routes/Router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './hooks/useContext';

import './App';
import SignInSide from './pages/Login/Login';

function App() {
	const navigate = useNavigate()
	const authUse = useContext(AuthContext);
	console.log("reducerState",authUse?.userData?.isAuthenticated)
	const [isUserAuthenticated,setIsUserAuthenticated] = useState(authUse?.userData?.isAuthenticated || false);
	useEffect(()=>{
		if(!authUse?.userData?.isAuthenticated){
			authUse?.dispatch({...authUse?.userData, isAuthenticated:false })
			navigate("/login")
		}
		else {
			authUse?.dispatch({...authUse?.userData, isAuthenticated:true })
			setIsUserAuthenticated(authUse?.userData?.isAuthenticated);
			navigate("/");
		}
	}, [authUse?.userData]);
	

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
	

	const check = JSON.parse(localStorage.getItem('userDetails'));
	// eslint-disable-next-line react/react-in-jsx-scope
	const routing = useRoutes(!check ? [{path: "/login", element:<SignInSide/>}, {path:"*", element:<SignInSide/>}] : routes);
	
		if(!check){
		useNavigate("/login")
	}
	else if(check){
		useNavigate("/")
	}
	// eslint-disable-next-line react/react-in-jsx-scope
	return  <ThemeProvider theme={baseTheme}>
		{routing}
		</ThemeProvider>;
}

export default App;

//, {path:"*", element:<SignInSide/>}