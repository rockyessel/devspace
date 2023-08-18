import {
  CodeIcon,
  FontBoldIcon,
  FontItalicIcon,
  ImageIcon,
  Link2Icon,
  ListBulletIcon,
  ResetIcon,
  TableIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';

const textFormatter = [
  {
    name: 'Insert Link',
    icons: <Link2Icon />,
    format: 'link',
  },
  {
    name: 'Italic',
    icons: <FontItalicIcon />,
    format: 'italic',
  },
  {
    name: 'Bold Text',
    icons: <FontBoldIcon />,
    format: 'bold',
  },
  {
    name: 'Underline Text',
    icons: <UnderlineIcon />,
    format: 'underline',
  },
  {
    name: 'Code',
    icons: <CodeIcon />,
    format: 'code',
  },
];

const groupFormat = [
  {
    name: 'Lists',
    icons: <ListBulletIcon />,
    format: 'list',
  },
  {
    name: 'Tables',
    icons: <TableIcon />,
    format: 'table',
  },
  {
    name: 'Insert Image',
    icons: <ImageIcon />,
    format: 'image',
  },
];

const changesFormatter = [
  {
    name: 'Undo',
    icons: <ResetIcon />,
    format: 'undo',
  },
  {
    name: 'Redo',
    icons: <ResetIcon />,
    format: 'redo',
  },
];

export const FormatTools = {
  textFormatter,
  groupFormat,
  changesFormatter,
};
