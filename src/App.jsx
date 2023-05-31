import { ThemeProvider, colors, createTheme } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import routes from './routes/Router';

import './App';

function App() {
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
	const routing = useRoutes(routes);

	// eslint-disable-next-line react/react-in-jsx-scope
	return <ThemeProvider theme={baseTheme}>{routing}</ThemeProvider>;
}

export default App;
