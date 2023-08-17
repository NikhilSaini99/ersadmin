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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
		justifyContent: 'space-between',
		color: '#72b8bf'
	};

  return (
    <>
    <Box sx={myBox}>
				<Typography variant="h4">Corporate Responsibility List</Typography>
				<Link to="/Add-Corporate-Responsibility">
					<Button
						variant="contained"
						size="large"
						sx={{ fontWeight: 600, py: 2 }}
						startIcon={<BiAddToQueue size={25} />}
					>
						{' '}
						Add CSR
					</Button>
				</Link>
			</Box>
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						width: {xs:"100%", sm:'90%'},
						margin: { xs: '0 auto', lg: '0  auto' },
						px: {xs:"1rem", md: '2rem', lg: '3rem,', xl: '8rem' },
						py: '2rem'
					}}
				>
					<TableContainer
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
									<TableCell>URL</TableCell>
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
					</TableContainer>
				</Box>
			</LoaderContainer>
    </>
  )
}

export default CorporateResponsibility


const CorporateList = ({
	name,
	description,
	uploadDate,
	url,
	refresh,
	id,
	item,
	
}) => {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/csr/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Add-Corporate-Responsibility', { state: { formdata: item, status: true } });
	}

	function handleDownloadPDF(pdfURL) {
		fetch(pdfURL)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.setAttribute('href', url);
				link.setAttribute('download', 'tender.pdf');
				link.click();
			})
			.catch((error) => {
				console.error('Error downloading PDF:', error);
			});
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
				<TableCell>{name}</TableCell>
				<TableCell>{description}</TableCell>
				<TableCell>{dayjs(uploadDate).format('DD-MM-YYYY')}</TableCell>
				<TableCell>
					{url}
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


