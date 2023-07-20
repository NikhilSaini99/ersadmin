import React, { lazy } from 'react';
import LazyLoad from '../components/LazyLoad';
import { AddTextCalenderData } from '../pages/AddTaxCalenderData';
import { GalleryImage } from '../pages/GalleryImage';
import { UploadVideo } from '../pages/UploadVideo';
import { Video } from '../pages/Video';
import { Setting } from '../pages/setting';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/MainLayout'));
/****End Layouts*****/
import { AddNews } from '../pages/AddNews';
/*****Pages******/
const AddBanner = LazyLoad('../pages', 'AddBanner');
// const Video = LazyLoad('../pages', 'Video');
const CreateImage = LazyLoad('../pages', 'Image');
// const AddNews = LazyLoad('../pages', 'AddNews');
const Menu = LazyLoad('../pages', 'Menu');
const AddWhatNew = LazyLoad('../pages', 'AddWhatNew');
const RecentlyApproved = LazyLoad('../pages', 'RecentlyApproved');
const AddCorporateResponsibility = LazyLoad(
	'../pages',
	'AddCorporateResponsibility'
);
const AddPublication = LazyLoad('../pages', 'AddPublication');
const ImportantLinks = LazyLoad('../pages', 'ImportantLinks');
const UserFeedBacks = LazyLoad('../pages', 'UserFeedBacks');
// const News = LazyLoad('../pages', 'News');
import { News } from '../pages/News';
// const Banner = LazyLoad('../pages', 'Banner');
import { Banner } from '../pages/Banner';

const NoticeBoard = LazyLoad('../pages', 'NoticeBoard');
const UploadGalleryImage = LazyLoad('../pages', 'UploadGalleryImage');
import MyWhatsNew from '../pages/MyWhatsNew';
import AddMyWhatsNews from '../pages/AddMyWhatsNews';
import MyNewsPrint from '../pages/MyNewsPrint';
import FAQ, { AddFAQ } from '../pages/FAQ';
import AddMenu from '../pages/AddMenu';
import AddFormData from '../pages/AddFormData';
import AddContactBranch from '../pages/AddContactBranch';
const Login = lazy(() => import('../pages/Login'));

/*****Routes******/
const routes = [
	{
		path: '/',
		element: <FullLayout />,
		children: [
			{
				path: 'Menu',
				element: <Menu />
			},
			{
				path: 'AddMenu',
				element: <AddMenu />
			},
			{
				path: 'News',
				element: <News />
			},
			{
				path: 'Banner',
				element: <Banner />
			},
			{
				path: 'Add-Banner',
				element: <AddBanner />
			},
			{
				path: 'Upload-Video',
				element: <UploadVideo />
			},
			{
				path: 'Video',
				element: <Video />
			},
			{
				path: 'Upload-Gallery-Image',
				element: <UploadGalleryImage />
			},
			{
				path: 'Image',
				element: <CreateImage />
			},
			{
				path: 'Add-News',
				element: <AddNews />
			},
			{
				path: 'gallery-images',
				element: <GalleryImage />
			},
			{
				path: 'Add-what-new',
				element: <AddWhatNew />
			},
			{
				path: 'Add-Text-Calender-Data',
				element: <AddTextCalenderData />
			},
			{
				path: 'Recently-Approved',
				element: <RecentlyApproved />
			},
			{
				path: 'Add-Corporate-Responsibility',
				element: <AddCorporateResponsibility />
			},
			{
				path: 'Add-Form-Data',
				element: <AddFormData />
			},
			{
				path: 'Add-Contact-Branch',
				element: <AddContactBranch />
			},
			{
				path: 'Add-publication',
				element: <AddPublication />
			},
			{
				path: 'Notice-Board',
				element: <NoticeBoard />
			},
			{
				path: 'Important-Links',
				element: <ImportantLinks />
			},
			{
				path: 'User-FeedBacks',
				element: <UserFeedBacks />
			},
			{
				path: 'setting',
				element: <Setting />
			},
			{
				path: 'MyWhatsNew',
				element: <MyWhatsNew />
			},
			{
				path: 'AddMyWhatsNews',
				element: <AddMyWhatsNews />
			},
			{
				path: 'MyNewsPrint',
				element: <MyNewsPrint />
			},
			{
				path: 'FAQ',
				element: <FAQ />
			},
			{
				path: 'AddFAQ',
				element: <AddFAQ />
			}
		]
	}
	// {
	// 	path: '/login',
	// 	element: <Login />
	// }
];

export default routes;
