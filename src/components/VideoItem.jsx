import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react';

export default function VideoItem({ title, img, link, description }) {
	return (
		<Card>
			<iframe
				src={link}
				allow="autoplay; encrypted-media"
				allowfullscreen
				title="video"
				className="w-full h-60"
			/>

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="outlined">
					delete
				</Button>
				<Button size="small" variant="outlined">
					update
				</Button>
			</CardActions>
		</Card>
	);
}
