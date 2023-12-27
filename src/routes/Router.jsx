import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import FAQ, { AddFAQ } from '../pages/FAQ';
import Menu from '../pages/Menu';
import { Video } from '../pages/Video';
import SignInSide from '../pages/Login/Login';
import { GalleryImage } from '../pages/GalleryImage';
import { UploadVideo } from '../pages/UploadVideo';
import { Setting } from '../pages/setting';
import { News } from '../pages/News';
import { Banner } from '../pages/Banner';

import LazyLoad from '../components/LazyLoad';
import { AddNews } from '../pages/AddNews';
import CreateImage from '../pages/CreateImage';
import AddBanner from '../pages/AddBanner';
import AddWhatNew from '../pages/AddWhatNew';
import AddCorporateResponsibility from '../pages/AddCorResp';
import UploadGalleryImage from '../pages/UploadGalleryImage';
import FullLayout from '../layouts/MainLayout';
import UserFeedBacks from '../pages/UserFeedback';
import ListAboutUsTeam from '../pages/AboutUsTeam/ListAboutUsTeam';
import AboutUsTeam from '../pages/AboutUsTeam/AboutUsTeam';
import AddTaxItemCode from '../pages/TaxItemCode/AddTaxItemCode';
import ListTaxItem from '../pages/TaxItemCode/ListTaxItem';
import ListPracticeNotes from '../pages/PracticeNotes/ListPracticeNotes';
import AddPracticeNotes from '../pages/PracticeNotes/AddPracticeNotes';
import ListPublicMeeting from '../pages/PublicMeeting/ListPublicMeeting';
import PublicMeeting from '../pages/PublicMeeting/PublicMeeting';
import ListFormData from '../pages/FormData/ListFormData';
import ListContactBranch from '../pages/ContactBranch/ListContactBranch';
import CorporateResponsibility from '../pages/CorporateResponsibility/CorporateResponsibility';
import ListNoticeBoard from '../pages/NoticeBoard/ListNoticeBoard';
import ListRecentlyApproved from '../pages/RecentlyApproved/ListRecentlyApproved';
import ListPublications from '../pages/Publications/ListPublications';
import AddTender from '../pages/Tender/AddTender';
import ListTender from '../pages/Tender/ListTender';
import AddPublications from '../pages/Publications/AddPublications';
import AddRecentlyApproved from '../pages/RecentlyApproved/AddRecentlyApproved';
import AddNoticeBoard from '../pages/NoticeBoard/AddNoticeBoard';
import AddContactBranch from '../pages/AddContactBranch';
import AddFormData from '../pages/AddFormData';
import AddMenu from '../pages/AddMenu';
import MyNewsPrint from '../pages/MyNewsPrint';
import AddMyWhatsNews from '../pages/AddMyWhatsNews';
import MyWhatsNew from '../pages/MyWhatsNew';
import PAGES_PATH from './params';
import PrivateRoute from './PrivateRoute';

