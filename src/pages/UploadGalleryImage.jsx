import {
	Box,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import LoaderContainer from '../components/LoaderContainer';
import PageHeader from '../components/PageHeader';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';
import { BiAddToQueue } from 'react-icons/bi';
import EmptyRecords from '../components/EmptyRecords/EmptyRecords';
export default function UploadGalleryImage() {
	const {
		loading,
		data: gallery,
		error,
		callAPI
	} = useFetch('GET', "/gallery-images/web");

	useEffect(() => callAPI(), []);
	// console.log(gallery)
	const myBox = {
		display: 'flex',
		justifyContent: 'flex-end',
		color: '#72b8bf',
		pb: "1rem",
		my:"1.5rem"
	};

	if(gallery) {
		console.log(gallery?.data);
		console.log("xxxxxxxxx", Object.values(gallery.data))
	}
	return (
		<>
			<SubHeader
				title={'All Images Group'}
			/>
			
			<LoaderContainer {...{ loading, error }}>
			<Box
					sx={{
						width: '100%',
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '3rem', lg: '2rem,', xl: '2rem' },
						py: '0rem'
					}}
				>
			<Box sx={myBox}>
						<Link to="/Image">
							<Button
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5 }}
								startIcon={<BiAddToQueue size={25} />}
							>
								{' '}
								Add Gallery Image
							</Button>
						</Link>
					</Box>
				{gallery?.data && Object?.values(gallery?.data).length===0 ? <EmptyRecords/> : <Grid container spacing={6} sx={{marginLeft:"0 !important"}}>
					{ gallery?.data && Object.values(gallery.data).map((item, key) => (
						<Grid item sm={6} md={4} key={key}>
							<GalleryCard {...{ ...item }} refresh={callAPI} data={gallery} />
						</Grid>
					))}
				</Grid>}
				</Box>
			</LoaderContainer>
		</>
	);
}

function GalleryCard({ url, groupName, imageName, id, refresh, }) {
	console.log("inside urlxxxxx", url)
	const navigate = useNavigate();
	console.log(id)
	const {data: gallery,callAPI} = useFetch('DELETE', `/gallery-images/${id}`);
	const splitUrl = () => {
		const newUrl = url?.split(' ')[0];
		if (newUrl) return newUrl;
		return url;
	};
	const newUrl = () => {
		const newUrl = url?.split(',');
		if (newUrl) return newUrl;
		return url;
	};

	useEffect(() => {
		if(gallery){
			refresh();
		}
	}, [gallery]);

	const handleDelete=()=>{
		callAPI();
	}

	return (
		<Card>
			
			<CardActionArea
				component="button"
				onClick={() =>
					navigate('/gallery-images', { state: { data: newUrl() } })
				}
			>
				<CardMedia
					sx={{ height: 140 }}
					image={splitUrl()}
					title="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Group- {groupName}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Image Name - {imageName}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					variant="outlined"
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						handleDelete()
					}}
					startIcon={<MdDelete size={20} />}
				>
					delete
				</Button>
			</CardActions>
		</Card>
	);
}
