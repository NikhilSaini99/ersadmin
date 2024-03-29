import { AiFillFolderAdd,AiOutlineTeam,AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BiNews, BiNote } from 'react-icons/bi'
import { FaHome, FaQuestion} from 'react-icons/fa'
import { ImFolderUpload } from 'react-icons/im'
import { MdCorporateFare, MdFeedback, MdLabelImportant, MdOutlineApproval } from 'react-icons/md'
import { TfiGallery, TfiMenuAlt, } from 'react-icons/tfi'
import { MdSettings } from 'react-icons/md'
import {BsClipboard, BsQrCode} from "react-icons/bs"
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
        title: 'Upload Home banner',
        icon: ImFolderUpload,
        href: '/banner',
        childrens: [

        ]
    },
    {
        title: 'Whats New',
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
        title: 'Public Meetings',
        icon: MdOutlineApproval,
        href: '/List-Public-Meetings',
        childrens: []
    },
    {
        title: 'Public  Board',
        icon: MdOutlineApproval,
        href: '/List-Public-Board',
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
        title: 'Add Tax Item Code',
        icon: BsQrCode,
        href: '/List-Tax-Item-Code'
    },
    {
        title: 'Practice Note',
        icon: BiNote,
        href: '/Practice-Notes-List'
    },
    {
        title: 'Team Data',
        icon: AiOutlineTeam,
        href: '/List-Team-Data'
    },
];

export default Menuitems;
