import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@mui/material';

import { BiAddToQueue } from 'react-icons/bi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import LoaderContainer from '../../components/LoaderContainer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import React from 'react';
import { SubHeader } from '../../layouts/MainLayout';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmptyRecords from '../../components/EmptyRecords/EmptyRecords';
import CustomModal from '../../components/Modal/Modal';

const ListNoticeBoard = () => {
	const {
		loading,
		error,
		data: noticeBoard,
		callAPI
	} = useFetch('GET', '/noticeBoard');
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
	const currentPageData = noticeBoard?.data?.slice(startIndex, endIndex) || [];

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
			<SubHeader title={'Notice Board'} />
			{/* <Box sx={myBox}></Box> */}
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						width: '100%',
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '3rem', lg: '5rem,', xl: '10rem' },
						py: '1rem'
					}}>

					<Box sx={myBox}>
						<Link to="/Add-Notice-Board">
							<Button
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5 }}
								startIcon={<BiAddToQueue size={20} />}
							>
								{' '}
								Add Notice Board
							</Button>
						</Link>
					</Box>
				{noticeBoard?.data?.length===0 ? <EmptyRecords/> :	<TableContainer
						component={Paper}
						sx={{ '& th, & td': { border: '0.1rem solid rgba(0,0,0,0.1)' } }}>
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
									<TableCell>Name</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Notice</TableCell>
									<TableCell>Document</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>PDF</TableCell>
									<TableCell>Delete</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentPageData?.map((item, key) => (
									<NoticeList
										key={key}
										name={item.name}
										description={item.description}
										docURL={item.documentUrl}
										documentName={item.documentName}
										notice={item.notice}
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
							count={noticeBoard?.data?.length || 0}
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

export default ListNoticeBoard;

const NoticeList = ({
	name,
	notice,
	description,
	docURL,
	documentName,
	refresh,
	id,
	item,
	date
}) => {
	const navigate = useNavigate();
	const [OpenModal, setOpenModal] = useState(false);
	const { data, callAPI } = useFetch('DELETE', `/noticeBoard/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Add-Notice-Board', { state: { formdata: item, status: true } });
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
	function handleModal() {
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false);
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
				<TableCell>{description}</TableCell>
				<TableCell>{notice}</TableCell>
				<TableCell>{documentName}</TableCell>
				<TableCell>{dayjs(date).format('DD-MM-YYYY')}</TableCell>
				<TableCell>
					<IconButton onClick={() => handleDownloadPDF(docURL)}>
						<PictureAsPdfIcon />
					</IconButton>
				</TableCell>
				<TableCell>
					<IconButton onClick={handleModal}>
						<DeleteIcon sx={{ color: 'red' }} />
					</IconButton>
				</TableCell>
				<TableCell>
					<IconButton onClick={handleUpdate}>
						<EditIcon sx={{ color: 'lightgreen' }} />
					</IconButton>
				</TableCell>
			</TableRow>
			<CustomModal isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI}/>
		</>
	);
};
