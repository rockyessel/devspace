import React from 'react';
import { ApplyFormatting } from '@/utils/services/text-editor/function';
import { FormatTools } from '@/utils/services/text-editor/constants';
import { TbMarkdown } from 'react-icons/tb';

interface EditorToolsProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const EditorTools = (props: EditorToolsProps) => {
  return (
    <div className='flex items-center justify-between px-3 py-2 border-b'>
      <div className='flex flex-wrap items-center divide-gray-200 sm:divide-x'>
        <div className='flex items-center space-x-1 sm:pr-4'>
          {FormatTools.textFormatter.map((tool, index) => (
            <button
              key={index}
              onClick={() =>
                ApplyFormatting(
                  tool.format,
                  props.text,
                  props.setText,
                  props.textareaRef
                )
              }
              type='button'
              className='formatting__tool'
            >
              {tool.icons}
              <span className='sr-only'>{tool.name}</span>
            </button>
          ))}
        </div>
        <div className='flex flex-wrap items-center space-x-1 sm:pr-4 sm:pl-4'>
          {FormatTools.groupFormat.map((tool, index) => (
            <button
              key={index}
              onClick={() =>
                ApplyFormatting(
                  tool.format,
                  props.text,
                  props.setText,
                  props.textareaRef
                )
              }
              type='button'
              className='formatting__tool'
            >
              {tool.icons}
              <span className='sr-only'>{tool.name}</span>
            </button>
          ))}
        </div>
        <div className='flex flex-wrap items-center space-x-1 sm:pl-4'>
          {FormatTools.changesFormatter.map((tool, index) => (
            <button
              key={index}
              onClick={() =>
                ApplyFormatting(
                  tool.format,
                  props.text,
                  props.setText,
                  props.textareaRef
                )
              }
              type='button'
              className='formatting__tool'
            >
              {tool.icons}
              <span className='sr-only'>{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      <a
        rel='noopener'
        target='_blank'
        href='https://www.markdownguide.org/cheat-sheet/'
        className='formatting__tool'
      >
        <TbMarkdown />
        <span className='sr-only'>Link to Markdown Website.</span>
      </a>
    </div>
  );
};

export default EditorTools;
