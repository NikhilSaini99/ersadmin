import { Button, Grid } from '@mui/material';
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

const UploadImage = ({ maxImg, images, setImages }) => {
	
	const deleteImage = (idx) => {
		setImages((arr) => {
			const newArr = arr;
			newArr.splice(idx, 1);
			return [...newArr];
		});
	};

	const previewImage = (file) => {
		return URL.createObjectURL(file);
	};

	return (
		<>
			{images.length + 1 <= maxImg && (
				<Button
					variant="outlined"
					component="label"
					// fullWidth
					startIcon={<AiOutlineCloudUpload size="30" />}
				>
					Upload Image
					<input
						hidden
						accept="image/*"
						multiple
						type="file"
						onChange={({ target }) =>
							setImages((prev) => [...prev, ...target.files])
						}
					/>
				</Button>
			)}
			<Grid container direction="row" spacing={2} padding={2}>
				{images.map((item, idx) => (
					<Grid item xs={3} key={idx}>
						<img src={previewImage(item, idx)} style={{ height: '156px' }} />
						<Button
							variant="outlined"
							onClick={() => deleteImage(idx)}
							size="small"
							sx={{ mt: 1 }}
							startIcon={<MdDelete size={20} />}
						>
							Delete
						</Button>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default UploadImage;
