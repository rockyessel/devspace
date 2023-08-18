'use client';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { SiDpd } from 'react-icons/si';
import { useRouter } from 'next/navigation';

interface Props {}

const Authenticate = () => {
  const router = useRouter();



    
  const { status } = useSession();
  React.useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [router, status]);


  return (
    <div>
      <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
            <div className='w-full flex items-center justify-between'>
              <SiDpd />
              <button className='p-2 rounded-md bg-gray-50 font-medium text-sm'>
                Home
              </button>
            </div>
            <div className='mt-12 flex flex-col items-center justify-center h-full'>
              <div className='w-full flex-1 mt-8'>
                <div className='flex flex-col items-center'>
                  <button
                    title='Authenticate with GitHub'
                    onClick={() => signIn('github')}
                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  >
                    <div className='bg-white p-1 rounded-full'>
                      <FaGithub className='w-6' />
                    </div>
                    <span className='ml-4'>Authenticate with GitHub</span>
                  </button>
                </div>

                <div className='mx-auto max-w-xs'>
                  <p className='mt-6 text-xs text-gray-600 text-center'>
                    I agree to abide by DevSpace
                    <a
                      href='#'
                      className='border-b border-gray-500 border-dotted'
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href='#'
                      className='border-b border-gray-500 border-dotted'
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-1bg-indigo-100 hidden lg:flex border-l border-[1px]'>
            <div className='m-12 xl:m-16 w-full flex flex-col gap-10'>
              <p className='inline-flex items-start gap-2'>
                <SiDpd className='text-5xl' />{' '}
              </p>
              <p className='font-extrabold text-5xl'>
                Explore the worlds leading design portfolios.
              </p>
              <p className='max-w-lg'>
                Millions of designers and agencies around the world showcase
                their portfolio work on Flowbite - the home to the worlds best
                design and creative professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
