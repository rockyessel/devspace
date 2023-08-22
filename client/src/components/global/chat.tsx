'use client';
import React from 'react';
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsEmojiLaughing,
  BsSendPlus,
} from 'react-icons/bs';

import Avatar from 'react-avatar';
import Link from 'next/link';

const Chat = () => {
  const [status, setStatus] = React.useState<'Live' | 'Message'>('Message');
  const [minimize, setMinimize] = React.useState('600');
  const [editableContent, setEditableContent] = React.useState('');

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    const newContent = event.currentTarget.innerText;
    setEditableContent(newContent);
  };
  const styles = {
    height: `${minimize}px`,
    transition: 'height 0.5s ease-in-out',
    transitionDelay: '0.2s',
  };

  return (
    <div className='fixed bottom-0 right-0 flex items-end h-0 text-black'>
      <div
        style={styles}
        className={`w-full md:w-[400px] border-[1px] mr-10 relative flex flex-col bottom-0 transition duration-1000 ease-out shadow-md rounded-t-lg`}
      >
        <div className='w-full border-b-[1px] flex items-center justify-between px-4 py-3.5 text-black'>
          <span className='font-bold'>{status}</span>

          <span className='cursor-pointer'>
            {minimize === '50' ? (
              <BsChevronDoubleUp onClick={() => setMinimize('600')} />
            ) : (
              <BsChevronDoubleDown onClick={() => setMinimize('50')} />
            )}
          </span>
        </div>
        <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto'>
          <div>
            <span className='inline-flex items-start gap-1'>
              <Avatar
                name={'Rocky Essel'}
                size='40'
                className='w-full h-full object-cover object-center'
                round={true}
              />
              <span className='inline-flex items-centre gap-2 text-xs'>
                <Link
                  href='/u/profile/@rockyessel'
                  className='hover:text-blue-700 hover:underline font-medium'
                >
                  Rocky Essel
                </Link>
                •<span className='text-black/50'>3:38 PM</span>
              </span>
            </span>
            <div className='w-full hover:bg-gray-50 p-2'>
              <div className='ml-10 relative prose-sm'>
                <p>
                  Hi Rocky! Im sorry for the delay. Getting back to you. Is this
                  even possible to post our content on freeCodeCamp, does it
                  align with the website rules? If it is ok I guess it could be
                  great. Also, wed love to see articles on hackernoon from your
                  page. Would this be a problem? I head that hackernoon
                  restricts promotional articles. Do you know about that?
                </p>
                <p>
                  Regarding the budget - we can adapt based on your
                  expectations. Could you give an approximate price for article
                  or per word? Thanks!
                </p>
                <p>😎🤣😶🤩😍</p>
              </div>
            </div>
          </div>
          <div>
            <span className='inline-flex items-start gap-1'>
              <Avatar
                name={'Rocky Essel'}
                size='40'
                className='w-full h-full object-cover object-center'
                round={true}
              />
              <span className='inline-flex items-centre gap-2 text-xs'>
                <Link
                  href='/u/profile/@rockyessel'
                  className='hover:text-blue-700 hover:underline font-medium'
                >
                  Rocky Essel
                </Link>
                •<span className='text-black/50'>3:38 PM</span>
              </span>
            </span>
            <div className='w-full hover:bg-gray-50 p-2'>
              <div className='ml-10 relative prose-sm'>
                <p>
                  Hi Rocky! Im sorry for the delay. Getting back to you. Is this
                  even possible to post our content on freeCodeCamp, does it
                  align with the website rules? If it is ok I guess it could be
                  great. Also, wed love to see articles on hackernoon from your
                  page. Would this be a problem? I head that hackernoon
                  restricts promotional articles. Do you know about that?
                </p>
                <p>
                  Regarding the budget - we can adapt based on your
                  expectations. Could you give an approximate price for article
                  or per word? Thanks!
                </p>
                <p>😎🤣😶🤩😍</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-4 mb-2'>
          <div className='w-full flex items-center gap-1 px-4 py-2 border-[1px] rounded-md bg-gray-50 max-h-20 relative'>
            <BsEmojiLaughing className='text-blue-500 text-xl' />
            <div
              className='min-h-[1rem] flex-1 max-h-20 w-full content-center outline-none relative overflow-y-auto'
              contentEditable
              onInput={handleContentChange}
            ></div>
            <BsSendPlus className='text-blue-500 text-xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
