import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LoaderContainer from '../components/LoaderContainer';
import PageHeader from '../components/PageHeader';
import VideoItem from '../components/VideoItem';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';
import { Button } from '@mui/base';
import { Link } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';

export function UploadVideo() {
	const { loading, data: video, error, callAPI } = useFetch('GET', '/videos/');

	useEffect(() => {
		callAPI();
	}, []);
	const myBox = {
		display: 'flex',
		justifyContent: 'flex-end',
		color: '#72b8bf',
		pb: "1rem",
		my:"1.5rem"
	};

	return (
		<>
			<SubHeader title={'All Videos'}/>
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
						<Link to="/Video">
							<Button
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5, background:"inherit" }}
								startIcon={<BiAddToQueue size={25} />}
							>
								{' '}
								Add Video
							</Button>
						</Link>
					</Box>
				<Grid container spacing={6}>
					{video?.data?.map((item, key) => (
						// eslint-disable-next-line react/jsx-key
						<Grid item sm={6} md={4}>
							<VideoItem
								key={key}
								img={item.url}
								title={item.name}
								description={item.description}
								link={item.url}
							/>
						</Grid>
					))}
				</Grid>
				</Box>
			</LoaderContainer>
		</>
	);

	// async function getVideo() {
	// 	let [err, res] = await request('GET', '/videos/');
	// 	if (!err && res.success) setVideo(res.data);
	// }
}
