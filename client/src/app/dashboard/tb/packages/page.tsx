'use client';

import React from 'react';
import ImportModal from '@/components/packages/import-modal';
import { getAllPackages } from '@/utils/services/api';
import Table from '@/components/tables';
import { Package } from '@/interface';
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlinePlusCircle } from 'react-icons/hi';

const PackagePage = () => {
  const [pkgs, setPkgs] = React.useState<Package[] | []>([]);
  const [pkgLen, setPkgLen] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getAllPackages(currentPage);
        setPkgs(data.allPackages);
        setPkgLen(data.length);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [currentPage]);

  const tablesHeaders = [
    'Name',
    'Status',
    'Language',
    'Owner/Contributors',
    'Package Manager',
    'License',
    '',
  ];

  return (
    <div>
      <section className='container px-4 mx-auto'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <div>
            <div className='flex items-center gap-x-3'>
              <h2 className='text-lg font-medium text-gray-800 dark:text-white'>
                Packages
              </h2>

              <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:text-blue-400'>
                {pkgLen} lists
              </span>
            </div>

            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
              packages added and claim over the cause of time.
            </p>
          </div>

          <div className='flex items-center mt-4 gap-x-3'>
            <ImportModal />
            <button
              title='Add Manually'
              type='button'
              className='flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
            >
              <HiOutlinePlusCircle />
              <span>Add Manually</span>
            </button>
          </div>
        </div>

        <div className='mt-6 md:flex md:items-center md:justify-between'>
          <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse'>
            <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:text-gray-300'>
              View all
            </button>

            <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'>
              Claimed
            </button>

            <button className='px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'>
              Unclaimed
            </button>
          </div>

          <div className='relative flex items-center mt-4 md:mt-0'>
            <span className='absolute'>
              <AiOutlineSearch className='w-5 h-5 mx-3 text-gray-400' />
            </span>
            <input
              type='text'
              placeholder='Search'
              className='block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
        </div>

        <div className='flex flex-col mt-6'>
          <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                <Table headers={tablesHeaders} loading={loading} data={pkgs} />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 sm:flex sm:items-center sm:justify-between '>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Page{' '}
            <span className='font-medium text-gray-700 dark:text-gray-100'>
              1 of {Math.ceil(pkgs.length / pkgLen)}
            </span>
          </div>

          <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:-scale-x-100'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>previous</span>
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={pkgs.length === 0} // Disable if no more packages
              className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <span>Next</span>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:-scale-x-100'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagePage;
