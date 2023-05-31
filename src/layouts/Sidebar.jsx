const SidebarWidth = 270;

import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery
} from '@mui/material';
import React from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
// import { SidebarWidth } from "../../../assets/global/Theme-variable";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Logo from '../assets/images/logo.jpeg';
import menue from './data';

const Sidebar = (props) => {
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
	const { pathname } = useLocation();
	const params = useParams();
	const basePath = Object.values(params).reduce(
		(path, param) => path.replace('/' + param, ''),
		pathname
	);
	let isSelected;
	const SidebarContent = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				width: SidebarWidth,
				background: '#D5ECEF'
			}}
		>
			<PerfectScrollbar>
				<Box sx={{ p: 1, px: 2 }}>
					<Link to="/">
						<img
							src={Logo}
							alt="logo"
							style={{ width: '120px', height: '84px' }}
							srcSet=""
						/>
					</Link>
				</Box>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						gap: '20px',
						p: 2,
						marginRight: '2px',
						backgroundColor: '#72B8BF',
						color: 'white'
					}}
				>
					{/* <NavLink to="/admin/account"> */}
					<Avatar
						component={NavLink}
						src={''}
						sx={{
							cursor: 'pointer',
							width: 45,
							height: 45
						}}
						to="/admin/account"
					/>
					<div>
						<Typography
							variant="h5"
							style={{
								color: 'white',
								margin: '10px 0 0 0'
							}}
						>
							ERS Admin
						</Typography>
						<Typography color="white" variant="body2">
							{''}
						</Typography>
					</div>
					{/* </NavLink> */}
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
										button
										className={isSelected && 'shadow-md'}
										component={NavLink}
										to={item.href}
										selected={isSelected}
										sx={{
											mb: 1,
											borderRadius: '10px',
											mx: 1,
											py: 1.2,
											color: isSelected ? '#72B8BF' : '#5F748D',
											background: isSelected ? '#fff!important' : '',
											'&:hover': {
												background: '#fff'
											}
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: '36px',
												color: isSelected ? '#72B8BF' : '#5F748D'
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
