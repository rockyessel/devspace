'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as Tabs from '@radix-ui/react-tabs';
import EditorTools from './tools';




interface TextEditorProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

const TextEditor = (props: TextEditorProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setContent(event.target.value);
  };

  return (
    <Tabs.Root className='' defaultValue='tab1'>
      <Tabs.List
        className='border-[1px] w-fit rounded-md p-2 inline-flex items-center gap-2'
        aria-label='Manage your account'
      >
        <Tabs.Trigger className='button__default' value='tab1'>
          Write
        </Tabs.Trigger>
        <Tabs.Trigger className='button__default' value='tab2'>
          Preview
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className='mt-2' value='tab1'>
        <form>
          <div className='w-full mb-4 border border-dark-color rounded-lg bg-gray-50'>
            <EditorTools
              setText={props.setContent}
              text={props.content}
              textareaRef={textareaRef}
            />
            <div className='px-4 py-2 bg-white rounded-b-lg'>
              <label className='sr-only'>Publish post</label>
              <textarea
                spellCheck={false}
                ref={textareaRef}
                value={props.content}
                onChange={handleChange}
                className='resize-none h-40 outline-none bg-default-color text-dark-color block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0'
                placeholder='Write an article...'
                required
              ></textarea>
            </div>
          </div>
          {/* <button type='submit' className='button__default'>
            Publish post
          </button> */}
        </form>
      </Tabs.Content>
      <Tabs.Content className='mt-2 h-52 overflow-y-auto' value='tab2'>
        <div className='w-full mb-4 h-auto p-2 rounded-lg prose'>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, '')}
                    style={darcula}
                    language={match[1]}
                    PreTag='div'
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {props.content}
          </ReactMarkdown>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TextEditor;
