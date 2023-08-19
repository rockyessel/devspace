'use client';

import { BsViewList } from 'react-icons/bs';
import { RiArticleLine } from 'react-icons/ri';
import { LiaProjectDiagramSolid } from 'react-icons/lia';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { PiUsersBold } from 'react-icons/pi';
import { SiAlwaysdata } from 'react-icons/si';
import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import ArticleCard from '../article/card';
import ThreadDetails from './thread-details';
import ProjectCard from '../project/card';

interface Props {}

const PackageTabs = () => {
  return (
    <Tabs.Root className='' defaultValue='tab1'>
      <Tabs.List className='flex items-center gap-2.5 font-medium w-full py-5 px-10 bg-[#D9D9D9] rounded-b-md shadow-lg'>
        <Tabs.Trigger
          value='tab1'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1'
        >
          <BsViewList /> Overview
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab2'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1'
        >
          <RiArticleLine /> Articles
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab3'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1'
        >
          <VscCommentDiscussion /> Threads
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab4'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1'
        >
          <LiaProjectDiagramSolid /> Project
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab5'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1'
        >
          <PiUsersBold /> Tackers
        </Tabs.Trigger>
        <Tabs.Trigger
          value='tab6'
          className='px-2 py-1.5 rounded-md hover:bg-[#393939]/60 hover:text-[#d9d9d9] cursor-pointer inline-flex items-center gap-1
        '
        >
          <SiAlwaysdata /> Analytics
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='tab1'>
        <p>
          #seriliazation #json #serde #syn #dyn serde v1.2.3 A generic
          serialization/deserialization framework. Language: Rust Released on: 8
          year ago Repository Documentation License
        </p>
      </Tabs.Content>
      <Tabs.Content value='tab2'>
        <section className='w-full py-5 px-10'>
          <ul className='flex items-center gap-4 flex-wrap'>
            <ArticleCard />
          </ul>
        </section>
      </Tabs.Content>
      <Tabs.Content value='tab3'>
        <ThreadDetails />
      </Tabs.Content>
      <Tabs.Content value='tab4'>
        <ProjectCard />
      </Tabs.Content>
      <Tabs.Content value='tab5'>vdfvdfv</Tabs.Content>
      <Tabs.Content value='tab6'>r3434fffe</Tabs.Content>
    </Tabs.Root>
  );
};

export default PackageTabs;
