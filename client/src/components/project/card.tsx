import React from 'react';

interface Props {}

const ProjectCard = () => {
  return (
    <li className='w-[28rem]'>
      <div className='w-full max-w-md  mx-auto bg-white rounded-3xl shadow-xl shadow-black/20 overflow-hidden'>
        <div className='max-w-md mx-auto'>
          <header
            className='h-[236px] relative'
            style={{
              backgroundImage:
                'url(https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=2000&t=st=1678041911~exp=1678042511~hmac=e4aa55e70f8c231d4d23832a611004f86eeb3b6ca067b3fa0c374ac78fe7aba6)',
            }}
          >
            <span className='bg-yellow-600 p-2 rounded-md ml-2 mt-4 font-bold'>
              Web3.0
            </span>
          </header>
          <main className='px-4 sm:px-6'>
            <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>
              MetaDisplay
            </p>
            <div className='flex flex-row justify-between'>
              <p className='text-[#3C3C4399] text-[17px] mr-2'>
                January 11, 2023•3 min read
              </p>
              <p className='text-blue-600 text-[17px] mr-2'>Gabe Monroy</p>
            </div>
            <p className='text-[#7C7C80] font-[15px] mt-3'>
              Our shrimp sauce is made with mozarella, a creamy taste of shrimp
              with extra kick of spices.
            </p>
          </main>
          <footer className='px-4 sm:px-6'>
            <p className='truncate text-xs'>
              React.js,
              Node.js/Express.js,Typescript,Tailwindcss,Solidity(Thirdweb)
            </p>
          </footer>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
const f = {
  pagePath: '',
    label: '',
  day: 'Date',
  track: [
    {
      visitTime: 'time',
      re_visitTime: 'time',
    },
  ],
  visitCount: 9,
};
