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
import { SubHeader } from '../../layouts/MainLayout';
import EmptyRecords from '../../components/EmptyRecords/EmptyRecords';
import CustomModal from '../../components/Modal/Modal';


const ListPracticeNotes = () => {
    const { loading, error, data: practiceNote, callAPI } = useFetch('GET', '/practiceNote');

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
	const currentPageData = practiceNote?.data?.slice(startIndex, endIndex) || [];

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
        <SubHeader title={'Practice Notes List'} />

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
            <Link to="/Add-Practice-Notes">
                <Button
                    variant="contained"
                    size="large"
                    sx={{ fontWeight: 600, py: 1.5 }}
                    startIcon={<BiAddToQueue size={25} />}
                >
                    {' '}
                    Add Practice Notes
                </Button>
            </Link>
        </Box>
        {practiceNote?.data?.length===0 ? <EmptyRecords/> :<TableContainer
            component={Paper}
            sx={{ '& th, & td': { border: '0.1rem solid rgba(0,0,0,0.1)' } }}
        >
            <Table aria-label="Practice-Table">
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
                        <TableCell width="30%">Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Document Name</TableCell>
                        <TableCell>PDF</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Update</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentPageData?.map((item, key) => (
                        <PracticeNoteList
                            key={key}
                            type={item.type}
                            name={item.name}
                            documentName={item.documentName}
                            docURL={item.documentUrl}
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
                count={practiceNote?.data?.length || 0}
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

export default ListPracticeNotes

const PracticeNoteList = ({
	type,
	name,
	documentName,
	docURL,
	refresh,
	id,
	item
}) => {
	const navigate = useNavigate();
	const [OpenModal, setOpenModal] = useState(false);

	const { data, callAPI } = useFetch('DELETE', `/practiceNote/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);



	function handleUpdate() {
		navigate('/Add-Practice-Notes', { state: { formdata: item, status: true } });
	}

	function handleDownloadPDF(pdfURL) {
		fetch(pdfURL)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.setAttribute('href', url);
				link.setAttribute('download', 'PracticeNotes.pdf');
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
				<TableCell>{type}</TableCell>
				<TableCell>{name}</TableCell>
				<TableCell>{documentName}</TableCell>
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
			<CustomModal  isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI}/>
		</>
	);
};
