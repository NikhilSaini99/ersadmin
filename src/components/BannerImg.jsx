import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import useFetch from '../hooks/useFetch';

export default function BannerImg({
	title,
	img,
	description,
	link,
	id,
	refresh
}) {
	const { loading, data, error, callAPI } = useFetch(
		'DELETE',
		`/banner-images/${id}`
	);
	useEffect(() => {
		if (data?.success) refresh();
	}, [data]);

	return (
		<div>
			<h1 className=" text-3xl mb-4">{title}</h1>
			<a
				href="https://www.youtube.com"
				className="text-blue-800 underline underline-offset-2"
			>
				{link}
			</a>

			<div style={{ position: 'relative' }}>
				<img src={img} className="mt-2 w-full " />

				<div
					style={{
						position: 'absolute',
						// padding: "2px",
						bottom: '0',
						fontWeight: '500',
						width: '100%'
					}}
				>
					<div className="flex justify-between bg-white opacity-75 p-4">
						<div style={{ maxWidth: '90%' }}>
							<p>{description}</p>
						</div>
						<IconButton disabled={loading} onClick={deleteBanner}>
							<MdDelete color="red" size={25} />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
	function deleteBanner() {
		callAPI();
	}
}
