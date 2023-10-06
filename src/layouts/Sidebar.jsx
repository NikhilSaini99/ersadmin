export const SidebarWidth = 350;

import 'react-perfect-scrollbar/dist/css/styles.css';

import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery
} from '@mui/material';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';

import Logo from '../assets/images/logo.jpeg';
// import { SidebarWidth } from "../../../assets/global/Theme-variable";
import PerfectScrollbar from 'react-perfect-scrollbar';
import React from 'react';
import menue from './data';
import profile from '../../public/images/profile.png';
import sidebarBackground from '../../public/images/1.svg';
import { useContext } from 'react';

// import { AuthContext } from '../hooks/useContext';
const Sidebar = (props) => {
	// const authCont = useContext(AuthContext)
	const navigate = useNavigate();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
	const { pathname } = useLocation();
	const params = useParams();
	const basePath = Object.values(params).reduce(
		(path, param) => path.replace('/' + param, ''),
		pathname
	);
	let isSelected;
	const handleLogout = ()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('isAuthenticated');
		navigate("/login")
	}
	const SidebarContent = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: SidebarWidth,
				background: `url(${sidebarBackground})`
			}}
		>
			<PerfectScrollbar>
				<Box sx={{ py: 5, px:2, background: '#373164', height: '162px', width:"100%" }}>
					<Box
						sx={{
							display: 'flex',
							gap: '1rem',
							alignItems:"center",
						}}
					>
						<Box sx={{width:"96px"}}>
						<img
							src={profile}
							alt="logo"
							style={{
								width: '100%',
								height: '100%',
							}}
						/>
						</Box>
						<Box>
						<Typography variant="h6" color="white" fontWeight="bold">ERS Admin</Typography>
						<Button variant="contained" color="success" onClick={handleLogout}>Logout</Button>
						</Box>
					</Box>
				</Box>

				<Divider />

				<Box>
					<List
						sx={{
							mt: 2,
							fontSize: '0.17rem',
							color: '#7A7A7A'
						}}
						// style={}}
					>
						{menue.map((item) => {
							//{/********SubHeader**********/}
							{
								isSelected =
									pathname === item.href || item.childrens?.includes(basePath);
							}
							return (
								<List
									component="li"
									disablePadding
									key={item.title}
									style={{ fontSize: '0.17rem' }}
								>
									<ListItemButton
										onClick={() => {}}
										button="true"
										className={`${isSelected && 'shadow-md'}`}
										component={NavLink}
										to={item.href}
										selected={isSelected}
										sx={{
											mb: 1,
											borderRadius: '10px',
											mx: 1,
											py: 1.2,
											color: isSelected ? '#000000' : '#FFF',
											background: isSelected ? '#fff!important' : '',
											'&:hover': {
												background: '#fff',
												color: 'black'
											}
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: '36px',
												color: isSelected ? '#000000' : '#FBC92A'
											}}
										>
											<item.icon size={22} />
											{/* {item.icon} */}
											{/* <img src={item.icon} /> */}
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{
												fontSize: '1rem',
												fontWeight: 'medium',
												letterSpacing: 0
											}}
										>
											{item.title}
										</ListItemText>
									</ListItemButton>
								</List>
							);
						})}
					</List>
				</Box>
			</PerfectScrollbar>
		</Box>
	);
	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open={props.isSidebarOpen}
				variant="persistent"
				PaperProps={{
					sx: {
						width: 'full'
						// border: "none",
						// boxShadow: "0px 7px 30px 0px rgb(90 114 123 / 11%)",
					}
				}}
			>
				{SidebarContent}
			</Drawer>
		);
	}
	return (
		<Drawer
			anchor="left"
			open={props.isMobileSidebarOpen}
			onClose={props.onSidebarClose}
			PaperProps={{
				sx: {
					width: SidebarWidth,
					boxShadow: '0px 7px 30px 0px rgb(90 114 123 / 11%)'
				}
			}}
			variant="temporary"
		>
			{SidebarContent}
		</Drawer>
	);
};

export default Sidebar;
