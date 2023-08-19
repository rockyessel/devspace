import React from 'react';
import Image from 'next/image';
import { AiOutlineLink, AiOutlineLike, AiOutlineEye } from 'react-icons/ai';

const ArticleCard = () => {
  return (
    <li className='w-[400px] h-auto bg-[#393939] text-[#d9d9d9] p-2 rounded-md flex flex-col justify-between'>
      <header className='flex flex-col'>
        <p className='inline-flex flex-wrap items-center gap-2'>
          <span className='hover:underline cursor-pointer'>#tailwindcss</span>
          <span className='hover:underline cursor-pointer'>#nextjs</span>
          <span className='hover:underline cursor-pointer'>#typography</span>
          <span className='hover:underline cursor-pointer'>#css</span>
          <span className='hover:underline cursor-pointer'>#frontend</span>
        </p>
        <p className='font-bold text-lg'>
          Tailwind CSS With Next.js and Typography - (v2.3.4).
        </p>
        <nav>
          <ul className='inline-flex items-center gap-5'>
            <li className='inline-flex items-center gap-1'>
              <AiOutlineLike />
              12.3K
            </li>
            <li className='inline-flex items-center gap-1'>
              <AiOutlineEye />
              14.5K
            </li>
          </ul>
        </nav>
      </header>
      <main className='w-full h-20  font-thin'>
        JavaScript is most known as the scripting language for Web pages, but
        used in many non-browser environments as well such as node.js.....
      </main>
      <footer className='flex items-center justify-between'>
        <div className='flex items-end gap-2'>
          <div className='border-[1px] border-[#d9d9d9] rounded-full p-0.5'>
            <img
              className='w-10 h-10 rounded-full'
              width={30}
              height={30}
              src='https://crates.io/assets/cargo.png'
              alt='Crate.io Logo'
            />
          </div>
          <p className='inline-flex flex-col gap-y-0 leading-none'>
            <span className='text-[20px] font-medium p-0 m-0'>Crate.io</span>
            <span className='text-[10px] font-normal p-0 m-0'>
              Added on 8 Jul 2023
            </span>
          </p>
        </div>
        <div>
          <button
            type='button'
            title='Read Article'
            className='bg-[#d9d9d9] text-[#393939] rounded-md flex items-center p-2 gap-2 font-bold'
          >
            Read Article <AiOutlineLink />
          </button>
        </div>
      </footer>
    </li>
  );
};

export default ArticleCard;
