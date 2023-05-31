import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
// material-ui
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// constant
const headerSX = {
	'& .MuiCardHeader-action': { mr: 0 },
	fontWeight: 600
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

// eslint-disable-next-line react/display-name
const MainCard = forwardRef(
	(
		{
			border = true,
			boxShadow,
			children,
			content = true,
			contentClass = '',
			contentSX = {},
			darkTitle,
			secondary,
			shadow,
			sx = {},
			title,
			...others
		},
		ref
	) => {
		const theme = useTheme();

		return (
			<Card
				ref={ref}
				{...others}
				elevation={4}
				sx={{
					// border: border ? '1px solid' : 'none',
					borderColor: theme.palette.primary[200] + 25,
					// ':hover': {
					// 	boxShadow: 'none'
					// },
					// boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
					borderRadius: '12px',
					backgroundColor: 'rgb(255, 255, 255)',
					color: 'rgb(54, 65, 82)',
					transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
					border: '1px solid rgba(144, 202, 249, 0.145)',
					...sx
				}}
			>
				{/* card header and action */}
				{title && (
					<CardHeader
						sx={headerSX}
						title={
							<Typography variant="h5" fontWeight={600}>
								{title}
							</Typography>
						}
						action={secondary}
					/>
				)}

				{/* content & header divider */}
				{title && <Divider />}

				{/* card content */}
				{content && (
					<CardContent sx={contentSX} className={contentClass}>
						{children}
					</CardContent>
				)}
				{!content && children}
			</Card>
		);
	}
);

MainCard.propTypes = {
	border: PropTypes.bool,
	boxShadow: PropTypes.bool,
	children: PropTypes.node,
	content: PropTypes.bool,
	contentClass: PropTypes.string,
	contentSX: PropTypes.object,
	darkTitle: PropTypes.bool,
	secondary: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
		PropTypes.object
	]),
	shadow: PropTypes.string,
	sx: PropTypes.object,
	title: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
		PropTypes.object
	])
};

export default MainCard;
