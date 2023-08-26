'use client';
import React from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { LiaBalanceScaleSolid } from 'react-icons/lia';
import { FaSwatchbook } from 'react-icons/fa';
import { BsSquareHalf } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { MdSpatialTracking } from 'react-icons/md';
import { RiUserStarFill } from 'react-icons/ri';

import Image from 'next/image';
import { MetaData } from '@/interface';

interface Props {
  data: MetaData;
}

// #seriliazation #json #serde #syn #dyn

const PackageHeader = (props: Props) => {
  return (
    <section className='bg-[#393939] text-[#d9d9d9] h-96 flex justify-start items-end'>
      <div className='w-full pb-10 px-10 flex items-center justify-between'>
        <div className='flex flex-col gap-10'>
          <div>
            <div className='font-cascadia flex flex-col'>
              <span>
                <ul className='inline-flex items-center gap-1'>
                  {props.data.keywords?.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </span>
              <div className='flex items-end gap-2'>
                <h1 className='text-7xl'>{props.data.packageName}</h1>
                <span className='text-4xl'>{props.data.version}</span>
              </div>
            </div>
            <p className='font-thin text-lg max-w-2xl'>
              {props.data.description}
            </p>

            <div className='font-thin flex items-center gap-5 mt-2'>
              <p>
                <span>Language:</span>{' '}
                <span className='font-bold text-sm'>{props.data.language}</span>
              </p>
              <p>
                <span>Released on:</span>{' '}
                <span className='font-bold text-sm'>8 year ago</span>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-5 font-medium'>
            <p className='flex items-center gap-2'>
              <VscGithubInverted /> Repository
            </p>
            <p className='flex items-center gap-2'>
              <FaSwatchbook /> Documentation
            </p>
            <p className='flex items-center gap-2'>
              <LiaBalanceScaleSolid />
              License
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div>
            <pre className='flex items-center gap-1 border-[1px] p-[1px] justify-between w-[20rem] text-xl bg-[#d9d9d9] text-[#393939] rounded-md px-2.5 py-1.5'>
              <code>cargo add {props.data.packageName}</code>
              <button
                className='bg-[#393939] text-[#d9d9d9] py-1.5 px-2.5 rounded-md'
                title='Search'
                type='submit'
              >
                <BsSquareHalf className='text-xl' />
              </button>
            </pre>

            <div className='flex items-center justify-between'>
              <button
                title='Already tracking'
                className='bg-[#d9d9d9] text-[#393939] rounded-md flex items-center p-2 gap-2'
              >
                <MdSpatialTracking /> Already tracking
              </button>
              <button
                title='I rely on this.'
                className='bg-[#d9d9d9] text-[#393939] rounded-md flex items-center p-2 gap-2'
              >
                <RiUserStarFill /> I rely on this.
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-5'>
              <p className='border-[1px] border-[#d9d9d9] text-[#d9d9d9] rounded-md flex items-center w-fit px-2 py-1.5 gap-2'>
                <VscGithubInverted />{' '}
                <span className='font-medium'>323 Stars</span>
              </p>
              <p className='border-[1px] border-[#d9d9d9] text-[#d9d9d9] rounded-md flex items-center w-fit px-2 py-1.5 gap-2'>
                <HiDownload />{' '}
                <span className='font-medium'>2,322,323 Downloads</span>
              </p>
            </div>
            <div>
              <p className='font-thin'>Owners & Contributors</p>
              <div className='flex mb-5 -space-x-4'>
                {props?.data.owners.map((owner, index) => (
                  <Image
                    key={index}
                    className='w-10 h-10 border-2 border-white rounded-full'
                    src={owner.profile}
                    alt={owner.name}
                    width={30}
                    height={30}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageHeader;
