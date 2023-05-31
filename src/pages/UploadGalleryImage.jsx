import {
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
import { useNavigate } from 'react-router-dom';
import LoaderContainer from '../components/LoaderContainer';
import PageHeader from '../components/PageHeader';
import useFetch from '../hooks/useFetch';
export function UploadGalleryImage() {
	const {
		loading,
		data: gallery,
		error,
		callAPI
	} = useFetch('GET', '/gallery-images');

	useEffect(() => callAPI(), []);
	return (
		<>
			<PageHeader
				heading={'All Images Group'}
				buttonText="Add Image"
				link="/Image"
			/>
			<LoaderContainer {...{ loading, error }}>
				<Grid container spacing={6}>
					{gallery?.data?.map((item, key) => (
						<Grid item sm={6} md={4} key={key}>
							<GalleryCard {...{ ...item }} />
						</Grid>
					))}
				</Grid>
			</LoaderContainer>
		</>
	);
}

function GalleryCard({ url, groupName, imageName }) {
	const navigate = useNavigate();
	console.log(url, groupName, imageName);
	const splitUrl = () => {
		const newUrl = url?.split(',')[0];
		if (newUrl) return newUrl;
		return url;
	};
	const newUrl = () => {
		const newUrl = url?.split(',');
		if (newUrl) return newUrl;
		return url;
	};
	return (
		<Card>
			<CardActionArea
				component=""
				// href=""
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
					}}
					startIcon={<MdDelete size={20} />}
				>
					delete
				</Button>
				{/* <Button
					variant="outlined"
					size="small"
					style={{ marginLeft: '15px' }}
					startIcon={<FaRegEdit size={20} />}
				>
					update
				</Button> */}
			</CardActions>
		</Card>
	);
}
