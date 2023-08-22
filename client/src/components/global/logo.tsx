import React from 'react';
import Link from 'next/link';
import { SiDpd } from 'react-icons/si';

const Logo = () => {
  return (
    <Link href='/' className='flex items-center mr-4'>
      <SiDpd className='text-4xl' />
      <span className='self-center text-2xl font-semibold whitespace-nowrap'>
        dev<span className='font-extrabold underline'>space</span>
      </span>
    </Link>
  );
};

export default Logo;
