import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../components/BannerImg';
import LoaderContainer from '../components/LoaderContainer';
import useFetch from '../hooks/useFetch';
import { SubHeader } from '../layouts/MainLayout';


export function Banner() {
	const {
		loading,
		data: banner,
		error,
		callAPI
	} = useFetch('GET', '/banner-images/');

	useEffect(() => {
		callAPI();
		
	}, []);
	console.log(banner)
	return (
		<>
		<SubHeader title={'All Banner'} />
			<div className="basis-3/4 flex flex-col  justify-items-end gap-8 mr-16 pt-6">
			
				<div className="flex justify-end">
			
					<Link to="/Add-Banner">
						<div className="text-end">
							<button
								type="submit"
								className="border p-3 rounded-lg font-semibold   active:bg-[#0c0e85] bg-[#72B8BF] text-white "
							>
								{' '}
								Add New Banner
							</button>
						</div>
					</Link>
				</div>
			
				<LoaderContainer {...{ loading, error }}>
					{banner?.data?.map((item, key) => (
						<BannerImg
							key={key}
							img={item.imageurl ? item.imageurl : '/images/bg.png'}
							title={item.imageName}
							description={item.description}
							id={item.id}
							link={item.link}
							refresh={callAPI}
						/>
					))}
				</LoaderContainer>
			</div>
		</>
	);
}
