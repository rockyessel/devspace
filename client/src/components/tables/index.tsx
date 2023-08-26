'use client';

import React from 'react';
import Image from 'next/image';
import { MdOutlineMoreVert } from 'react-icons/md';
import { Package } from '@/interface';

interface Props {
  data?: Package[];
  loading?: boolean;
  headers?: string[];
}

const Table = (props: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Dropdown = ({ isDropdownOpen }: { isDropdownOpen: boolean }) =>
    isDropdownOpen && (
      <div className='absolute right-10 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow'>
        <ul>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 1
          </li>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 2
          </li>
          <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
            Option 3
          </li>
        </ul>
      </div>
    );

  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          {props.headers?.map((header, index) => (
            <th
              key={index}
              className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
            >
              <button className='flex items-center gap-x-3 focus:outline-none'>
                <span>{header}</span>
              </button>
            </th>
          ))}
          {/* <th className='px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            Status
          </th>

          <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            Language
          </th>

          <th className='px-4 py-3.5 text-sm font-normal text-left  rtl:text-right text-gray-500 dark:text-gray-400'>
            Owners/Contributors
          </th>

          <th className='px-4 py-3.5 text-sm font-normal text-left flex-shrink-0 rtl:text-right text-gray-500 dark:text-gray-400'>
            Package Manager
          </th>

          <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            License
          </th>

          <th className='relative py-3.5 px-4'>
            <span className='sr-only'>Edit</span>
          </th> */}
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {props.loading ? (
          <tr className='relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                Loading...
              </span>
            </td>
          </tr>
        ) : props.data && props.data.length > 0 ? (
          props.data?.map((pkg, index) => (
            <tr key={index}>
              <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
                <div>
                  <h2 className='font-medium text-gray-800 dark:text-white '>
                    {pkg.metaData.packageName}
                  </h2>
                  <code className='text-sm bg-black/50 p-1 text-white border-[1px] rounded-md '>
                    cargo add {pkg.metaData.packageName}
                  </code>
                </div>
              </td>
              <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
                <div className='inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60'>
                  Claimed
                </div>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div>
                  <h4 className='text-gray-700'>{pkg.metaData.language}</h4>
                </div>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex items-center'>
                  {pkg.metaData.owners.map((owner, index_) => (
                    <Image
                      key={index_}
                      width={100}
                      height={100}
                      className='object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0'
                      src={owner.profile}
                      alt={owner.name}
                      priority
                    />
                  ))}
                  <p className='flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full'>
                    +{pkg.metaData.owners.length}
                  </p>
                </div>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60'>
                  Crate.io
                </div>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60'>
                  MIT
                </div>
              </td>
              <td className='px-4 py-4 text-sm whitespace-nowrap relative'>
                <button
                  onClick={toggleDropdown}
                  title='Edit'
                  className='px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100'
                >
                  <MdOutlineMoreVert />
                </button>
                <Dropdown isDropdownOpen={isDropdownOpen} />
              </td>
            </tr>
          ))
        ) : (
          <tr className='relative h-10'>
            <td
              className='absolute inset-0 px-4 text-sm font-medium whitespace-nowrap'
              colSpan={100}
              rowSpan={100}
            >
              <span className='py-2.5 text-center w-full inline-flex items-center justify-center'>
                No Data Yet
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;

{
  /* <tr>
          <td className='px-4 py-4 text-sm font-medium whitespace-nowrap'>
            <div>
              <h2 className='font-medium text-gray-800 dark:text-white '>
                quote
              </h2>
              <code className='text-sm bg-black/50 p-1 text-white border-[1px] rounded-md '>
                cargo add quote
              </code>
            </div>
          </td>
          <td className='px-12 py-4 text-sm font-medium whitespace-nowrap'>
            <div className='inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2'>
              Unclaimed
            </div>
          </td>
          <td className='px-4 py-4 text-sm whitespace-nowrap'>
            <div>
              <h4 className='text-gray-700'>Rust</h4>
            </div>
          </td>
          <td className='px-4 py-4 text-sm whitespace-nowrap'>
            <div className='flex items-center'>
              <Image
                width={100}
                height={100}
                className='object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0'
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
                alt=''
                priority
              />
              <Image
                width={100}
                height={100}
                className='object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0'
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
                alt=''
                priority
              />
              <Image
                width={100}
                height={100}
                className='object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0'
                src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80'
                alt='/'
                priority
              />
              <Image
                width={100}
                height={100}
                className='object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0'
                src='https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
                alt=''
                priority
              />
              <p className='flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full'>
                +4
              </p>
            </div>
          </td>
          <td className='px-4 py-4 text-sm whitespace-nowrap'>
            <div className='inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60'>
              Crate.io
            </div>
          </td>
          <td className='px-4 py-4 text-sm whitespace-nowrap'>
            <div className='inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60'>
              MIT
            </div>
          </td>

          <td className='px-4 py-4 text-sm whitespace-nowrap relative'>
            <button
              onClick={toggleDropdown}
              title='Edit'
              className='px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100'
            >
              <MdOutlineMoreVert />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow'>
                <ul>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    Option 1
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    Option 2
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </td>
        </tr> */
}
