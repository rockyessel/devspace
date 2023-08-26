'use client';

import React from 'react';
import Avatar from 'react-avatar';
import Link from 'next/link';
import { fetchUserByField } from '@/utils/services/api';
import { User } from '@/interface';

interface Props {
  userId: string;
  timestamp: string;
}

const UserChat = (props: Props) => {
  const [user, setUser] = React.useState<User | {}>({});

  const fetchUser = async () => {
    const usr = await fetchUserByField({ _id: props.userId });
    setUser(usr);
  };
  React.useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    user && (
      <span className='inline-flex items-start gap-1'>
        <Avatar
          name={user.name}
          size='40'
          src={user.image}
          className='w-full h-full object-cover object-center'
          round={true}
        />
        <span className='inline-flex items-centre gap-2 text-xs'>
          <Link
            href='/u/profile/@rockyessel'
            className='hover:text-blue-700 hover:underline font-medium'
          >
            {user.name}
          </Link>
          •<span className='text-black/50'>{props.timestamp}</span>
        </span>
      </span>
    )
  );
};

export default UserChat;
