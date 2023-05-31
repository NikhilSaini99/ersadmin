import { AiFillFolderAdd } from 'react-icons/ai'
import { BiNews, BiNotification } from 'react-icons/bi'
import { FaHome, FaVideo } from 'react-icons/fa'
import { ImFolderUpload } from 'react-icons/im'
import { MdCorporateFare, MdFeedback, MdLabelImportant, MdOutlineApproval } from 'react-icons/md'
import { TbReceiptTax } from 'react-icons/tb'
import { TfiGallery, TfiMenuAlt } from 'react-icons/tfi'


const Menuitems = [
    {
        title: 'Home',
        icon: FaHome,
        href: '/'
        ,
        childrens: []
    },
    {
        title: 'Menu',
        icon: TfiMenuAlt,
        href: '/Menu',
        childrens: []
    },
    {
        title: 'News',
        icon: BiNews,
        href: '/News',
        childrens: [
        ]
    },
    {
        title: 'Upload Home banner',
        icon: ImFolderUpload,
        href: '/banner',
        childrens: [

        ]
    },
    {
        title: 'Add What New',
        icon: AiFillFolderAdd,
        href: '/Add-what-new',
        childrens: []
    },
    {
        title: 'Add Tax Calender Data',
        icon: TbReceiptTax,
        href: '/Add-Text-Calender-Data',
        childrens: []
    },
    {
        title: 'Recently Approved',
        icon: MdOutlineApproval,
        href: '/Recently-Approved',
        childrens: []
    },
    {
        title: 'Add Corporate Responsibility',
        icon: MdCorporateFare,
        href: '/Add-Corporate-Responsibility',
        childrens: []
    },
    // {
    //     title: 'Add publication',
    //     icon: MdOutlinePublic,
    //     href: '/Add-publication',
    //     childrens: []
    // },
    {
        title: 'Upload Gallery Image',
        icon: TfiGallery,
        href: '/Upload-Gallery-Image',
        childrens: []
    },
    {
        title: 'Upload Videos',
        icon: FaVideo,
        href: '/Upload-Video',
        childrens: ['/Admin/Project/Forms/Edit-Form', '/Admin/Project/Forms/Form-View']
    },
    {
        title: 'Notice Board',
        icon: BiNotification,
        href: '/Notice-Board'
    },
    {
        title: 'Important Links',
        icon: MdLabelImportant,
        href: '/Important-Links'
    }, {
        title: 'User FeedBacks',
        icon: MdFeedback,
        href: '/User-FeedBacks'
    },
    {
        title: 'Settings',
        icon: MdFeedback,
        href: '/setting'
    }
];

export default Menuitems;
