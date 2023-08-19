import React from 'react';
import { dummyData } from './body';
import ThreadCard from './card';

interface Props {
  threadData: typeof dummyData;
}

const ThreadWrapper = (props: Props) => {
  return props.threadData.map((thread, index) => (
    <div key={index} className=''>
      <ThreadCard thread={thread} />
      {thread.replied.length > 0 && (
        <hr className='my-2 ml-16 border-gray-200' />
      )}
      <div className='md:ml-16 mb-2'>
        {thread.replied.map((threadReply, index_) => (
          <ThreadCard key={index_} thread={threadReply} />
        ))}
      </div>
    </div>
  ));
};

export default ThreadWrapper;
