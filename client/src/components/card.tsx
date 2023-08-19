import React from 'react';
import { AiOutlineEye, AiOutlineLike, AiOutlineUnlock } from 'react-icons/ai';
import { PiUsersThreeLight } from 'react-icons/pi';

interface Props {}

const ThreadCard = () => {
  return (
    <li className='flex flex-col bg-[#cccccc] rounded-md p-4'>
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
            What is the best way to strucutre your folders in Next.js 13 with
            the src directory
          </p>
          <div>
            <button className='bg__light-dark'>Show threads</button>
          </div>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum odit
            ratione architecto et blanditiis totam accusantium quo quas eius
            vero accusamus maxime tempore eum earum aut, quasi beatae ab
            aperiam.
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
  );
};

export default ThreadCard;
