import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CustomModal from './Modal/Modal';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';

export default function VideoItem({ title, img, id, link, description,item,refresh }) {
	const navigate = useNavigate();
	const [OpenModal, setOpenModal] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const { data, callAPI, loading } = useFetch('DELETE', `/videos/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);


	function handleModal() {
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false);
	};

	function handleUpdate() {
		navigate('/Video', { state: { formdata: item, status: true } });
	}

	const MAX_LENGTH = 100;

	const truncateLength = (text)=> {
		const finalString = text.slice(0, MAX_LENGTH)
		return showMore ? text : `${finalString}....`;
	}
	return (
		<Card>
			<div key={title} >
				<iframe
					style={{ width: '100%' }}
					height="355"
					src={link?.slice(
						link?.indexOf('https'),
						link?.indexOf('title') - 2
					)}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				></iframe>
			</div>

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					{truncateLength(description)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="outlined" onClick={handleModal}>
					delete
				</Button>
				<Button
						variant="outlined"
						size="small"
						disabled={loading}
						onClick={(e) => {
							e.stopPropagation();
							setShowMore(!showMore);
						}}
						startIcon={<MdDelete size={20} />}
					>
						{showMore ? "Show Less" : "Show More"}
					</Button>
			</CardActions>
			<CustomModal isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI}/>
		</Card>
	);
}
