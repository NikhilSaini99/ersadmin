import { Box, Button, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CustomModal from '../components/Modal/Modal';

const GridThreeAutoColumn = styled(Box)(() => ({
	padding: '2rem 2rem 0 2rem',
	display: 'grid',
	gridTemplateColumns: 'repeat(3, minmax(250px, 1fr))',
	gridTemplateRows: 'auto',
	alignItems: 'stretch',
	justifyItems: 'center',
	justifyContent: 'space-evenly',
	gap: "1rem"
}));

export function GalleryImage() {
	const { state } = useLocation();
	const [deleteId, setDeleteId] = useState(0)
	const {callAPI} = useFetch('DELETE', `/gallery-images/${deleteId}`);
	console.log("state", state);
	const newArr = [...state.data];
	const [OpenModal, setOpenModal] = useState(false);
	function handleModal(deletId) {
		setOpenModal(true)
		setDeleteId(deletId)
	}
	const handleClose = () => {
		setOpenModal(false);
	};

	useEffect(()=>{
		if(callAPI){
			callAPI()
		}
	},[deleteId])
	return (
		<>
			<GridThreeAutoColumn>
				{newArr?.map((img, key) => (
					<><Box key={key} className="flex flex-col items-end gap-3">
						<img src={img?.url} className='object-cover w-full h-full rounded-lg hover:opacity-80 cursor-pointer' />
						<Button type="submit" size="large" variant="contained" onClick={()=>handleModal(img?.id)}>
							Delete
						</Button>
					</Box><CustomModal isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI} /></>
				))}
			</GridThreeAutoColumn>
		</>
	);
}
