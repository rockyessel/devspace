'use client';
import React from 'react';
import Link from 'next/link';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';
import { accordionSideList } from '@/utils/constants/sidebar';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const Sidebar = () => {
  const [clicked, setClicked] = React.useState<number | null>(0);

  const toggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };
  return (
    <aside className='flex-shrink-0 hidden w-64 border-r overflow-y-auto md:block h-[93vh] pb-5'>
      <nav className='flex flex-col w-full h-full justify-between'>
        <ul className='flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto'>
          {accordionSideList.map((listItem, index) => (
            <li key={index}>
              <span
                className='flex items-center p-2 gap-2 text-gray-500 transition-colors rounded-md hover:bg-blue-100'
                onClick={() => toggle(index)}
              >
                {listItem.icon}
                {listItem.slug && listItem.list.length === 0 ? (
                  <Link href={listItem.slug}>{listItem.name}</Link>
                ) : (
                  <span className='cursor-pointer w-full inline-flex items-center justify-between'>
                    {listItem.name}{' '}
                    {clicked === index ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </span>
                )}
              </span>
              {clicked === index ? (
                <ul className='ml-4'>
                  {listItem.list.map((subList, _index) => (
                    <li
                      className='flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-blue-100'
                      key={_index}
                    >
                      <Link href={subList.slug}>{subList.name}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className='flex-shrink-0 px-2 py-4 space-y-2'>
          <button
            onClick={() => signOut()}
            type='button'
            className='flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-black/50 focus:outline-none focus:ring focus:ring-blue-700 focus:ring-offset-1 focus:ring-offset-white'
          >
            <BiLogOut />

            <span>Sign out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
