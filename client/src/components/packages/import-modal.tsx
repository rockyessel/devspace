'use client'

import React, { useState } from 'react';
import { importPackage } from '@/utils/services/api';
import { TbCloudDownload, TbSelector } from 'react-icons/tb';
import Image from 'next/image';

function ImportModal() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const options = [
    { value: 'rust', label: 'Rust', image: '/rust.png' },
    { value: 'option2', label: 'Option 2', image: '/rust.png' },
    { value: 'option3', label: 'Option 3', image: '/rust.png' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const selected = options.find((option) => option.value === selectedOption);

  const openModal = () => {
    setIsImportModalOpen(true);
  };

  const closeModal = () => {
    setIsImportModalOpen(false);
  };

  return (
    <div>
      <button
        title='Modal'
        onClick={openModal}
        className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100'
      >
        <TbCloudDownload />
        <span>Import</span>
      </button>
      {isImportModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='bg-white p-8 rounded-lg z-10'>
            <div className='relative inline-block w-48'>
              <button
                onClick={toggleDropdown}
                className='w-full inline-flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 justify-between focus:outline-none'
              >
                {selected && (
                  <>
                    <Image
                      src={selected.image}
                      width={50}
                      height={50}
                      alt={selected.value}
                      className='w-6 h-6 rounded-md'
                      priority
                    />
                    {selected.label}
                  </>
                )}
                <TbSelector />
              </button>
              {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white border border-gray-300 mt-2 rounded shadow'>
                  <ul>
                    {options.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleOptionClick(option.value)}
                        className='w-full inline-flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100'
                      >
                        <Image
                          src={option.image}
                          width={50}
                          height={50}
                          alt={option.value}
                          className='w-6 h-6 rounded-md'
                          priority
                        />
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <br />

            <input
              type='text'
              name='Package Name'
              title='Package Name'
              value={packageName}
              onChange={(event) => setPackageName(event?.target.value)}
              placeholder='Package name'
              className='block px-4 w-full py-1.5 text-gray-700 bg-white border border-gray-200 rounded-md md:w-80 placeholder-gray-400/70 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => importPackage(selectedOption, packageName)}
            >
              Import now
            </button>
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={closeModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportModal;
