'use client';

import TextEditor from '@/components/text-editor';
import axios from 'axios';
import React from 'react';

interface Props {}

const Broadcast = () => {
  const [content, setContent] = React.useState('');
  const [broadcastForm, setBroadcastForm] = React.useState({
    owner: '',
    code: '',
    title: '',
    description: '',
    language: '',
    frameworks: '',
    packages: '',
    keywords: '',
    thumbnail: '',
    schedule: '',
    mode: '',
    allowed_users: [],
  });

  const handleBroadcastFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setBroadcastForm((initialFormData) => ({
      ...initialFormData,
      [target.name]: target.value,
    }));
  };

  const handleFormSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    broadcastForm.description = content;
    broadcastForm.code = '324e3243432';
    broadcastForm.schedule = new Date().toISOString();
    broadcastForm.thumbnail = 'https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80';

    // try {
    //   const { data } = await apiService(
    //     'http://localhost:6556/v1/api/broadcast',
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       data: broadcastForm,
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
  };


  return (
    <main className='w-full h-full p-5'>
      <form className='flex flex-col gap-5' onSubmit={handleFormSubmission}>
        <fieldset className='flex gap-10'>
          <fieldset className='flex-1'>
            <fieldset>
              <fieldset className='w-full flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Title</label>
                <span className='text-xs'>
                  Please the title has to be 150 character long for SEO.
                </span>
                <input
                  title='Title'
                  name='title'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.title}
                  placeholder="Let's build a custom React.js Form Live"
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>
              <fieldset className='w-full flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Keywords</label>
                <span className='text-xs'>
                  Please no space and punation. eg,(cookies next-js react-route)
                </span>

                <input
                  title='Keywords'
                  name='keywords'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.keywords}
                  placeholder='cookies, next-js, react-router, authentication'
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>
            </fieldset>

            <fieldset className='flex flex-wrap items-center gap-10'>
              <fieldset className='w-[30rem] flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Language</label>
                <span className='text-xs'>
                  The programming language to want to talk about or code.
                </span>
                <input
                  title='Language'
                  name='language'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.language}
                  placeholder="Let's build a custom React.js Form Live"
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>

              <fieldset className='w-[30rem] flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Framework</label>
                <span className='text-xs'>
                  This field is option, but it is recommended if you will be
                  using a framework.
                </span>
                <input
                  title='Frameworks'
                  name='frameworks'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.frameworks}
                  placeholder="Let's build a custom React.js Form Live"
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>

              <fieldset className='w-[30rem] flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Packages/Libraries</label>
                <span className='text-xs'>
                  This field is also optional, but fill if you are using a
                  package or library
                </span>
                <input
                  title='Packages/Libraries'
                  name='packages'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.packages}
                  placeholder="Let's build a custom React.js Form Live"
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>

              <fieldset className='w-[30rem] flex flex-col gap-1 leading-tight'>
                <label className='text-lg font-bold'>Broadcast Mode</label>
                <span className='text-xs'>
                  Do you want users and non-user to be able to watch your
                  broadcast?
                </span>
                <input
                  title='Broadcast Mode'
                  name='mode'
                  type='text'
                  onChange={handleBroadcastFormChange}
                  value={broadcastForm.mode}
                  placeholder="Let's build a custom React.js Form Live"
                  className='w-full text-default-color outline-none px-4 border-[1px] border-default-color py-1.5 bg-dark-color text-default rounded-md font-thin placeholder:font-thin placeholder:text-sm hover:focus:ring-[1px] hover:focus:ring-dark-color'
                />
              </fieldset>
            </fieldset>
          </fieldset>
          <fieldset>
            <div className='rounded-md bg-dark-color text-default-color w-[20rem] h-[20rem] flex items-center justify-center'>
              <p>Upload Your Thumbnail</p>
            </div>
          </fieldset>
        </fieldset>

        <fieldset className='w-full flex flex-col gap-1 leading-tight'>
          <label className='text-lg font-bold'>Description</label>
          <span className='text-xs'>
            Use our rich text to improve your broadcast SEO
          </span>
          <TextEditor content={content} setContent={setContent} />
        </fieldset>

        <button type='submit' className='button__default'>
          Start broadcast
        </button>
      </form>
    </main>
  );
};

export default Broadcast;
