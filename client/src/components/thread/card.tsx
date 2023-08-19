/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaReplyd } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';

interface Props {
  thread: {
    user_name: string;
    time: string;
    username: string;
    user_profile: string;
    thread_content: string;
  };
}

const ThreadCard = (props: Props) => {
  const markdown = `
  ### The world is not easy!
  This is not a matter of whether we should use the text editor.
  So let's write a lot of *things*, so ~the comment~ becomes big enough to house the whole coding generation.
  `;

  return (
    <div className='flex flex-row'>
      <img
        className='object-cover w-12 h-12 border-2 border-gray-300 rounded-full'
        alt={props.thread.user_name}
        src={props.thread.user_profile}
      />
      <div className='flex-col mt-1'>
        <div className='flex items-center flex-1 px-4 font-bold leading-tight'>
          {props.thread.user_name}
          <span className='ml-2 text-xs font-normal text-gray-500'>
            2 weeks ago
          </span>
        </div>
        <div className='prose flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
        <button
          type='button'
          title='Reply'
          className='inline-flex items-center px-1 pt-2 ml-1 flex-column'
        >
          <FaReplyd />
        </button>
        <button
          type='button'
          title='Like'
          className='inline-flex items-center px-1 -ml-1 flex-column'
        >
          <AiOutlineLike />
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;