export const RouterConfig = () => {
	return (
		<Routes>
			<Route path="/">
				<Route element={<PrivateRoute Component={FullLayout} />}>
					<Route path="/" element={<Menu />}/>
					<Route path={PAGES_PATH.MENU} element={<Menu />} />
					<Route path={PAGES_PATH.ADD_MENU} element={<AddMenu />} />
					<Route path={PAGES_PATH.NEWS} element={<News />} />
					<Route path={PAGES_PATH.ADD_NEWS} element={<AddNews />} />
					<Route path={PAGES_PATH.BANNER} element={<Banner />} />
					<Route path={PAGES_PATH.ADD_BANNER} element={<AddBanner />} />
					<Route path={PAGES_PATH.UPLOAD_VIDEO} element={<UploadVideo />} />
					<Route path={PAGES_PATH.VIDEO} element={<Video />} />
					<Route
						path={PAGES_PATH.UPLOAD_GALLERY_IMAGE}
						element={<UploadGalleryImage />}
					/>
					<Route path={PAGES_PATH.CREATE_IMAGE} element={<CreateImage />} />
					<Route path={PAGES_PATH.GALLERY_IMAGE} element={<GalleryImage />} />
					<Route path={PAGES_PATH.ADD_CSR} element={<AddWhatNew />} />
					<Route path={PAGES_PATH.CSR} element={<CorporateResponsibility />} />
					<Route path={PAGES_PATH.ADD_CSR} element={<AddCorporateResponsibility />} />
					<Route path={PAGES_PATH.ADD_FORM_DATA} element={<AddFormData />} />
					<Route path={PAGES_PATH.FORM_DATA} element={<ListFormData />} />
					<Route
						path={PAGES_PATH.ADD_CONTACT_BRANCH}
						element={<AddContactBranch />}
					/>
					<Route
						path={PAGES_PATH.CONTACT_BRANCH}
						element={<ListContactBranch />}
					/>
					<Route
						path={PAGES_PATH.RECENTLY_APPROVED}
						element={<ListRecentlyApproved />}
					/>
					<Route
						path={PAGES_PATH.ADD_RECENTLY_APPROVED}
						element={<AddRecentlyApproved />}
					/>
					<Route
						path={PAGES_PATH.PRACTICE_NOTES}
						element={<ListPracticeNotes />}
					/>
					<Route
						path={PAGES_PATH.ADD_PRACTICE_NOTES}
						element={<AddPracticeNotes />}
					/>
					<Route
						path={PAGES_PATH.PUBLICATIONS}
						element={<ListPublications />}
					/>
					<Route
						path={PAGES_PATH.ADD_PUBLICATIONS}
						element={<AddPublications />}
					/>
					<Route path={PAGES_PATH.TENDERS} element={<ListTender />} />
					<Route path={PAGES_PATH.ADD_TENDERS} element={<AddTender />} />
					<Route path={PAGES_PATH.USER_FEEDBACKS} element={<UserFeedBacks />} />
					<Route path={PAGES_PATH.WHATS_NEWS} element={<MyWhatsNew />} />
					<Route
						path={PAGES_PATH.ADD_WHATS_NEWS}
						element={<AddMyWhatsNews />}
					/>
					<Route path={PAGES_PATH.MY_NEWS_PRINT} element={<MyNewsPrint />} />
					<Route path={PAGES_PATH.FAQ} element={<FAQ />} />
					<Route path={PAGES_PATH.ADD_FAQ} element={<AddFAQ />} />
					<Route path={PAGES_PATH.NOTICE_BOARD} element={<ListNoticeBoard />} />
					<Route
						path={PAGES_PATH.ADD_NOTICE_BOARD}
						element={<AddNoticeBoard />}
					/>
					<Route
						path={PAGES_PATH.PUBLIC_MEETING}
						element={<ListPublicMeeting />}
					/>
					<Route
						path={PAGES_PATH.ADD_PUBLIC_MEETING}
						element={<PublicMeeting />}
					/>
					<Route path={PAGES_PATH.TAX_CODE} element={<ListTaxItem />} />
					<Route path={PAGES_PATH.ADD_TAX_CODE} element={<AddTaxItemCode />} />
					<Route path={PAGES_PATH.TEAM_DATA} element={<ListAboutUsTeam />} />
					<Route path={PAGES_PATH.ADD_TEAM_DATA} element={<AboutUsTeam />} />
					<Route path={PAGES_PATH.SETTINGS} element={<Setting />} />
				</Route>

				{'Public Route'}
				<Route path={PAGES_PATH.LOGIN} element={<SignInSide />} />
			</Route>
		</Routes>
	);
};

