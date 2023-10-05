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

const ListAboutUsTeam = () => {
    const { loading, error, data: tender, callAPI } = useFetch('GET', '/aboutus');
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
	const currentPageData = tender?.data?.slice(startIndex, endIndex) || [];

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
		<SubHeader title={"Team Data"}/>
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '2rem', lg: '3rem,', xl: '4rem' },
						py: '2rem'
					}}
				>
					<Box sx={myBox}>
				<Link to="/Add-Team-Data">
					<Button
						variant="contained"
						size="large"
						sx={{ fontWeight: 600, py: 2 }}
						startIcon={<BiAddToQueue size={25} />}
					>
						{' '}
						Add Team Data
					</Button>
				</Link>
			</Box>
					<TableContainer
						component={Paper}
						sx={{ '& th, & td': { border: '0.1rem solid rgba(0,0,0,0.1)' } }}
					>
						<Table aria-label="Team-Data-Table">
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
									<TableCell width="30%">Name</TableCell>
									<TableCell>Image</TableCell>
                                    <TableCell>Position</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Delete</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentPageData?.map((item, key) => (
									<MyAboutUsTeamList
										key={key}
										name={item.name}
										imgUrl={item.url}
										possition={item.possition}
										description={item.description}
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
							count={tender?.data?.length || 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableContainer>
				</Box>
			</LoaderContainer></>
  )
}

export default ListAboutUsTeam

const MyAboutUsTeamList = ({
	name,
	imgUrl,
	description,
	refresh,
	id,
	item,
    possition
	
}) => {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/aboutus/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Add-Team-Data', { state: { formdata: item, status: true } });
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
                <TableCell sx={{display:"flex", justifyContent:"center"}}>
                    <Avatar width={36} >
                        <img src={imgUrl} alt="photo" loading='lazy'/>
                    </Avatar>
                    
                    </TableCell>
				<TableCell>{possition}</TableCell>
				<TableCell>{description}</TableCell>
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
