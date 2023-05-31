import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import LoaderContainer from '../components/LoaderContainer';
import PageHeader from '../components/PageHeader';
import VideoItem from '../components/VideoItem';
import useFetch from '../hooks/useFetch';

export function UploadVideo() {
	const { loading, data: video, error, callAPI } = useFetch('GET', '/videos/');

	useEffect(() => {
		callAPI();
	}, []);

	return (
		<>
			<PageHeader heading={'All Videos'} buttonText="Add Video" link="/Video" />
			<LoaderContainer {...{ loading, error }}>
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
			</LoaderContainer>
		</>
	);

	// async function getVideo() {
	// 	let [err, res] = await request('GET', '/videos/');
	// 	if (!err && res.success) setVideo(res.data);
	// }
}
