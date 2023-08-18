import React from 'react';

interface ApplyFormattingProps {
  selectionStart: number | undefined;
  selectionEnd: number | undefined;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const ApplyFormatting = (format: string, text: string, setText: React.Dispatch<React.SetStateAction<string>>, textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  const textarea = textareaRef.current;
  const selectionStart: number | undefined = textarea?.selectionStart;
  const selectionEnd: number | undefined = textarea?.selectionEnd;
  const props = { selectionStart, selectionEnd, text, setText };

  switch (format) {
    case 'bold':
      applyBoldFormatting(props);
      break;
    case 'italic':
      applyItalicFormatting(props);
      break;
    case 'underline':
      applyUnderlineFormatting(props);
      break;
    case 'link':
      applyLinkFormatting(props);
      break;
    case 'code':
      applyCodeFormatting(props);
      break;
    case 'list':
      applyListFormatting(props);
      break;
    case 'table':
      applyTableFormatting(props);
      break;
    case 'image':
      applyImageFormatting(props);
      break;
    case 'undo':
      undoFormatting();
      break;
    case 'redo':
      redoFormatting();
      break;
    default:
      break;
  }
};

const applyBoldFormatting = (props: ApplyFormattingProps) => {
  const formattedText = `**${props.text.slice(
    props.selectionStart,
    props.selectionEnd
  )}**`;
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyItalicFormatting = (props: ApplyFormattingProps) => {
  const formattedText = `*${props.text.slice(
    props.selectionStart,
    props.selectionEnd
  )}*`;
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyUnderlineFormatting = (props: ApplyFormattingProps) => {
  const formattedText = `__${props.text.slice(
    props.selectionStart,
    props.selectionEnd
  )}__`;
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyLinkFormatting = (props: ApplyFormattingProps) => {
  const url = prompt('Enter the URL:');
  if (url) {
    const formattedText = `[${props.text.slice(
      props.selectionStart,
      props.selectionEnd
    )}](${url})`;
    const updatedText =
      props.text.slice(0, props.selectionStart) +
      formattedText +
      props.text.slice(props.selectionEnd);
    props.setText(updatedText);
  }
};

const applyCodeFormatting = (props: ApplyFormattingProps) => {
  const formattedText =
    '`' + props.text.slice(props.selectionStart, props.selectionEnd) + '`';
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyListFormatting = (props: ApplyFormattingProps) => {
  const formattedText = `- ${props.text.slice(
    props.selectionStart,
    props.selectionEnd
  )}\n`;
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyTableFormatting = (props: ApplyFormattingProps) => {
  const formattedText = `\n
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |\n`;
  const updatedText =
    props.text.slice(0, props.selectionStart) +
    formattedText +
    props.text.slice(props.selectionEnd);
  props.setText(updatedText);
};

const applyImageFormatting = (props: ApplyFormattingProps) => {
  const url = prompt('Enter the image URL:');
  if (url) {
    const formattedText = `![Image](${url})`;
    const updatedText =
      props.text.slice(0, props.selectionStart) +
      formattedText +
      props.text.slice(props.selectionEnd);
    props.setText(updatedText);
  }
};

const undoFormatting = () => {
  document.execCommand('undo');
};

const redoFormatting = () => {
  document.execCommand('redo');
};
