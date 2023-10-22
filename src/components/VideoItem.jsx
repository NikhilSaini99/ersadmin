import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function VideoItem({ title, img, id, link, description,item,refresh }) {
	const navigate = useNavigate();
	const { data, callAPI } = useFetch('DELETE', `/videos/${id}`);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleDelete() {
		callAPI();
	}

	function handleUpdate() {
		navigate('/Video', { state: { formdata: item, status: true } });
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
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="outlined" onClick={handleDelete}>
					delete
				</Button>
				{/* <Button size="small" variant="outlined" onClick={handleUpdate}>
					update
				</Button> */}
			</CardActions>
		</Card>
	);
}
