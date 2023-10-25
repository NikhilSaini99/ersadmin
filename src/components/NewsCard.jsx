import {
	Box,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useFetch from '../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';

export default function NewsCard({ img, title, description, id, refresh,date }) {
	const [showMore, setShowMore] = useState(false);
	
	const navigate = useNavigate()
	const { loading, data, callAPI } = useFetch(
		'DELETE',
		`/news-images/${id}`
	);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	function handleUpdate() {
		navigate('/Add-News', {state:{id:id,description:description,title:title,date:date,status: true}});
	}
	function handleDelete() {
		callAPI();
	}

	const MAX_LENGTH = 150;

	const truncateLength = (text)=> {
		const finalString = text.slice(0, MAX_LENGTH)
		return showMore ? text : `${finalString}....`;
	}
	
	return (
		<>
		
			<Card
				sx={{  minHeight:"350px", height:"200px", overflow: "auto",}}
				key={id}
				elevation={10}
			>
				<CardActionArea
					component="a"
					href=""
					onClick={() => console.log('CardActionArea clicked')}
				>
					
					<CardMedia
						component="img"
						sx={{height:140}}
						image={img.split(',')[0]}
						title="green iguana"
					/>
					
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							dangerouslySetInnerHTML={{
								__html: truncateLength(description)
							}}
						></Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center', alignItems:'center'}}>
					<Button
						variant="outlined"
						size="small"
						disabled={loading}
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						startIcon={<MdDelete size={20} />}
					>
						delete
					</Button>
					<Button
						variant="outlined"
						size="small"
						startIcon={<FaRegEdit size={20} />}
						onClick={()=>handleUpdate(id)}
					>
						update
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
			</Card>
		</>
	);
}
