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


const ListPublications = () => {
    const { loading, error, data: publications, callAPI } = useFetch('GET', '/publication');
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
	const currentPageData = publications?.data?.slice(startIndex, endIndex) || [];

	useEffect(() => {
		callAPI();
	}, []);

	const myBox = {
		display: 'flex',
		justifyContent: 'space-between',
		color: '#72b8bf'
	};

    
console.log(publications)
  return (
   <>
        <Box sx={myBox}>
				<Typography variant="h4">Publications List</Typography>
				<Link to="/Add-publication">
					<Button
						variant="contained"
						size="large"
						sx={{ fontWeight: 600, py: 2 }}
						startIcon={<BiAddToQueue size={25} />}
					>
						{' '}
						Add Publications
					</Button>
				</Link>
			</Box>
			<LoaderContainer {...{ loading, error }}>
				<Box
					sx={{
						width: '90%',
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '5rem', lg: '5rem,', xl: '10rem' },
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
									<TableCell width="15%">Type</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Document Name</TableCell>
									<TableCell>PDF</TableCell>
                                    <TableCell>Cover Photo</TableCell>
									<TableCell>Delete</TableCell>
									<TableCell>Update</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentPageData?.map((item, key) => (
									<MyPublicationList
										key={key}
										type={item.type}
										description={item.description}
										documentName={item.documentName}
										docURL={item.documentUrl}
										coverPhoto={item.coverPhoto}
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
							count={publications?.data?.length || 0}
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

export default ListPublications


const MyPublicationList = ({
	type,
	description,
	documentName,
	docURL,
	coverPhoto,
	refresh,
	id,
	item
}) => {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/publication/${id}`);

	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate(){
		navigate("/Add-publication", {state:{formdata:item, status:true}})
	}

	function handlePDFdownload(pdfURL){
		fetch(pdfURL)
		.then((response) => response.blob())
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.setAttribute('href', url);
			link.setAttribute('download', 'Publications.pdf');
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
				}}
			>
				<TableCell>{type}</TableCell>
				<TableCell>{description}</TableCell>
				<TableCell>{documentName}</TableCell>
				<TableCell>
					<IconButton onClick={()=>handlePDFdownload(docURL)}>
						<PictureAsPdfIcon sx={{ color: "red"}}/>
					</IconButton>
				</TableCell>
                <TableCell sx={{display:"flex", justifyContent:"center"}}>
                    <Avatar width={36} height={36}>
                        <img src={coverPhoto} alt="photo" loading='lazy'/>
                    </Avatar>
                    
                    </TableCell>
				<TableCell>
					<IconButton onClick={handleDelete}>
						<DeleteIcon sx={{ color: "red" }}/>
					</IconButton>
				</TableCell>
				<TableCell>
					<IconButton onClick={handleUpdate}>
						<EditIcon sx={{ color: "lightgreen" }}/>
					</IconButton>
				</TableCell>
			</TableRow>
		</>
	);
};
