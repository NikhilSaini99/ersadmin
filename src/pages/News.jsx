import { Box, Grid } from '@mui/material';
import DOMPurify from 'dompurify';
import React, { useEffect } from 'react';
import LoaderContainer from '../components/LoaderContainer';
import NewsCard from '../components/NewsCard';
import PageHeader from '../components/PageHeader';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@mui/base';
import { BiAddToQueue } from 'react-icons/bi';

export function News() {
	const { loading, data: news, error, callAPI } = useFetch('GET', '/news');
	console.log(news);

	useEffect(() => callAPI(), []);
	const myBox = {
		display: 'flex !important',
		justifyContent: 'flex-end !important',
		color: '#72b8bf !important',
		pb: '1rem !important'
	};

	return (
		<>
			<SubHeader title={'All News'} />
			<Box sx={{ px: '3rem', my: '1.5rem', width: '100%' }}>
				<LoaderContainer {...{ loading, error }}>

				<Box sx={myBox}>
						<Link to="/Add-News">
							<Button 
								variant="contained"
								size="large"
								sx={{ fontWeight: 600, py: 1.5, background:"#72b8bf !important", color:"white !important" }}
								startIcon={<BiAddToQueue size={25} />}
							>
								{' '}
								Add News
							</Button>
						</Link>
					</Box>
					<Grid container spacing={6}>
						{news?.data?.map((item, key) => (
							<Grid item sm={6} md={4} key={key}>
								<NewsCard
									id={item.id}
									refresh={callAPI}
									img={item.url}
									title={item.newsName}
									description={DOMPurify.sanitize(item.description)}
								/>
							</Grid>
						))}
					</Grid>
				</LoaderContainer>
			</Box>
		</>
	);
}
