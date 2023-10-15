import {
	Box,
	Container,
	Hidden,
	Typography,
	experimentalStyled,
	useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './Header';
import Sidebar from './Sidebar';
import HeaderImg from '../assets/images/2.svg';
import subHeader from '../assets/images/3.svg';
import Logo from '../assets/images/ers-logo.png';

import { SidebarWidth } from './Sidebar';
// Create a theme instance.
const TopbarHeight = 120;
// const subHeadHeight = 60;

const MainWrapper = experimentalStyled('div')(() => ({
	display: 'flex',
	minHeight: '100vh',
	overflow: 'hidden',
	width: '100%',
	backgroundColor: '#fff'
}));

const PageWrapper = experimentalStyled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	overflow: 'hidden',

	backgroundColor: 'theme.palette.background.default',
	[theme.breakpoints.up('lg')]: {
		// paddingTop: TopbarHeight
	},
	[theme.breakpoints.down('lg')]: {
		paddingTop: '64px'
	}
}));
const MainLayout = () => {
	const [isSidebarOpen] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
	return (
		<MainWrapper>
			<Hidden lgUp>
				<DashboardNavbar onMobileNavOpen={() => setMobileSidebarOpen(true)} />
			</Hidden>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				isMobileSidebarOpen={isMobileSidebarOpen}
				onSidebarClose={() => setMobileSidebarOpen(false)}
			/>
			<PageWrapper>
				<Container
					maxWidth={false}
					sx={{
						paddingRight: '0!important',
						paddingLeft: isSidebarOpen && lgUp ? '347px!important' : ''
					}}
				>
					<HeaderNew TopbarHeight={TopbarHeight}/>
					<Box
						sx={{
							minHeight: 'calc(100vh - 170px)',
							p: "0 0 8px 0"
						}}
					>
						<Outlet />
					</Box>
				</Container>
			</PageWrapper>
		</MainWrapper>
	);
};

export default MainLayout;

const HeaderNew = ({TopbarHeight}) => {
	return (
		<>
			<Box sx={{ position: 'relative', maxHeight:`${TopbarHeight}px`, }}>
				<Box>
				<img
					src={HeaderImg}
					alt="img"
					width="100%"
					style={{ objectFit: 'cover' }}
				/>
				</Box>
				
				<Box sx={{ position: 'absolute', bottom: '0' }}>
					<img src={Logo} width="100%" height="100%" alt="logo" />
				</Box>
			</Box>
		</>
	);
};

export const SubHeader = ({title}) => {
	return (
		<>
			<Box sx={{ position: 'relative', height:`min-content` }}>
				<Box>
				<img
					src={subHeader}
					width="100%"
					height="100%"
					alt="logo"
					style={{ objectFit: 'cover' }}
				/>
				</Box>
				<Box sx={{position:"absolute", bottom: "calc(100% - 80%)", pl:"24px"}}>
					<Typography variant='h5' fontWeight={600}>{title}</Typography>
				</Box>
			</Box>
		</>
	);
};
