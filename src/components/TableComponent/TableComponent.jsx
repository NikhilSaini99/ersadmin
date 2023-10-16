import React from 'react';
import {
	TablePagination,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	TableContainer,
	Paper,
	Button,
	IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import dayjs from 'dayjs';
import { useState } from 'react';

const TableComponent = (props) => {
	const { tableData, tableName, tableHeaders, isDownload, isDelete, isUpdate } =
		props;

	//tableData - array
	//tableName - string
	//tableHeaders - array
	//isDownload - boolean
	//isDelete - boolean

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset to the first page when changing rows per page
	};

	const startIndex = page * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;

	// Get the current page's data from the 'tender' array
	const currentPageData = tableData.slice(startIndex, endIndex) || [];

	// const handlePDFDownload = (url) => {
	// 	window.open(url);
	// };

	// function handleDelete() {
	// 	callAPI();
	// }

	// function handleUpdate() {
	// 	navigate('/Add-Form-Data', { state: { formdata: item, status: true } });
	// }

    const isoToFullDate = (newDate) =>{
        return dayjs(newDate).format('DD-MM-YYYY')
    }
	return (
		<div>
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
							{tableHeaders?.map((item, key) => (
								<TableCell key={key}>{item}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageData?.map((item, key) => (
							<TableRow
								key={key}
								sx={{
									'& > *': {textAlign: 'center !important'},'&:hover': {background: '#F2F2F2'}}}>
								{Object.keys(item).map((rowItem) => (
									<TableCell key={rowItem}>{
                                        rowItem.includes("date") ? isoToFullDate(item[rowItem]) :  item[rowItem] }</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={tableData.length || 0}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</div>
	);
};

export default TableComponent;


/*
 * <TableCell>
									<Button
										variant="contained"
										color="primary"
										sx={{ backgroundColor: '#2F2483 !important' }}
										onClick={() => handlePDFDownload(item.documentUrl)}
									>
										Downlaod
									</Button>
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
 * 
 * 
 * 
 * 
 * 
 * */