import React from 'react';
import { useLocation } from 'react-router-dom';
export function GalleryImage() {
	const { state } = useLocation();

	// console.log('strate==>', ...state.data);
	const newArr = [...state.data];
	console.log(newArr[0].split(" "))
	return (
		<>
			<div className="flex flex-wrap  gap-16 p-14">
				{newArr[0].split(" ").map((img, key) => (
					<img key={key} src={img} width={400} />
				))}
			</div>
		</>
	);
}
