import {
	Box,
	Container,
	Hidden,
	experimentalStyled,
	useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './Header';
import Sidebar from './Sidebar';

// Create a theme instance.
const TopbarHeight = 70;

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
		paddingTop: TopbarHeight
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
						// paddingTop: '20px'
						paddingRight: '0!important',
						paddingLeft: isSidebarOpen && lgUp ? '347px!important' : ''
					}}
				>
					<Box
						sx={{
							minHeight: 'calc(100vh - 170px)',
							p: 3
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
