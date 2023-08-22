import React from 'react';
import { AiOutlineLike, AiOutlineEye, AiOutlineUnlock } from 'react-icons/ai';
import ThreadBody from '@/components/thread/body';
import TextEditor from '@/components/text-editor';
import { PiUsersThreeLight } from 'react-icons/pi';

interface Props {}

const PackageThreadDetails = () => {
  return (
    <section className='w-full py-5 px-10 flex flex-col gap-2'>
      <ul>
        <li className='flex flex-col'>
          <header className='flex items-center justify-between'>
            <p className='flex items-center gap-4'>
              <span className='inline-flex items-center gap-1'>
                2.3K <AiOutlineEye />
              </span>
              <span className='inline-flex items-center gap-1'>
                1.1K <AiOutlineLike />
              </span>
              <span className='inline-flex items-center gap-1'>
                11K <PiUsersThreeLight />
              </span>
              <span className='inline-flex items-center gap-1'>
                Status: <AiOutlineUnlock />
              </span>
            </p>

            <p>#discussion・32 hours</p>
          </header>
          <main>
            <div className='flex items-center justify-between'>
              <p className='font-bold'>
                What is the best way to strucutre your folders in Next.js 13
                with the src directory
              </p>
              <div>
                <button className='bg__light-dark'>Show threads</button>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
                odit ratione architecto et blanditiis totam accusantium quo quas
                eius vero accusamus maxime tempore eum earum aut, quasi beatae
                ab aperiam.
              </p>
            </div>

            <div>
              <button className='bg__light-dark'>View less</button>
            </div>
          </main>
          <footer className='flex items-end justify-end'>
            <p className='inline-flex items-center gap-0.5'>
              Created by <span className='font-medium'>@rockyessel</span>
            </p>
          </footer>
        </li>
      </ul>

      <div>
        <TextEditor setContent={() => ''} content='' />
      </div>
      <ul className='flex items-center gap-4 flex-wrap'>
        <ThreadBody />
      </ul>
    </section>
  );
};

export default PackageThreadDetails;
