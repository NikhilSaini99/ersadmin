import { AiFillFolderAdd,AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BiNews, BiNotification } from 'react-icons/bi'
import { FaHome, FaVideo ,FaQuestion} from 'react-icons/fa'
import { ImFolderUpload } from 'react-icons/im'
import { MdCorporateFare, MdFeedback, MdLabelImportant, MdOutlineApproval } from 'react-icons/md'
import { TbReceiptTax } from 'react-icons/tb'
import { TfiGallery, TfiMenuAlt, } from 'react-icons/tfi'
import { MdSettings } from 'react-icons/md'
import {BsClipboard} from "react-icons/bs"
import {MdOutlineContactEmergency} from 'react-icons/md'
import {FaWpforms} from "react-icons/fa"






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
    // {
    //     title: 'Add What New',
    //     icon: AiFillFolderAdd,
    //     href: '/Add-what-new',
    //     childrens: []
    // },
    {
        title: 'Add Tax Calender Data',
        icon: TbReceiptTax,
        href: '/Add-Text-Calender-Data',
        childrens: []
    },
    {
        title: 'Add Corporate Responsibility',
        icon: MdCorporateFare,
        href: '/Add-Corporate-Responsibility',
        childrens: []
    },
    {
        title: 'Add Form Data',
        icon: FaWpforms,
        href: '/Add-Form-Data',
        childrens: []
    },
    {
        title: 'Add Contact Branch',
        icon: MdOutlineContactEmergency,
        href: '/Add-Contact-Branch',
        childrens: []
    },
    {
        title: 'Add Notice Board',
        icon: BsClipboard,
        href: '/Add-Notice-Board',
        childrens: []
    },
    {
        title: 'Add Recently Approved',
        icon: MdOutlineApproval,
        href: '/Add-Recently-Approved',
        childrens: []
    },
    {
        title: 'Publication',
        icon: BsClipboard,
        href: '/Publications-List',
        childrens: []
    },
    {
        title: 'Tender',
        icon: BsClipboard,
        href: '/Tender-List',
        childrens: []
    },
    {
        title: 'Upload Gallery Image',
        icon: TfiGallery,
        href: '/Upload-Gallery-Image',
        childrens: []
    },
    {
        title: 'Upload Videos',
        icon: AiOutlineVideoCameraAdd,
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
        icon: MdSettings,
        href: '/setting'
    },
    {
        title: 'Whats New',
        icon: AiFillFolderAdd,
        href: '/MyWhatsNew'
    },
    {
        title: 'FAQ',
        icon: FaQuestion,
        href: '/FAQ'
    },
];

export default Menuitems;