// const routes = [
// 	{
// 		path: '/',
// 		element: <FullLayout />,
// 		children: [
// 			{
// 				path: 'Menu',
// 				element: <Menu />
// 			},
// 			{
// 				path: 'AddMenu',
// 				element: <AddMenu />
// 			},
// 			{
// 				path: 'News',
// 				element: <News />
// 			},
// 			{
// 				path: 'Banner',
// 				element: <Banner />
// 			},
// 			{
// 				path: 'Add-Banner',
// 				element: <AddBanner />
// 			},
// 			{
// 				path: 'Upload-Video',
// 				element: <UploadVideo />
// 			},
// 			{
// 				path: 'Video',
// 				element: <Video />
// 			},
// 			{
// 				path: 'Upload-Gallery-Image',
// 				element: <UploadGalleryImage />
// 			},
// 			{
// 				path: 'Image',
// 				element: <CreateImage />
// 			},
// 			{
// 				path: 'Add-News',
// 				element: <AddNews />
// 			},
// 			{
// 				path: 'gallery-images',
// 				element: <GalleryImage />
// 			},
// 			{
// 				path: 'Add-what-new',
// 				element: <AddWhatNew />
// 			},
// 			// {
// 			// 	path: 'Add-Text-Calender-Data',
// 			// 	element: <AddTextCalenderData />
// 			// },
// 			{
// 				path: 'Recently-Approved',
// 				element: <RecentlyApproved />
// 			},
// 			{
// 				path: 'Add-Corporate-Responsibility',
// 				element: <AddCorporateResponsibility />
// 			},
// 			{
// 				path: 'CorporateResponsibility',
// 				element: <CorporateResponsibility />
// 			},
// 			{
// 				path: 'Add-Form-Data',
// 				element: <AddFormData />
// 			},
// 			{
// 				path: 'List-Form-Data',
// 				element: <ListFormData />
// 			},
// 			{
// 				path: 'Add-Contact-Branch',
// 				element: <AddContactBranch />
// 			},
// 			{
// 				path: 'ListContactBranch',
// 				element: <ListContactBranch />
// 			},
// 			{
// 				path: 'Add-Notice-Board',
// 				element: <AddNoticeBoard />
// 			},
// 			{
// 				path: 'Recently-Approved-List',
// 				element: <ListRecentlyApproved />
// 			},
// 			{
// 				path: 'Add-Recently-Approved',
// 				element: <AddRecentlyApproved />
// 			},
// 			{
// 				path: 'Practice-Notes-List',
// 				element: <ListPracticeNotes />
// 			},
// 			{
// 				path: 'Add-Practice-Notes',
// 				element: <AddPracticeNotes />
// 			},
// 			{
// 				path: 'Publications-List',
// 				element: <ListPublications />
// 			},
// 			{
// 				path: 'Add-publication',
// 				element: <AddPublications />
// 			},
// 			{
// 				path: 'Tender-List',
// 				element: <ListTender />
// 			},
// 			{
// 				path: 'AddTender',
// 				element: <AddTender />
// 			},
// 			{
// 				path: 'Important-Links',
// 				element: <ImportantLinks />
// 			},
// 			{
// 				path: 'User-FeedBacks',
// 				element: <UserFeedBacks />
// 			},
// 			{
// 				path: 'setting',
// 				element: <Setting />
// 			},
// 			{
// 				path: 'MyWhatsNew',
// 				element: <MyWhatsNew />
// 			},
// 			{
// 				path: 'AddMyWhatsNews',
// 				element: <AddMyWhatsNews />
// 			},
// 			{
// 				path: 'MyNewsPrint',
// 				element: <MyNewsPrint />
// 			},
// 			{
// 				path: 'FAQ',
// 				element: <FAQ />
// 			},
// 			{
// 				path: 'AddFAQ',
// 				element: <AddFAQ />
// 			},
// 			{
// 				path: 'Add-Notice-Board',
// 				element: <AddNoticeBoard />
// 			},
// 			{
// 				path: 'List-Public-Board',
// 				element: <ListNoticeBoard />
// 			},
// 			{
// 				path: 'List-Public-Meetings',
// 				element: <ListPublicMeeting />
// 			},
// 			{
// 				path: 'Add-Public-Meetings',
// 				element: <PublicMeeting />
// 			},
// 			{
// 				path: 'List-Tax-Item-Code',
// 				element: <ListTaxItem />
// 			},
// 			{
// 				path: 'Add-Tax-Item-Code',
// 				element: <AddTaxItemCode />
// 			},
// 			{
// 				path: 'List-Team-Data',
// 				element: <ListAboutUsTeam />
// 			},
// 			{
// 				path: 'Add-Team-Data',
// 				element: <AboutUsTeam />
// 			}
// 		]
// 	},
// 	{
// 		path: '/login',
// 		element: <SignInSide />
// 	}
// ];

// export default routes;
export default RouterConfig;
