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
        title: 'Menu (Update)',
        icon: TfiMenuAlt,
        href: '/Menu',
        childrens: []
    },
    {
        title: 'Upload Home banner',
        icon: ImFolderUpload,
        href: '/banner',
        childrens: [

        ]
    },
    {
        title: 'Whats New (Upload deocument, Update)',
        icon: AiFillFolderAdd,
        href: '/MyWhatsNew'
    },
    {
        title: 'Add Form Data',
        icon: FaWpforms,
        href: '/List-Form-Data',
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
        title: 'Add Contact Branch',
        icon: MdOutlineContactEmergency,
        href: '/ListContactBranch',
        childrens: []
    },
    {
        title: 'Public Meetings (Not Done)',
        icon: MdOutlineApproval,
        href: '/',
        childrens: []
    },
    {
        title: 'Notice Board',
        icon: MdOutlineApproval,
        href: '/List-Notice-Board',
        childrens: []
    },
    {
        title: 'Recently Approved',
        icon: MdOutlineApproval,
        href: '/Recently-Approved-List',
        childrens: []
    },
    {
        title: 'Tender',
        icon: BsClipboard,
        href: '/Tender-List',
        childrens: []
    },
    // {
    //     title: 'Add What New',
    //     icon: AiFillFolderAdd,
    //     href: '/Add-what-new',
    //     childrens: []
    // },
    {
        title: 'Add Tax Calender Data (List, Delete, edit)',
        icon: TbReceiptTax,
        href: '/Add-Text-Calender-Data',
        childrens: []
    },
    {
        title: 'Publication',
        icon: BsClipboard,
        href: '/Publications-List',
        childrens: []
    },
    {
        title: 'Add Corporate Responsibility',
        icon: MdCorporateFare,
        href: '/CorporateResponsibility',
        childrens: []
    },
    // {
    //     title: 'Add Notice Board',
    //     icon: BsClipboard,
    //     href: '/Add-Notice-Board',
    //     childrens: []
    // },
    // {
    //     title: 'Notice Board',
    //     icon: BiNotification,
    //     href: '/Notice-Board'
    // },
    // {
    //     title: 'Important Links',
    //     icon: MdLabelImportant,
    //     href: '/Important-Links'
    // },
    
    {
        title: 'User Feedbacks',
        icon: MdFeedback,
        href: '/User-FeedBacks'
    },
    {
        title: 'Settings',
        icon: MdSettings,
        href: '/setting'
    },
    {
        title: 'FAQ',
        icon: FaQuestion,
        href: '/FAQ'
    },
    {
        title: 'Add Tax Item Code (Not Done)',
        icon: FaQuestion,
        href: '/'
    },
    {
        title: 'Practice Note (Not Done)',
        icon: FaQuestion,
        href: '/'
    },
];

export default Menuitems;
