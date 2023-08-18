import {
  BiLogOut,
  BiSolidComponent,
  BiSolidDashboard,
  BiSolidUser,
} from 'react-icons/bi';
import { SiPowerpages } from 'react-icons/si';

export const SidebarList = [
  { name: 'Dashboard', slug: '/dashboard', icon: <BiSolidDashboard /> },
  { name: 'Blog', slug: '/dashboard/blog', icon: <BiSolidComponent /> },
  { name: 'Stories', slug: '/dashboard/stories', icon: <SiPowerpages /> },
  { name: 'Profile', slug: '/dashboard/profile', icon: <BiSolidUser /> },
];

export const accordionSideList = [
  {
    name: 'Dashboard',
    slug: '/dashboard',
    list: [],
    icon: <BiSolidDashboard />,
  },
  {
    name: 'Technical Writing',
    slug: '/tw',
    list: [],
    icon: <BiSolidComponent />,
  },
  {
    name: 'Broadcast',
    slug: '/dashboard/broadcast',
    list: [],
    icon: <SiPowerpages />,
  },
  {
    name: 'Messages',
    slug: '/dashboard/msg',
    list: [],
    icon: <BiSolidUser />,
  },
  {
    name: 'Techubs',
    slug: '',
    list: [
      {
        name: 'Packages Hub',
        slug: '/dashboard/tb/packages',
      },
      {
        name: 'Frameworks Hub',
        slug: '/dashboard/tb/frameworks',
      },
      {
        name: 'Database Hub',
        slug: '/dashboard/tb/database',
      },
    ],
    icon: <BiSolidUser />,
  },
];
