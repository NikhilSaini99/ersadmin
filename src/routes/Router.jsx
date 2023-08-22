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
import AddNoticeBoard from '../pages/NoticeBoard/AddNoticeBoard';
import AddRecentlyApproved from '../pages/RecentlyApproved/AddRecentlyApproved';
import AddPublications from '../pages/Publications/AddPublications';
import ListTender from '../pages/Tender/ListTender';
import AddTender from '../pages/Tender/AddTender';
import ListPublications from '../pages/Publications/ListPublications';
import ListRecentlyApproved from '../pages/RecentlyApproved/ListRecentlyApproved';
import ListNoticeBoard from '../pages/NoticeBoard/ListNoticeBoard';
import CorporateResponsibility from '../pages/CorporateResponsibility/CorporateResponsibility';
import ListContactBranch from '../pages/ContactBranch/ListContactBranch';
import ListFormData from '../pages/FormData/ListFormData';
import PublicMeeting from '../pages/PublicMeeting/PublicMeeting';
import ListPublicMeeting from '../pages/PublicMeeting/ListPublicMeeting';
import AddPracticeNotes from '../pages/PracticeNotes/AddPracticeNotes';
import ListPracticeNotes from '../pages/PracticeNotes/ListPracticeNotes';
// const Login = lazy(() => import('../pages/Login'));

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
				path: 'CorporateResponsibility',
				element: <CorporateResponsibility />
			},
			{
				path: 'Add-Form-Data',
				element: <AddFormData />
			},
			{
				path: 'List-Form-Data',
				element: <ListFormData/>
			},
			{
				path: 'Add-Contact-Branch',
				element: <AddContactBranch />
			},
			{
				path: 'ListContactBranch',
				element: <ListContactBranch />
			},
			{
				path: 'Add-Notice-Board',
				element: <AddNoticeBoard />
			},
			{
				path: 'Recently-Approved-List',
				element: <ListRecentlyApproved/>,
			},
			{
				path: 'Add-Recently-Approved',
				element: <AddRecentlyApproved/>,
			},
			{
				path: 'Practice-Notes-List',
				element: <ListPracticeNotes/>,
			},
			{
				path: 'Add-Practice-Notes',
				element: <AddPracticeNotes/>,
			},
			{
				path: 'Publications-List',
				element: <ListPublications />
			},
			{
				path: 'Add-publication',
				element: <AddPublications />
			},
			{
				path: 'Tender-List',
				element: <ListTender />
			},
			{
				path: 'AddTender',
				element: <AddTender />
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
			},
			{
				path: 'Add-Notice-Board',
				element: <AddNoticeBoard />
			},
			{
				path: 'List-Notice-Board',
				element: <ListNoticeBoard />
			},
			{
				path: 'List-Public-Meetings',
				element: <ListPublicMeeting />
			},
			{
				path: 'Add-Public-Meetings',
				element: <PublicMeeting />
			},
		]
	}
	// {
	// 	path: '/login',
	// 	element: <Login />
	// }
];

export default routes;
