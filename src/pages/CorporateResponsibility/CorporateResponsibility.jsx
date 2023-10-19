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
	IconButton,
	Avatar
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { SubHeader } from '../../layouts/MainLayout';
import EmptyRecords from '../../components/EmptyRecords/EmptyRecords';

const CorporateResponsibility = () => {
	const { loading, error, data: CSR, callAPI } = useFetch('GET', '/csr');
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
	const currentPageData = CSR?.data?.slice(startIndex, endIndex) || [];

	useEffect(() => {
		callAPI();
	}, []);

	const myBox = {
		display: 'flex',
		justifyContent: 'flex-end',
		color: '#72b8bf',
		pb: '1rem'
	};

	return (
		<>
			<SubHeader title={'Corporate Responsibility List'} />
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						width: { xs: '100%' },
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '3rem', lg: '5rem,', xl: '10rem' },
						py: '1rem'
					}}
				>
					<Box sx={myBox}>
						<Link to="/Add-Corporate-Responsibility">
							<Button
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5 }}
								startIcon={<BiAddToQueue size={25} />}
							>
								{' '}
								Add CSR
							</Button>
						</Link>
					</Box>
					{CSR?.data?.length===0 ? <EmptyRecords/> : <TableContainer
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
									<TableCell width="20%">Name</TableCell>
									<TableCell width="30%">Description</TableCell>
									<TableCell width="15%">Upload Date</TableCell>
									<TableCell>Image</TableCell>
									<TableCell>Delete</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentPageData?.map((item, key) => (
									<CorporateList
										id={item.id}
										key={key}
										name={item.name}
										description={item.description}
										uploadDate={item.uploadDate}
										url={item.url}
										refresh={callAPI}
										item={item}
									/>
								))}
							</TableBody>
						</Table>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={CSR?.data?.length || 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableContainer>}
				</Box>
			</LoaderContainer>
		</>
	);
};

export default CorporateResponsibility;

const CorporateList = ({
	name,
	description,
	uploadDate,
	url,
	refresh,
	id,
	item
}) => {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/csr/${id}`);
	const [showMore, setShowMore] = useState(false);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Add-Corporate-Responsibility', {
			state: { formdata: item, status: true }
		});
	}

	const MAX_LENGTH = 80;

	const truncateLength = (text) => {
		const finalString = text.slice(0, MAX_LENGTH);
		return showMore ? text : finalString + '....';
	};

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
				}}
			>
				<TableCell>{name}</TableCell>
				<TableCell>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems:'center' }}>
						<Typography variant="body1">
							{truncateLength(description)}
						</Typography>{' '}
						<Button sx={{justifyContent:"flex-end", width:"100%"}} onClick={()=>setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</Button>
					</Box>{' '}
				</TableCell>
				<TableCell>{dayjs(uploadDate).format('DD-MM-YYYY')}</TableCell>
				<TableCell>
					<Avatar width={36} sx={{width:"50px", height:'50px'}}>
						<img src={url} alt="photo" loading="lazy" style={{height:"100%",width:'100%', objectFit:"cover"}}/>
					</Avatar>
				</TableCell>
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
