import React from 'react';
import { useLocation } from 'react-router-dom';
export function GalleryImage() {
	const { state } = useLocation();

	console.log('strate==>', state);
	const newArr = [...state.data];
	console.log(newArr);
	return (
		<>
			<div className="flex flex-wrap  gap-16 p-14">
				{newArr.map((img, key) => (
					<img key={key} src={img} width={400} />
				))}
			</div>
		</>
	);
}
