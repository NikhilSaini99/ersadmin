import { useState } from 'react';
import React from 'react';
import {
	Box,
	Typography,
	Button,
	Grid,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	TablePagination,
	IconButton
} from '@mui/material';


import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useFetch from '../../hooks/useFetch';
import LoaderContainer from '../../components/LoaderContainer';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../../layouts/MainLayout';
import EmptyRecords from '../../components/EmptyRecords/EmptyRecords';


const ListContactBranch = () => {
	const { loading, error, data: contactBranch, callAPI } = useFetch('GET', '/contact');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset to the first page when changing rows per page
	};

	// Calculate the starting index and ending index for the current page
	const startIndex = page * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;

	// Get the current page's data from the 'tender' array
	const currentPageData = contactBranch?.data?.slice(startIndex, endIndex) || [];

	useEffect(() => {
		callAPI();
	}, []);

	const myBox = {
		display: 'flex',
		justifyContent: 'flex-end',
		color: '#72b8bf',
		pb: "1rem",
	};
	return (
		<>
			<SubHeader title={'Contact Branch'} />
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						width: '100%',
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '3rem', lg: '5rem,', xl: '10rem' },
						py: '1rem'
					}}
				>
					<Box sx={myBox}>
						<Link to="/Add-Contact-Branch">
							<Button
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5 }}
								startIcon={<BiAddToQueue size={25} />}
							>
								{' '}
								Add Contact Branch
							</Button>
						</Link>
					</Box>
					{contactBranch?.data?.length===0 ? <EmptyRecords/> : <TableContainer
						component={Paper}
						sx={{ '& th, & td': { border: '0.1rem solid rgba(0,0,0,0.1)' } }}
					>
						<Table aria-label="Tender-Table">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: '#DFDFDF',
										'& > *': {
											fontWeight: 'bold !important',
											fontSize: '1rem !important',
											textAlign: 'center !important'
										}
									}}
								>
									<TableCell>Branch Name</TableCell>
									<TableCell>Location</TableCell>
									<TableCell>City</TableCell>
									<TableCell>State</TableCell>
									<TableCell>Contact</TableCell>
									<TableCell>Lat</TableCell>
									<TableCell>long</TableCell>
									<TableCell>HeadQuarter</TableCell>
									<TableCell>Delete</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentPageData?.map((item, key) => (
									<ContactBranchList
										key={key}
										branchName={item.branchName}
										branchLocation={item.branchLocation}
										branchCity={item.branchCity}
										branchState={item.branchState}
										contactNo={item.contactNo}
										lat={item.lat}
										long={item.long}
										isHeadQuater={item.isHeadQuater}
										refresh={callAPI}
										id={item.id}
										item={item}
									/>
								))}
							</TableBody>
						</Table>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={contactBranch?.data?.length || 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableContainer>}
				</Box>
			</LoaderContainer>
		</>
	)
}

export default ListContactBranch

const ContactBranchList = ({
	branchName,
	branchLocation,
	branchCity,
	branchState,
	contactNo,
	lat,
	long,
	isHeadQuater,
	item,
	refresh,
	id,


}) => {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/contact/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Add-Contact-Branch', { state: { formdata: item, status: true } });
	}


	return (
		<>
			<TableRow
				sx={{
					'& > *': {
						textAlign: 'center !important'
					},
					'&:hover': {
						background: '#F2F2F2'
					}
				}}>
				<TableCell>{branchName}</TableCell>
				<TableCell>{branchLocation}</TableCell>
				<TableCell>{branchCity}</TableCell>
				<TableCell>{branchState}</TableCell>
				<TableCell>{contactNo}</TableCell>
				<TableCell>{lat}</TableCell>
				<TableCell>{long}</TableCell>
				<TableCell>{isHeadQuater ? "Yes" : "No"}</TableCell>
				<TableCell>
					<IconButton onClick={handleDelete}>
						<DeleteIcon sx={{ color: 'red' }} />
					</IconButton>
				</TableCell>
				<TableCell>
					<IconButton onClick={handleUpdate}>
						<EditIcon sx={{ color: 'lightgreen' }} />
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};
