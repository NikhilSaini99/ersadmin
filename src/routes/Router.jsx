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
// import MyWhatsNew from '../pages/MyWhatsNew';
// import AddMyWhatsNews from '../pages/AddMyWhatsNews';
// import MyNewsPrint from '../pages/MyNewsPrint';
import FAQ, { AddFAQ } from '../pages/FAQ';
// import AddMenu from '../pages/AddMenu';
// import AddFormData from '../pages/AddFormData';
// import AddContactBranch from '../pages/AddContactBranch';
// import AddNoticeBoard from '../pages/NoticeBoard/AddNoticeBoard';
// import AddRecentlyApproved from '../pages/RecentlyApproved/AddRecentlyApproved';
// import AddPublications from '../pages/Publications/AddPublications';
// import ListTender from '../pages/Tender/ListTender';
// import AddTender from '../pages/Tender/AddTender';
// import ListPublications from '../pages/Publications/ListPublications';
// import ListRecentlyApproved from '../pages/RecentlyApproved/ListRecentlyApproved';
// import ListNoticeBoard from '../pages/NoticeBoard/ListNoticeBoard';
// import CorporateResponsibility from '../pages/CorporateResponsibility/CorporateResponsibility';
// import ListContactBranch from '../pages/ContactBranch/ListContactBranch';
// import ListFormData from '../pages/FormData/ListFormData';
// import PublicMeeting from '../pages/PublicMeeting/PublicMeeting';
// import ListPublicMeeting from '../pages/PublicMeeting/ListPublicMeeting';
// import AddPracticeNotes from '../pages/PracticeNotes/AddPracticeNotes';
// import ListPracticeNotes from '../pages/PracticeNotes/ListPracticeNotes';
// import ListTaxItem from '../pages/TaxItemCode/ListTaxItem';
// import AddTaxItemCode from '../pages/TaxItemCode/AddTaxItemCode';
// import AboutUsTeam from '../pages/AboutUsTeam/AboutUsTeam';
// import ListAboutUsTeam from '../pages/AboutUsTeam/ListAboutUsTeam';
import SignInSide from '../pages/Login/Login';
// const Login = lazy(() => import('../pages/Login'));

//dynamic import
const  ListAboutUsTeam = lazy(()=>import('../pages/AboutUsTeam/ListAboutUsTeam'));
const  AboutUsTeam = lazy(()=>import('../pages/AboutUsTeam/AboutUsTeam'));
const  AddTaxItemCode = lazy(()=>import('../pages/TaxItemCode/AddTaxItemCode'))
const  ListTaxItem = lazy(()=>import('../pages/TaxItemCode/ListTaxItem'))
const  ListPracticeNotes = lazy(()=>import('../pages/PracticeNotes/ListPracticeNotes'))
const  AddPracticeNotes = lazy(()=>import('../pages/PracticeNotes/AddPracticeNotes'))
const  ListPublicMeeting = lazy(()=>import('../pages/PublicMeeting/ListPublicMeeting'))
const  PublicMeeting = lazy(()=>import('../pages/PublicMeeting/PublicMeeting'))
const  ListFormData = lazy(()=>import('../pages/FormData/ListFormData'))
const  ListContactBranch = lazy(()=>import('../pages/ContactBranch/ListContactBranch'))
const  CorporateResponsibility = lazy(()=>import('../pages/CorporateResponsibility/CorporateResponsibility'))
const  ListNoticeBoard = lazy(()=>import('../pages/NoticeBoard/ListNoticeBoard'))
const  ListRecentlyApproved = lazy(()=>import('../pages/RecentlyApproved/ListRecentlyApproved'))
const  ListPublications = lazy(()=>import('../pages/Publications/ListPublications'))
const  AddTender = lazy(()=>import('../pages/Tender/AddTender'))
const  ListTender = lazy(()=>import('../pages/Tender/ListTender'))
const  AddPublications = lazy(()=>import('../pages/Publications/AddPublications'))
const  AddRecentlyApproved = lazy(()=>import('../pages/RecentlyApproved/AddRecentlyApproved'))
const  AddNoticeBoard = lazy(()=>import('../pages/NoticeBoard/AddNoticeBoard'))
const  AddContactBranch = lazy(()=>import('../pages/AddContactBranch'))
const  AddFormData = lazy(()=>import('../pages/AddFormData'))
const  AddMenu = lazy(()=>import('../pages/AddMenu'))
const  MyNewsPrint = lazy(()=>import('../pages/MyNewsPrint'))
const  AddMyWhatsNews = lazy(()=>import('../pages/AddMyWhatsNews'))
const  MyWhatsNew = lazy(()=>import('../pages/MyWhatsNew'))
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
			{
				path: 'List-Tax-Item-Code',
				element: <ListTaxItem />
			},
			{
				path: 'Add-Tax-Item-Code',
				element: <AddTaxItemCode />
			},
			{
				path: 'List-Team-Data',
				element: <ListAboutUsTeam />
			},
			{
				path: 'Add-Team-Data',
				element: <AboutUsTeam />
			},
		]
	},
	{
		path: "/login",
		element: <SignInSide/>
	},
];

export default routes;
