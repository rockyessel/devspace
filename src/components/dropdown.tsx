'use client';
import { useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const Dropdown = () => {
  const [isList, setIsList] = useState(false);
  return (
    <div>
      <div
        onClick={() => setIsList(!isList)}
        className='w-32 p-4 shadow rounded text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer'
      >
        Chat Mode
        <div>{isList ? <MdArrowDropUp /> : <MdArrowDropDown />}</div>
      </div>
      {isList && (
        <div className='w-32 p-4 shadow rounded'>
          <div className='flex items-center justify-between'>
            <p className='text-sm leading-normal ml-2 text-gray-800'>
              Instagram
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
