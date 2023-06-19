import { Grid } from '@mui/material';
import DOMPurify from 'dompurify';
import React, { useEffect } from 'react';
import LoaderContainer from '../components/LoaderContainer';
import NewsCard from '../components/NewsCard';
import PageHeader from '../components/PageHeader';
import useFetch from '../hooks/useFetch';

export function News() {
	const {
		loading,
		data: news,
		error,
		callAPI
	} = useFetch('GET', '/news');
	console.log(news)

	useEffect(() => callAPI(), []);

	return (
		<>
			<PageHeader heading={'All News'} buttonText="Add News" link="/Add-News" />
			<LoaderContainer {...{ loading, error }}>
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
		</>
	);
}
